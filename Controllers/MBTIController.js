import TestSession from "../Models/TestSessionModel.js";
import PersonalityResult from "../Models/PersonalityResultModel.js";
import User from "../Models/UserModel.js";
import ReportDelivery from "../Models/ReportDeliveryModel.js";
import PersonalitySubscription from "../Models/PersonalitySubscriptionModel.js";
import mbtiQuestions from "../Data/mbtiQuestions.js";
import mbtiCareerMapping from "../Data/mbtiCareerMapping.js";
import mbtiTypeData from "../Data/mbtiTypeData.js";
import { computeMBTIResult } from "../Utils/mbtiScoring.js";
import { generateMBTIReport } from "../Utils/pdfReportGenerator.js";
import { sendMBTIReportEmail } from "../Utils/mbtiEmailService.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FALLBACK_MODELS = [
  "Llama-3.3-70B-Versatile",
  "qwen/qwen3-32b",
  "Llama-3.1-8B-Instant"
];

const callAiWithFallback = async (messages) => {
  let lastError;
  for (const modelName of FALLBACK_MODELS) {
    try {
      console.log(`Trying AI model: ${modelName}`);
      const chatCompletion = await groq.chat.completions.create({
        messages,
        model: modelName,
        max_tokens: 8192,
        temperature: 0.7,
      });
      // Check if response was truncated
      const finishReason = chatCompletion.choices[0]?.finish_reason;
      if (finishReason === 'length') {
        console.warn(`Model ${modelName} response was truncated (hit token limit). Trying next model...`);
        lastError = new Error(`${modelName} output truncated`);
        continue;
      }
      console.log(`Model ${modelName} succeeded (finish_reason: ${finishReason})`);
      return chatCompletion;
    } catch (err) {
      console.warn(`Model ${modelName} failed, trying next... Error: ${err.message}`);
      lastError = err;
    }
  }
  throw lastError;
};

/**
 * Attempts to parse JSON, repairing truncated responses and bad control characters.
 */
const safeJsonParse = (rawText) => {
  let cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

  // Step 1: Try direct parse first (works if AI returned clean JSON)
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn(`Direct JSON parse failed: ${e.message}. Attempting repair...`);
  }

  // Step 2: Fix control characters ONLY inside string values, not structural whitespace
  // This regex matches the content between double quotes and sanitizes control chars within
  let repaired = cleaned.replace(/"((?:[^"\\]|\\.)*)"/g, (match, content) => {
    const fixed = content.replace(/[\x00-\x1F\x7F]/g, (ch) => {
      if (ch === '\n') return '\\n';
      if (ch === '\r') return '\\r';
      if (ch === '\t') return '\\t';
      return ' '; // replace other control chars with space
    });
    return `"${fixed}"`;
  });

  try {
    return JSON.parse(repaired);
  } catch (e2) {
    console.warn(`Control char repair parse failed: ${e2.message}. Trying bracket repair...`);
  }

  // Step 3: Fix truncated JSON (unclosed strings, brackets)
  // Close unclosed string
  const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    repaired += '"';
  }

  // Count and close open brackets
  const opens = { '{': 0, '[': 0 };
  const closes = { '}': '{', ']': '[' };
  for (const ch of repaired) {
    if (ch in opens) opens[ch]++;
    if (ch in closes) opens[closes[ch]]--;
  }

  // Remove trailing comma before closing
  repaired = repaired.replace(/,\s*$/, '');

  for (let i = 0; i < opens['[']; i++) repaired += ']';
  for (let i = 0; i < opens['{']; i++) repaired += '}';

  try {
    return JSON.parse(repaired);
  } catch (e3) {
    console.error(`All JSON repair attempts failed: ${e3.message}`);
    throw e3;
  }
};

/**
 * Fisher-Yates shuffle (returns a new array)
 */
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/* ============================================================
   1. Start a new MBTI test session
============================================================ */
export const startTest = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // ── 1. Resume check (Fast path) ───────────────────────────────
    const existingSession = await TestSession.findOne({
      userId,
      status: "in_progress",
    });

    if (existingSession) {
      const questions = existingSession.questionOrder.map((id) =>
        mbtiQuestions.find((q) => q.id === id)
      );

      return res.status(200).json({
        success: true,
        message: "Resuming existing test session",
        data: {
          sessionId: existingSession._id,
          questions,
          progress: existingSession.progress,
          answeredQuestions: existingSession.answers,
          totalQuestions: 60,
        },
      });
    }

    // ── 2. Fresh start logic ──────────────────────────────────────
    const user = await User.findById(userId).select("personalityTestsRemaining");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.personalityTestsRemaining <= 0) {
      return res.status(403).json({
        success: false,
        code: "QUOTA_EXHAUSTED",
        message: "You have no remaining personality tests. Please purchase a plan to continue.",
      });
    }

    // ── 3. Atomically create session ──────────────────────────────
    const questionIds = mbtiQuestions.map((q) => q.id);
    const shuffledIds = shuffleArray(questionIds);

    let session;
    try {
      session = await TestSession.create({
        userId,
        status: "in_progress",
        answers: [],
        startTime: new Date(),
        progress: 0,
        questionOrder: shuffledIds,
      });
    } catch (dbError) {
      // 11000 is Duplicate Key error. This happens if a parallel request
      // created a session between our 'findOne' and 'create' calls.
      if (dbError.code === 11000) {
        console.warn(`Race condition detected for user ${userId}. Recovering...`);
        // Recurse once to hit the 'Resume check' fast path
        return startTest(req, res);
      }
      throw dbError; // re-throw other DB errors
    }

    // ── 4. Deduct Quota (Only if session creation succeeded) ───────
    await User.findByIdAndUpdate(userId, {
      $inc: { personalityTestsRemaining: -1 },
    });

    const activeSub = await PersonalitySubscription.findOne({
      userId: userId,
      status: "active",
    }).sort({ createdAt: -1 });

    if (activeSub) {
      activeSub.testsUsed += 1;
      if (activeSub.testsUsed >= activeSub.testsAllowed) {
        activeSub.status = "exhausted";
      }
      await activeSub.save();
    }

    const questions = shuffledIds.map((id) =>
      mbtiQuestions.find((q) => q.id === id)
    );

    const sanitizedQuestions = questions.map((q) => ({
      id: q.id,
      text: q.text,
    }));

    res.status(201).json({
      success: true,
      message: "Test session started",
      data: {
        sessionId: session._id,
        questions: sanitizedQuestions,
        totalQuestions: 60,
        estimatedTime: "10-12 minutes",
      },
    });
  } catch (error) {
    console.error("Start Test Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start test session",
    });
  }
};

/* ============================================================
   2. Save a single answer
============================================================ */
export const saveAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionId, score } = req.body;

    if (!questionId || !score) {
      return res.status(400).json({
        success: false,
        message: "questionId and score are required",
      });
    }

    if (questionId < 1 || questionId > 60) {
      return res.status(400).json({
        success: false,
        message: "questionId must be between 1 and 60",
      });
    }

    if (score < 1 || score > 7) {
      return res.status(400).json({
        success: false,
        message: "score must be between 1 and 7",
      });
    }

    const session = await TestSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Test session not found",
      });
    }

    if (session.status !== "in_progress") {
      return res.status(400).json({
        success: false,
        message: "This test session is already completed or abandoned",
      });
    }

    // Update or add the answer
    const existingIndex = session.answers.findIndex(
      (a) => a.questionId === questionId
    );

    if (existingIndex !== -1) {
      session.answers[existingIndex].score = score;
    } else {
      session.answers.push({ questionId, score });
    }

    // Update progress count
    session.progress = session.answers.length;
    await session.save();

    res.status(200).json({
      success: true,
      message: "Answer saved",
      data: {
        progress: session.progress,
        totalQuestions: 60,
      },
    });
  } catch (error) {
    console.error("Save Answer Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save answer",
    });
  }
};

/* ============================================================
   3. Batch save answers (auto-save / save progress)
============================================================ */
export const saveProgress = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "answers array is required",
      });
    }

    const session = await TestSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Test session not found",
      });
    }

    if (session.status !== "in_progress") {
      return res.status(400).json({
        success: false,
        message: "This test session is already completed or abandoned",
      });
    }

    // Validate all answers
    for (const ans of answers) {
      if (!ans.questionId || ans.questionId < 1 || ans.questionId > 60) {
        return res.status(400).json({
          success: false,
          message: `Invalid questionId: ${ans.questionId}`,
        });
      }
      if (!ans.score || ans.score < 1 || ans.score > 7) {
        return res.status(400).json({
          success: false,
          message: `Invalid score for question ${ans.questionId}: ${ans.score}`,
        });
      }
    }

    // Merge answers: update existing, add new
    for (const ans of answers) {
      const existingIndex = session.answers.findIndex(
        (a) => a.questionId === ans.questionId
      );
      if (existingIndex !== -1) {
        session.answers[existingIndex].score = ans.score;
      } else {
        session.answers.push({ questionId: ans.questionId, score: ans.score });
      }
    }

    session.progress = session.answers.length;
    await session.save();

    res.status(200).json({
      success: true,
      message: "Progress saved",
      data: {
        progress: session.progress,
        totalQuestions: 60,
      },
    });
  } catch (error) {
    console.error("Save Progress Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save progress",
    });
  }
};

/* ============================================================
   4. Submit test — compute MBTI result
============================================================ */
export const submitTest = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await TestSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Test session not found",
      });
    }

    if (session.status === "completed") {
      // Return existing result
      const existingResult = await PersonalityResult.findOne({
        sessionId: session._id,
      });
      if (existingResult) {
        return res.status(200).json({
          success: true,
          message: "Test already submitted",
          data: existingResult,
        });
      }
    }

    if (session.status === "abandoned") {
      return res.status(400).json({
        success: false,
        message: "This test session has been abandoned",
      });
    }

    // Validate all 60 answers are present
    if (session.answers.length !== 60) {
      return res.status(400).json({
        success: false,
        message: `All 60 questions must be answered. Currently answered: ${session.answers.length}`,
      });
    }

    // Compute MBTI result using the scoring engine
    const result = computeMBTIResult(session.answers);

    // Save the personality result
    const personalityResult = await PersonalityResult.create({
      userId: session.userId,
      sessionId: session._id,
      mbtiType: result.mbtiType,
      typeName: result.typeName,
      typeCategory: result.typeCategory,
      dimensions: result.dimensions,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      famousPersonalities: result.famousPersonalities,
      learningStyle: result.learningStyle,
      workingStyle: result.workingStyle,
      summary: result.summary,
    });

    // Mark session as completed
    session.status = "completed";
    session.endTime = new Date();
    await session.save();

    // ─── Automatic AI Advice Generation ───
    // We launch this asynchronously without 'await' to keep the API response fast for the user.
    // It will handle AI advice generation in the background.
    processAndSendReport(session.userId, personalityResult._id, null, false).catch(err => {
      console.error("Background Report Processing Error:", err);
    });

    res.status(200).json({
      success: true,
      message: "Test submitted successfully",
      data: personalityResult,
    });
  } catch (error) {
    console.error("Submit Test Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit test. Please try again.",
    });
  }
};

/* ============================================================
   5. Get latest personality result for a user
============================================================ */
export const getLatestResult = async (req, res) => {
  try {
    const userId = req.userId || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const result = await PersonalityResult.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No personality result found. Please take the test first.",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get Latest Result Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch result",
    });
  }
};

/* ============================================================
   6. Get an existing test session (resume flow)
============================================================ */
export const getTestSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await TestSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Test session not found",
      });
    }

    // Return questions in the original shuffled order
    const questions = session.questionOrder.map((id) => {
      const q = mbtiQuestions.find((q) => q.id === id);
      return { id: q.id, text: q.text }; // Sanitized
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: session._id,
        status: session.status,
        questions,
        answeredQuestions: session.answers,
        progress: session.progress,
        totalQuestions: 60,
        startTime: session.startTime,
      },
    });
  } catch (error) {
    console.error("Get Session Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch test session",
    });
  }
};

/* ============================================================
   7. Get all results history for a user
============================================================ */
export const getResultHistory = async (req, res) => {
  try {
    const userId = req.userId || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const results = await PersonalityResult.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Get Result History Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch result history",
    });
  }
};

/* ============================================================
   8. Get career guidance for a specific MBTI type
============================================================ */
export const getCareerGuidance = async (req, res) => {
  try {
    const { mbtiType } = req.params;

    if (!mbtiType) {
      return res.status(400).json({
        success: false,
        message: "mbtiType is required",
      });
    }

    const typeUpper = mbtiType.toUpperCase();
    const careerData = mbtiCareerMapping[typeUpper];

    if (!careerData) {
      return res.status(404).json({
        success: false,
        message: `No career guidance found for type: ${mbtiType}. Valid types are the 16 MBTI types (e.g., INFJ, ESTP).`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        mbtiType: typeUpper,
        ...careerData,
      },
    });
  } catch (error) {
    console.error("Get Career Guidance Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch career guidance",
    });
  }
};

/* ============================================================
   9. REQUIRED AI FIELDS — Every key the PDF generator accesses
============================================================ */
const REQUIRED_AI_FIELDS = [
  // Page 1 Cover
  "socialIntro",
  // Page 2 Scores
  "dimensionAnalysis", "combinationSummary",
  // Page 3 Who You Are
  "famousPersonalitiesTable",
  // Page 4 Cognitive Functions
  "functionAnalysis", "lifeStageAnalysis",
  // Page 5 Learning & Academics
  "academicStreamTable", "subjectWiseFit",
  // Page 6 Career Roadmap
  "topCareers", "competitiveExams",
  // Page 7 Communication & Leadership
  "leadershipProfile", "feedbackTips",
  // Page 8 Relationships
  "friendships", "romance", "compatibility",
  // Page 9 Growth Blueprint
  "selfCare", "growthPlan", "recommendations", "hobbiesTable",
  // Page 10 Closing
  "glossary", "closingStatement", "immediateSteps",
  // General
  "socialDynamics", "successStrategies", "personalizedAdvice", "careerAnalysis"
];

/**
 * Validates AI response and returns list of missing/empty field names.
 */
const validateAiResponse = (data) => {
  if (!data || typeof data !== "object") return [...REQUIRED_AI_FIELDS];

  const missing = [];
  for (const key of REQUIRED_AI_FIELDS) {
    const val = data[key];
    if (val === undefined || val === null) { missing.push(key); continue; }
    // Arrays must have at least 1 real item
    if (Array.isArray(val) && val.length === 0) { missing.push(key); continue; }
    // Strings must not be empty
    if (typeof val === "string" && val.trim().length === 0) { missing.push(key); continue; }
    // Objects (non-array) must have at least 1 key
    if (typeof val === "object" && !Array.isArray(val) && Object.keys(val).length === 0) { missing.push(key); continue; }

    // Deep checks for complex nested fields
    if (key === "leadershipProfile") {
      if (!val.communication?.strengths?.length || !val.leadership?.strengths?.length || !val.teamRoles?.length) {
        missing.push(key);
      }
    }
    if (key === "selfCare") {
      if (!val.vulnerabilities || !val.actions?.length) missing.push(key);
    }
    if (key === "growthPlan") {
      if (!val.days1_30?.length || !val.days31_60?.length || !val.days61_90?.length) missing.push(key);
    }
    if (key === "friendships" || key === "romance") {
      if (!val.bullets?.length) missing.push(key);
    }
  }
  return [...new Set(missing)]; // deduplicate
};

/* ============================================================
   10. Helper to fetch or generate AI advice
============================================================ */
const fetchAiAdvice = async (result, user, country, age) => {
  // If already exists AND passes validation, return it
  if (result.aiAdvice) {
    try {
      const existing = JSON.parse(result.aiAdvice);
      const missingKeys = validateAiResponse(existing);
      if (missingKeys.length === 0) {
        console.log("Stored AI advice is complete, reusing.");
        return existing;
      }
      console.warn(`Stored AI advice missing ${missingKeys.length} fields: ${missingKeys.join(", ")}. Regenerating...`);
    } catch (e) {
      console.warn("Stored aiAdvice is not valid JSON, regenerating...");
    }
  }

  const prompt = `
You are a career guidance counselor creating a 10-page "Success Blueprint" PDF report. Speak DIRECTLY to the student in the second person (use "You", "Your" instead of their name, "They", or third-person pronouns). Based on the user profile below, generate ALL the JSON fields listed. Every single field is MANDATORY — the PDF will crash if any field is missing or empty.

═══════════════════════════════════════
STUDENT PROFILE
═══════════════════════════════════════
- Name: ${user.FullName || "User"}
- MBTI Type: ${result.mbtiType} (${result.typeName})
- Category: ${result.typeCategory}
- Country: ${country || "India"}
- Age: ${age || "16"}

Personality Dimensions:
- Mind: ${result.dimensions.mind.dominant} (${Math.max(result.dimensions.mind.pole1Percent, result.dimensions.mind.pole2Percent)}% strength)
- Energy: ${result.dimensions.energy.dominant} (${Math.max(result.dimensions.energy.pole1Percent, result.dimensions.energy.pole2Percent)}% strength)
- Nature: ${result.dimensions.nature.dominant} (${Math.max(result.dimensions.nature.pole1Percent, result.dimensions.nature.pole2Percent)}% strength)
- Tactics: ${result.dimensions.tactics.dominant} (${Math.max(result.dimensions.tactics.pole1Percent, result.dimensions.tactics.pole2Percent)}% strength)

Key Strengths: ${result.strengths.join(", ")}
Available Career Paths: ${mbtiCareerMapping[result.mbtiType]?.careerPaths?.map(c => c.title).join(", ") || "General careers"}

═══════════════════════════════════════
MANDATORY OUTPUT — Return ONLY valid JSON
Every field below MUST be present and populated.
DO NOT skip, abbreviate, or leave any field empty.
═══════════════════════════════════════

{
  "socialIntro": "A 2-sentence type-specific intro to their relationship and social style. This appears on the report cover.",

  "dimensionAnalysis": [
    { "dimension": "E / I", "score": "e.g. 56% E", "strength": "e.g. Slight Extravert", "interpretation": "One sentence on what this means for them." },
    { "dimension": "S / N", "score": "...", "strength": "...", "interpretation": "..." },
    { "dimension": "T / F", "score": "...", "strength": "...", "interpretation": "..." },
    { "dimension": "J / P", "score": "...", "strength": "...", "interpretation": "..." }
  ],

  "combinationSummary": "A detailed 2-paragraph summary explaining what their unique combination of all 4 dimension scores says about them.",

  "famousPersonalitiesTable": [
    { "name": "Famous Person 1", "trait": "Key Trait", "lesson": "What we can learn" },
    { "name": "Famous Person 2", "trait": "Key Trait", "lesson": "What we can learn" },
    { "name": "Famous Person 3", "trait": "Key Trait", "lesson": "What we can learn" }
  ],

  "functionAnalysis": [
    { "function": "e.g. Fe — Dominant", "role": "e.g. Extraverted Feeling", "explanation": "How this function shows up for them daily." },
    { "function": "e.g. Si — Auxiliary", "role": "...", "explanation": "..." },
    { "function": "e.g. Ne — Tertiary", "role": "...", "explanation": "..." },
    { "function": "e.g. Ti — Inferior", "role": "...", "explanation": "..." }
  ],

  "lifeStageAnalysis": [
    { "stage": "Childhood & Teens", "whatDevelops": "Which function dominates", "howItShowsUp": "Personalized description" },
    { "stage": "Young Adult (20s)", "whatDevelops": "...", "howItShowsUp": "..." },
    { "stage": "Midlife (30s–40s)", "whatDevelops": "...", "howItShowsUp": "..." },
    { "stage": "Maturity (50+)", "whatDevelops": "...", "howItShowsUp": "..." }
  ],

  "academicStreamTable": [
    { "stream": "Stream Name", "fit": "BEST FIT / GOOD FIT / MODERATE FIT", "subjects": "Relevant subjects", "connections": "Related careers" },
    { "stream": "...", "fit": "...", "subjects": "...", "connections": "..." },
    { "stream": "...", "fit": "...", "subjects": "...", "connections": "..." }
  ],

  "subjectWiseFit": [
    { "subject": "Subject Name", "fit": "Excellent / Good / Average", "connection": "Related career paths" },
    { "subject": "...", "fit": "...", "connection": "..." },
    { "subject": "...", "fit": "...", "connection": "..." },
    { "subject": "...", "fit": "...", "connection": "..." }
  ],

  "topCareers": [
    {
      "title": "Career Title",
      "whySuitable": "1-2 sentences why this career suits THIS user specifically",
      "roadmap": {
        "highSchool": "Stream and subjects for Class 11-12",
        "degree": "Degree name and duration",
        "specialization": "Post-grad or certification needed",
        "firstJob": "First job title and entry path",
        "topEmployers": "3-4 example companies/sectors",
        "salary": "Entry to mid-level salary range",
        "timeline": [
          { "stage": "Class 11-12", "do": "Actionable step" },
          { "stage": "Degree (3-4 years)", "do": "Actionable step" },
          { "stage": "Post-grad / Certification", "do": "Actionable step" },
          { "stage": "Salary & Growth", "do": "Actionable step" }
        ]
      }
    }
  ],

  "competitiveExams": [
    { "exam": "Exam Name", "path": "Career Path", "eligibility": "Eligibility criteria", "prepTime": "Preparation time" },
    { "exam": "...", "path": "...", "eligibility": "...", "prepTime": "..." },
    { "exam": "...", "path": "...", "eligibility": "...", "prepTime": "..." }
  ],

  "leadershipProfile": {
    "communication": {
      "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4", "Strength 5"],
      "risks": ["Risk 1", "Risk 2"]
    },
    "leadership": {
      "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4", "Strength 5"],
      "risks": ["Risk 1", "Risk 2"]
    },
    "teamRoles": [
      { "role": "Team Role 1", "fit": "Fit level", "notes": "Why this role suits them" },
      { "role": "Team Role 2", "fit": "...", "notes": "..." },
      { "role": "Team Role 3", "fit": "...", "notes": "..." }
    ]
  },

  "feedbackTips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],

  "friendships": {
    "bullets": ["Point 1", "Point 2", "Point 3", "Point 4"],
    "growthTip": "A single growth tip for friendships."
  },

  "romance": {
    "bullets": ["Point 1", "Point 2", "Point 3", "Point 4"],
    "growthTip": "A single growth tip for romance."
  },

  "compatibility": [
    { "type": "TYPE1", "status": "Excellent", "reason": "Explanation" },
    { "type": "TYPE2", "status": "Good", "reason": "Explanation" },
    { "type": "TYPE3", "status": "Challenging", "reason": "Explanation" }
  ],

  "selfCare": {
    "vulnerabilities": "A paragraph describing common mental health vulnerabilities for this type.",
    "actions": ["Self-care action 1", "Action 2", "Action 3", "Action 4", "Action 5"]
  },

  "growthPlan": {
    "days1_30": ["Step 1", "Step 2", "Step 3", "Step 4"],
    "days31_60": ["Step 1", "Step 2", "Step 3", "Step 4"],
    "days61_90": ["Step 1", "Step 2", "Step 3", "Step 4"]
  },

  "recommendations": [
    { "category": "Book", "name": "Book Title", "whyPerfect": "Why this book suits them" },
    { "category": "Course", "name": "Course Title", "whyPerfect": "Why this course suits them" },
    { "category": "App", "name": "App Name", "whyPerfect": "Why this app suits them" }
  ],

  "hobbiesTable": [
    { "activity": "Activity 1", "benefit": "Why it suits them and career benefit" },
    { "activity": "Activity 2", "benefit": "..." },
    { "activity": "Activity 3", "benefit": "..." }
  ],

  "glossary": [
    { "term": "E (Extraversion)", "explanation": "Plain language explanation" },
    { "term": "I (Introversion)", "explanation": "..." },
    { "term": "S (Sensing)", "explanation": "..." },
    { "term": "N (Intuition)", "explanation": "..." },
    { "term": "T (Thinking)", "explanation": "..." },
    { "term": "F (Feeling)", "explanation": "..." },
    { "term": "J (Judging)", "explanation": "..." },
    { "term": "P (Perceiving)", "explanation": "..." }
  ],

  "closingStatement": "A 1-sentence personalized motivational quote for this personality type.",

  "immediateSteps": ["Detailed actionable step 1", "Step 2", "Step 3", "Step 4", "Step 5"],

  "socialDynamics": "A detailed 1-paragraph strategic social analysis for this user in the workplace.",
  "successStrategies": ["Strategy 1", "Strategy 2", "Strategy 3"],
  "personalizedAdvice": "A motivational paragraph of personalized guidance speaking directly to the user.",
  "careerAnalysis": "A detailed 2-paragraph analysis blending their personality type with the modern job market."
}

CRITICAL RULES:
1. You MUST return exactly 4 items in topCareers with full roadmap and timeline for each.
2. You MUST return exactly 4 items in dimensionAnalysis (one per dimension).
3. You MUST return exactly 4 items in functionAnalysis (one per cognitive function).
4. You MUST return exactly 4 items in lifeStageAnalysis.
5. Every array must have at least 3 items unless specified otherwise.
6. No field may be empty, null, or contain placeholder text like "N/A" or "TBD".
7. Return ONLY the JSON object. No markdown, no explanation, no code fences.
`;

  const messages = [{ role: "user", content: [{ type: "text", text: prompt }] }];

  // ─── Generate AI response ───
  const chatCompletion = await callAiWithFallback(messages);
  const rawResponse = chatCompletion.choices[0]?.message?.content || "";
  let aiAdvice = safeJsonParse(rawResponse);

  // ─── Validate and retry for missing fields (up to 2 retries) ───
  for (let attempt = 1; attempt <= 2; attempt++) {
    const missingKeys = validateAiResponse(aiAdvice);
    if (missingKeys.length === 0) break;

    console.warn(`AI response attempt ${attempt} missing ${missingKeys.length} fields: ${missingKeys.join(", ")}. Retrying...`);

    const repairPrompt = `
You previously generated a career guidance JSON for an ${result.mbtiType} user named ${user.FullName || "User"}.
The following fields are MISSING or EMPTY in your response: ${missingKeys.join(", ")}

Regenerate ONLY these missing fields as a JSON object. Use the same user context:
- MBTI: ${result.mbtiType} (${result.typeName}), Country: ${country || "India"}, Age: ${age || "16"}
- Strengths: ${result.strengths.join(", ")}

RULES:
- Return ONLY a valid JSON object containing the missing keys with proper data.
- No markdown, no code fences, no explanation.
- Every array must have at least 3 items. No empty strings or placeholders.
`;

    try {
      const repairCompletion = await callAiWithFallback([{ role: "user", content: [{ type: "text", text: repairPrompt }] }]);
      const repairRaw = repairCompletion.choices[0]?.message?.content || "{}";
      const repairData = safeJsonParse(repairRaw);

      // Merge repaired fields into the main advice object
      for (const key of missingKeys) {
        if (repairData[key] !== undefined && repairData[key] !== null) {
          aiAdvice[key] = repairData[key];
        }
      }
    } catch (repairErr) {
      console.error(`Repair attempt ${attempt} failed:`, repairErr.message);
    }
  }

  // Final validation log
  const finalMissing = validateAiResponse(aiAdvice);
  if (finalMissing.length > 0) {
    console.error(`WARNING: AI advice still missing ${finalMissing.length} fields after retries: ${finalMissing.join(", ")}`);
  } else {
    console.log("AI advice generation complete — all fields validated.");
  }

  // Persist to DB
  await PersonalityResult.updateOne(
    { _id: result._id },
    { $set: { aiAdvice: JSON.stringify(aiAdvice) } }
  );

  return aiAdvice;
};

/* ============================================================
   10. Get personalized career advice (AI-enhanced)
============================================================ */
export const getPersonalizedCareerAdvice = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { country, age, resultId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    let result;
    if (resultId) {
      result = await PersonalityResult.findById(resultId);
    } else {
      result = await PersonalityResult.findOne({ userId }).sort({ createdAt: -1 });
    }

    if (!result) {
      return res.status(404).json({ success: false, message: "No result found." });
    }

    const user = await User.findById(userId).lean();
    const aiAdvice = await fetchAiAdvice(result, user, country, age);

    res.status(200).json({
      success: true,
      data: {
        mbtiType: result.mbtiType,
        typeName: result.typeName,
        typeCategory: result.typeCategory,
        staticGuidance: mbtiCareerMapping[result.mbtiType],
        personalizedAdvice: aiAdvice,
      },
    });
  } catch (error) {
    console.error("Personalized Career Advice Error:", error);
    res.status(500).json({ success: false, message: "AI Analysis failed." });
  }
};

/* ============================================================
   11. Internal Helper: Process AI Advice, Generate PDF, and Send Email
   Used by both automatic submission and manual generateReport triggers.
============================================================ */
const processAndSendReport = async (userId, resultId, parentEmail = null, sendToUser = false) => {
  try {
    // 1. Fetch data
    const result = await PersonalityResult.findById(resultId);
    const user = await User.findById(userId);

    if (!result || !user || !user.email) {
      console.warn(`Insufficient data to send report for result ${resultId}`);
      return;
    }

    // 2. Ensure AI Advice is generated (This takes ~15-20 seconds)
    const aiAdvice = await fetchAiAdvice(result, user, user.country, user.age);

    if (!sendToUser && !parentEmail) {
      console.log("No emails requested. Background AI generation complete.");
      return true;
    }

    // 3. Generate PDF
    const careerData = mbtiCareerMapping[result.mbtiType];
    const fullTypeData = mbtiTypeData[result.mbtiType];
    const pdfBuffer = await generateMBTIReport(result, careerData, user, aiAdvice, fullTypeData);

    const reportData = {
      mbtiType: result.mbtiType,
      typeName: result.typeName,
      userName: user.FullName || 'User',
      dimensions: result.dimensions,
    };

    // 4. Send to User (only if enabled)
    if (sendToUser) {
      const userDelivery = await ReportDelivery.create({
        userId,
        resultId,
        channel: 'email',
        recipientEmail: user.email,
      });

      try {
        await sendMBTIReportEmail(user.email, reportData, pdfBuffer, false);
        userDelivery.status = 'sent';
        userDelivery.sentAt = new Date();
        await userDelivery.save();
      } catch (err) {
        userDelivery.status = 'failed';
        userDelivery.errorMessage = err.message;
        await userDelivery.save();
        console.error("Failed to send user email", err);
      }
    }

    // 5. Send to Parent (if provided)
    if (parentEmail) {
      const parentDelivery = await ReportDelivery.create({
        userId,
        resultId,
        channel: 'parent_email',
        recipientEmail: parentEmail,
      });

      try {
        await sendMBTIReportEmail(parentEmail, reportData, pdfBuffer, true);
        parentDelivery.status = 'sent';
        parentDelivery.sentAt = new Date();
        await parentDelivery.save();
      } catch (err) {
        parentDelivery.status = 'failed';
        parentDelivery.errorMessage = err.message;
        await parentDelivery.save();
      }
    }

    return true;
  } catch (error) {
    console.error("processAndSendReport critical failure:", error);
    throw error;
  }
};

/* ============================================================
   12. Generate and send MBTI PDF report via Email (Manual Trigger)
============================================================ */
export const generateReport = async (req, res) => {
  try {
    const { resultId, parentEmail } = req.body;
    const userId = req.userId || req.body.userId;

    if (!userId || !resultId) {
      return res.status(400).json({ success: false, message: "userId and resultId are required" });
    }

    // Call the internal helper
    await processAndSendReport(userId, resultId, parentEmail, false);

    res.status(200).json({
      success: true,
      message: "Report generation and email dispatch initiated.",
    });
  } catch (error) {
    console.error("Generate Report Error:", error);
    res.status(500).json({ success: false, message: "An error occurred during report generation" });
  }
};

/* ============================================================
   11. Download the generated MBTI PDF Report directly
============================================================ */
export const downloadReport = async (req, res) => {
  try {
    const { resultId } = req.params;

    // Fetch the personality result
    const result = await PersonalityResult.findById(resultId).lean();
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Personality result not found",
      });
    }

    // Fetch the user profile
    const user = await User.findById(result.userId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    // Track the download
    await ReportDelivery.create({
      userId: user._id,
      resultId: result._id,
      channel: 'download',
      status: 'sent',
      sentAt: new Date(),
    });

    const careerData = mbtiCareerMapping[result.mbtiType];
    const fullTypeData = mbtiTypeData[result.mbtiType];

    // Ensure AI advice is ready for the PDF
    const aiAdvice = await fetchAiAdvice(result, user, user.country, user.age);

    // Generate the PDF Buffer
    const pdfBuffer = await generateMBTIReport(result, careerData, user, aiAdvice, fullTypeData);

    // Send email to the student
    try {
      if (user.email) {
        const reportData = {
          mbtiType: result.mbtiType,
          typeName: result.typeName,
          userName: user.FullName || 'User',
          dimensions: result.dimensions,
        };
        
        const userDelivery = await ReportDelivery.create({
          userId: user._id,
          resultId: result._id,
          channel: 'email',
          recipientEmail: user.email,
        });

        await sendMBTIReportEmail(user.email, reportData, pdfBuffer, false);
        userDelivery.status = 'sent';
        userDelivery.sentAt = new Date();
        await userDelivery.save();
      }
    } catch (err) {
      console.error("Failed to send download email to user:", err);
    }

    const filename = `${user.FullName ? user.FullName.replace(/\s+/g, '_') : 'User'}_MBTI_Report.pdf`;

    // Send PDF as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Download Report Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while rendering the report for download",
    });
  }
};

