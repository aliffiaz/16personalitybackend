import { GoogleGenerativeAI } from "@google/generative-ai";
import AiSubscription from "../Models/AiSubscriptionModel.js";
// Initialize Gemini with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
import Coupon from "../Models/CouponModel.js";
import jwt from "jsonwebtoken";
import Payment from "../Models/PaymentModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import SubscriptionPlan from "../Models/SubscriptionPlanModel.js";
import UserModel from "../Models/UserModel.js";
import Groq from "groq-sdk";
// BEST free-tier model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const FALLBACK_MODELS = [
  "Llama-3.3-70B-Versatile",
  "openai/gpt-oss-120b",
  "Llama-3.1-8B-Instant",
  "qwen/qwen3-32b"
];

/**
 * Helper function to call AI with fallback logic
 */
const callAiWithFallback = async (messages) => {
  let lastError;
  for (const modelName of FALLBACK_MODELS) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages,
        model: modelName,
      });
      return chatCompletion;
    } catch (err) {
      console.warn(`Model ${modelName} failed, trying next... Error: ${err.message}`);
      lastError = err;
    }
  }
  throw lastError;
};

/* ============================================================
   1. GEMINI → Generate Psychometric Test Questions (4)
============================================================ */
export const generatePsychometricTest = async (req, res) => {
  try {
    const prompt = `
Create EXACTLY 5 psychometric test questions based on the "Big Five" personality traits.
Each question must target a different trait: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.

Each question MUST have the following 4 options:
1. Strongly Agree
2. Agree
3. Disagree
4. Strongly Disagree

Return JSON ONLY:
{
  "questions": [
    {
      "trait_measured": "Extraversion",
      "question": "...",
      "options": ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"]
    }
  ]
}
  strictly return only json data nothing else
`;


    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);


    const explanation = chatCompletion.choices[0]?.message?.content || "";
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();

    // Parse the AI output safely
    // const response = JSON.parse(text);

    res.status(200).json({ success: true, data: jsonData.questions });

  } catch (err) {
    console.log("Psychometric Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};


/* ============================================================
   2. GEMINI → Analyze Psychometric Answers → Personality
============================================================ */
export const analyzePsychometricAnswers = async (req, res) => {
  try {
    const { answers } = req.body;


    if (!answers || answers.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 4 answers."
      });
    }

    const prompt = `
A user provided the following answers to a psychometric test.
Note the 'trait_measured' field for each question to understand what was being tested.

${JSON.stringify(answers)}

Based on how they answered the specific trait questions:
1. Determine their strongest personality trait.
2. Assign them a creative personality archetype (e.g., "The Architect," "The Empath," "The Driver").

Return JSON ONLY:
{
  "personality": "Name of Archetype",
  "dominant_trait": "e.g. Extraversion",
  "reason": "Explain why based on the specific answers provided.exactly in 2 sentences it should be such that you answering to the user not a third person"
}
    strictly return only json data nothing else
`;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);

    const explanation = chatCompletion.choices[0]?.message?.content || "";
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);

    res.status(200).json({ success: true, data: jsonData });

  } catch (err) {
    console.log("Personality Analysis Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};


/* ============================================================
   3. GEMINI → Generate Career Guidance Questions (4)
============================================================ */
export const generateCareerGuidanceTest = async (req, res) => {
  try {
    const prompt = `
Create EXACTLY 6 career assessment questions based on the Holland Codes (RIASEC) model.
You must generate one distinct question for each of the 6 types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.

Each question MUST have the following 4 options:
1. Strongly Agree
2. Agree
3. Disagree
4. Strongly Disagree

Return JSON ONLY in this strict format:
{
  "questions": [
    {
      "career_category": "Name of the RIASEC type (e.g., Social)",
      "question": "The question text",
      "options": ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"]
    }
  ]
}
`;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();
    // const response = JSON.parse(text);
        const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);

    const explanation = chatCompletion.choices[0]?.message?.content || "";
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);

    res.status(200).json({ success: true, data: jsonData.questions });

  } catch (err) {
    console.log("Career Q Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};


/* ============================================================
   4. GEMINI → Provide Career Guidance Based on Answers
============================================================ */
export const generateCareerGuidance = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 4 answers."
      });
    }

    const prompt = `
A user provided the following answers to a career assessment.
Pay close attention to the 'career_category' field to understand which job types they prefer.

${JSON.stringify(answers)}

Task:
1. Identify the user's top 2 RIASEC categories based on their "Agree/Strongly Agree" choices.
2. Recommend ONE specific job title that blends these two categories.
3. Provide a reasoning based on the specific traits they selected.

Return JSON ONLY:
{
  "recommendedCareer": "Job Title (e.g., Science Teacher, Data Architect)",
  "dominant_categories": ["Category 1", "Category 2"],
  "reason": "2 sentence explanation connecting the categories to the job.It should be such that you answering to the user not a third person "
}
  strictly return only json data nothing else
`;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);

    const explanation = chatCompletion.choices[0]?.message?.content || "";
    console.log(explanation);
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData);
    
    res.status(200).json({ success: true, data: jsonData });

  } catch (err) {
    console.log("Career Guidance Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};


// controllers/careerInitialController.js

export const getInitialCareerQuestions = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    // Check subscription status
    // const subscription = await AiSubscription.findOne({ userId });

    // if (!subscription) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "No active subscription found. Please activate a plan to continue.",
    //     upgradeRequired: true
    //   });
    // }

    // if (subscription.usageCount <= 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You have used all free attempts. Please upgrade to premium to continue.",
    //     upgradeRequired: true
    //   });
    // }

    // If subscription valid → send questions
    const questions = [
      {
        id: "c1",
        text: "I enjoy working with machines, tools, gadgets, or technology to build or fix things."
      },
      {
        id: "c2",
        text: "I like solving analytical problems, doing research, or exploring how things work."
      },
      {
        id: "c3",
        text: "I enjoy creative activities such as drawing, writing, design, or performance."
      },
      {
        id: "c4",
        text: "I like helping people learn, supporting them emotionally, or improving their well-being."
      },
      {
        id: "c5",
        text: "I feel confident leading others, persuading people, or taking responsibility in group tasks."
      }
    ];

    res.status(200).json({
      success: true,
      type: "career",
      scale: "1–5 (Strongly Disagree → Strongly Agree)",
      // remaining_usage: subscription.usageCount,
      questions
    });

  } catch (error) {
    console.error("Get Career Questions Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching career questions,Try Again"
    });
  }
};

// controllers/psychometricInitialController.js

export const getInitialPsychometricQuestions = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    // Check subscription status
    // const subscription = await AiSubscription.findOne({ userId });

    // if (!subscription) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "No active subscription found. Please activate a plan to continue.",
    //     upgradeRequired: true
    //   });
    // }

    // if (subscription.usageCount <= 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You have used all free attempts. Please upgrade to premium to continue.",
    //     upgradeRequired: true
    //   });
    // }

    const questions = [
      {
        id: "p1",
        text: "I am outgoing and enjoy interacting with many different people."
      },
      {
        id: "p2",
        text: "I stay calm and handle difficult situations without getting upset quickly."
      },
      {
        id: "p3",
        text: "I like exploring new ideas, experiences, and different ways of doing things."
      },
      {
        id: "p4",
        text: "I complete tasks on time and stay focused until I finish them."
      },
      {
        id: "p5",
        text: "I try to be considerate and avoid hurting others’ feelings."
      }
    ];

    res.status(200).json({
      success: true,
      type: "psychometric",
      scale: "1–5 (Strongly Disagree → Strongly Agree)",
      // remaining_usage: subscription.usageCount,
      questions
    });

  } catch (error) {
    console.error("Get Psychometric Questions Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching psychometric questions,Try Again"
    });
  }
};

// controllers/careerFollowUpController.js
export const careerFollowupQuestions = async (req, res) => {
  try {
    const { country, age, answers } = req.body;

    if (!answers || answers.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 5 answers."
      });
    }

    const prompt = `
You are an educational career guidance assistant. You must avoid mental health interpretation.

Analyze the user’s responses to determine which career interest area they showed stronger attraction toward.
Then generate exactly 5 follow-up statements exploring that same interest area more.

Rules:
- All statements must be answerable 1–5 (Strongly Disagree → Strongly Agree).
- Focus strictly on school-age career interests (hands-on, analytical, creative, helping, leadership).
- Do not explain reasoning.
- Output JSON ONLY.

User Profile:
Country: ${country}
Age: ${age}

First 5 Career Answers:
${JSON.stringify(answers)}
only json data nothing else

Strict JSON format:
{
  "follow_up_questions": [
    {"id": "c6", "text": "..."},
    {"id": "c7", "text": "..."},
    {"id": "c8", "text": "..."},
    {"id": "c9", "text": "..."},
    {"id": "c10", "text": "..."}
  ]
}
    `;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);


    const explanation = chatCompletion.choices[0]?.message?.content || "";
    console.log(explanation);
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData);

    return res.status(200).json({ success: true, data: jsonData });

  } catch (err) {
    console.error("Career Follow-up Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};


export const psychometricFollowupQuestions = async (req, res) => {
  try {
    const { country, age, answers } = req.body;

    if (!answers || answers.length !== 5) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 5 answers."
      });
    }

    const prompt = `
You are a behavior-style guidance assistant. 
You must NOT use mental health terms, personality labels, or diagnosis.

Goal:
Generate exactly 5 follow-up Likert-scale statements to better understand:
- Interaction style
- Openness to new experiences
- Responsibility
- Cooperation
- Self-regulation (light framing)

Each statement must be answerable 1–5 (Strongly Disagree → Strongly Agree).
No negative or harmful language.

User:
Country: ${country}
Age: ${age}

Psychometric Answers:
${JSON.stringify(answers)}
only json data nothing else

Strict JSON Output:
{
  "follow_up_questions": [
    {"id": "p6", "text": "..."},
    {"id": "p7", "text": "..."},
    {"id": "p8", "text": "..."},
    {"id": "p9", "text": "..."},
    {"id": "p10", "text": "..."}
  ]
}
    `;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, '').trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);


    const explanation = chatCompletion.choices[0]?.message?.content || "";
    console.log(explanation);
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData);

    return res.status(200).json({ success: true, data: jsonData });

  } catch (err) {
    console.error("Psychometric Follow-up Error:", err);
    res.status(500).json({ success: false, message: "Error in Generating Test, Try Again" });
  }
};

export const analyzeCareerFull = async (req, res) => {
  try {
    //add userid when subscription is added
    const { country, age, answers } = req.body;

    if(!country || !age){
      return res.status(400).json({
        success: false,
        message: "country and age are required"
      });
    }

    // if (!userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "userId is required"
    //   });
    // }

    if (!answers || answers.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 10 career answers."
      });
    }

    // 1️⃣ Fetch Subscription
    // const subscription = await AiSubscription.findOne({ userId });
    // if (!subscription) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "No active subscription found. Please subscribe first."
    //   });
    // }

    // 2️⃣ Check usage availability
    // if (subscription.usageCount <= 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Your AI usage limit has been reached. Please upgrade your plan."
    //   });
    // }

    const prompt = `
You are a career guidance assistant for users.
Do NOT mention psychology, personality, or diagnosis.

Task:
- Review the 10 career-interest responses.
- Identify their strongest interest themes (hands-on, creative, leadership, analytical).
- Recommend 1 relevant career exploration direction (not high-risk).
- Provide positive, simple, user-friendly wording in 2 sentences.

User Profile:
Country: ${country}
Age: ${age}

Career Answers:
${JSON.stringify(answers)}
only json data nothing else
Return JSON ONLY:
{
  "recommendedCareer": "Example: Science Teacher",
  "dominant_categories": ["Category 1", "Category 2"],
  "reason": "2 sentences speaking directly to the user."
}
    `;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, "").trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);


    const explanation = chatCompletion.choices[0]?.message?.content || "";
    console.log(explanation);
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData);

    // 3️⃣ Deduct usage credit by 1
    // subscription.usageCount = Math.max(subscription.usageCount - 1, 0);
    // if (subscription.usageCount === 0) {
    //   subscription.isActive = false; // Deactivate if no usage left
    // }
    // await subscription.save();

    return res.status(200).json({
      success: true,
      // subscriptionStatus: subscription.isActive,
      // remaining_usage: subscription.usageCount,
      data: jsonData
    });

  } catch (err) {
    console.error("Career Final Analysis Error:", err);
    res.status(500).json({
      success: false,
      message: "Error in Analysing Test, Try Again"
    });
  }
};

export const analyzePsychometricFull = async (req, res) => {
  try {
    // add userid when subscription is added
    const { country, age, answers } = req.body;
    if(!country || !age){
      return res.status(400).json({
        success: false,
        message: "country and age are required"
      });
    } 

    // if (!userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "userId is required"
    //   });
    // }

    if (!answers || answers.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "You must provide exactly 10 psychometric answers."
      });
    }

    // 1️⃣ Fetch subscription
    // const subscription = await AiSubscription.findOne({ userId });

    // if (!subscription) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "No active subscription found. Please subscribe first."
    //   });
    // }

    // 2️⃣ Check if user has usage left
    // if (subscription.usageCount <= 0) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Your AI usage limit has been reached. Please upgrade your plan."
    //   });
    // }

    const prompt = `
You are a supportive behavior-style guidance assistant for users.
Avoid clinical terms, diagnosis, or personality labels.

Task:
- Analyze the 10 behavior-style responses.
- Identify their strongest daily behavior trait.
- Assign them one creative personality archetype (like “The Helper” or “The Explorer”).
- Provide 2 motivational sentences speaking directly to the user.

User:
Country: ${country}
Age: ${age}

Psychometric Answers:
${JSON.stringify(answers)}
only json data nothing else
Return JSON ONLY:
{
  "personality": "Archetype Name",
  "dominant_trait": "Trait Name",
  "reason": "2 supportive sentences direct to the user"
}
    `;

    // const result = await model.generateContent(prompt);
    // const text = result.response.text().replace(/```json|```/g, "").trim();
    // const response = JSON.parse(text);

    const messages = [
      {
        role: "user",
        content: [],
      },
    ];

    messages[0].content.push({
      type: "text",
      text: prompt,
    });

    const chatCompletion = await callAiWithFallback(messages);


    const explanation = chatCompletion.choices[0]?.message?.content || "";
    console.log(explanation);
    const cleanedData = explanation
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();
    const jsonData = JSON.parse(cleanedData);
    console.log(jsonData);


    // 3️⃣ Deduct usage credit by 1
    // subscription.usageCount = Math.max(subscription.usageCount - 1, 0);
    // if (subscription.usageCount === 0) {
    //   subscription.isActive = false; // Deactivate if no usage left
    // }
    // await subscription.save();

    return res.status(200).json({
      success: true,
      // subscriptionStatus: subscription.isActive,
      // remaining_usage: subscription.usageCount,
      data: jsonData
    });

  } catch (err) {
    console.error("Psychometric Final Analysis Error:", err);
    res.status(500).json({
      success: false,
      message: "Error in Analysing Test, Try Again"
    });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrUpdateSubscription = async (req, res) => {
  try {
    const { userId, planId, couponCode } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "userId and planId  is required",
      });
    }

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Invalid plan" });



    let finalAmount = plan.amount;
    let coupon = null;

    if (couponCode && couponCode.trim() !== "") {
      coupon = await Coupon.findOne({ code: couponCode });

      if (!coupon) {
        return res.status(400).json({ success: false, message: "Invalid coupon code" });
      }

      const now = new Date();
      if (!coupon.active)
        return res.status(400).json({ success: false, message: "Coupon inactive" });
      if (coupon.validFrom && now < new Date(coupon.validFrom))
        return res.status(400).json({ success: false, message: "Coupon not yet valid" });
      if (coupon.validUntil && now > new Date(coupon.validUntil))
        return res.status(400).json({ success: false, message: "Coupon expired" });

      if (coupon.discountType === "percentage") {
        finalAmount = plan.amount - (plan.amount * coupon.discountValue) / 100;
      } else {
        finalAmount = plan.amount - coupon.discountValue;
      }

      if (finalAmount < 0) finalAmount = 0;
    }

    // 4️⃣ Razorpay amount (₹1 verification for free plan)
    let razorpayAmount = Math.round(finalAmount * 100);
    let isRefundable = false;

    if (finalAmount === 0) {
      razorpayAmount = 100; // Charge ₹1
      isRefundable = true;
    }

    // 5️⃣ Create Razorpay order
    const order = await razorpay.orders.create({
      amount: razorpayAmount,
      currency: "INR",
      receipt: `sub_${Date.now()}`,
    });

    await Payment.create({
      orderId: order.id,
      amount: finalAmount,
      paymentType: "ai-subscription",
      userId: userId,
      currency: "INR",
      status: "created",
      couponCode: coupon ? coupon.code : null,
      isRefundable,
    });


    if (finalAmount === 0) finalAmount = 1;


    const tokenPayload = {
      userId,
      planId,
      couponCode: coupon?.code || null,
      orderId: order.id,
      finalAmount,
    };

    const token = jwt.sign(tokenPayload, process.env.CHECKOUT_SECRET, { expiresIn: "10m" });

    const redirectUrl = `${process.env.FRONTEND_CHECKOUT_URL}?token=${token}`;

    return res.status(200).json({
      success: true,
      redirectUrl,
    });


  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};


export const addPaymentDetails = async (req, res) => {
  try {
    const { userId, subscriptionAmount } = req.body;

    if (!userId || !subscriptionAmount) {
      return res.status(400).json({
        success: false,
        message: "userId and subscriptionAmount are required"
      });
    }

    const payment = await AiPayment.create({
      userId,
      subscriptionAmount
      // paymentdate is auto-set by default
    });

    return res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      data: payment
    });

  } catch (error) {
    console.error("Payment Save Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record payment",
      error: error.message
    });
  }
};


// 2️⃣ Verify Payment + Auto Refund ₹1 + Activate Subscription
export const verifySubscriptionPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, token } = req.body;

    if (!orderId || !paymentId || !signature || !token) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // 1️⃣ Decode secure checkout token
    const decoded = jwt.verify(token, process.env.CHECKOUT_SECRET);

    const {
      userId,
      planId,
      couponCode,
    } = decoded;

    console.log("Decoded Checkout Token:", decoded);

    // 2️⃣ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (expectedSignature !== signature) {
      await Payment.findOneAndUpdate({ orderId }, { status: "failed" });
      return res.status(400).json({ success: false, message: "Signature mismatch" });
    }

    // 3️⃣ Fetch DB documents
    const plan = await SubscriptionPlan.findById(planId);
    const user = await User.findById(userId);

    if (!plan || !user) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    // 4️⃣ Refund ₹1 if needed
    const paymentDoc = await Payment.findOne({ orderId });
    let finalPaymentStatus = "paid";

    if (paymentDoc?.isRefundable) {
      try {
        await razorpay.payments.refund(paymentId, {
          amount: 100,
          speed: "optimum",
        });
        finalPaymentStatus = "refunded";
      } catch (e) {
        finalPaymentStatus = "paid";
      }
    }

    // 5️⃣ Update payment record
    await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, signature, status: finalPaymentStatus }
    );

    // 7️⃣ Activate or update AI Subscription
    let subscription = await AiSubscription.findOne({ userId });

    if (!subscription) {

      // Create a new subscription with usageCount = 2 (as first usage)
      subscription = await AiSubscription.create({
        userId,
        usageCount: 2,
        isActive: true,
      });

    } else {

      // Update existing subscription: increment usageCount by 2
      subscription.usageCount += 2;
      subscription.isActive = true; // ensure active
      await subscription.save();

    }

    // 8️⃣ Final response (web will redirect to app)
    return res.status(200).json({
      success: true,
      message: "Subscription activated",
      plan: plan.name,
      status: finalPaymentStatus,
      deepLink: `mcqsolver://payment-success?plan=${planId}&user=${userId}`,
    });

    
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};