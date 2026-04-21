/**
 * MBTI Scoring Engine
 * 
 * Deterministic scoring — no AI involved.
 * Takes 60 answers (questionId + score) and computes the MBTI type.
 * 
 * Scoring rules (from documentation):
 *   - Each answer is 1–7 (Strongly Disagree → Strongly Agree)
 *   - Score directly aligns with the tagged pole
 *   - Sum scores per pole per dimension
 *   - Higher percentage pole wins
 *   - Tiebreaker: I, N, F, P (standard MBTI convention)
 */

import mbtiQuestions from "../Data/mbtiQuestions.js";
import mbtiTypeData from "../Data/mbtiTypeData.js";

// Build a lookup: questionId → { dimension, tag }
const questionLookup = {};
for (const q of mbtiQuestions) {
  questionLookup[q.id] = { dimension: q.dimension, tag: q.tag };
}

// Dimension config: [dimension, pole1, pole2, tiebreakWinner]
const DIMENSION_CONFIG = [
  { dimension: "Mind",    pole1: "I", pole2: "E", tiebreakWinner: "I" },
  { dimension: "Energy",  pole1: "N", pole2: "S", tiebreakWinner: "N" },
  { dimension: "Nature",  pole1: "T", pole2: "F", tiebreakWinner: "F" },
  { dimension: "Tactics", pole1: "J", pole2: "P", tiebreakWinner: "P" },
];

/**
 * Compute the MBTI result from 60 answers.
 * 
 * @param {Array<{questionId: number, score: number}>} answers - 60 answers
 * @returns {{ mbtiType, typeName, typeCategory, dimensions, strengths, weaknesses, famousPersonalities, learningStyle, workingStyle, summary }}
 */
export const computeMBTIResult = (answers) => {
  // Validate we have exactly 60 answers
  if (!answers || answers.length !== 60) {
    throw new Error(`Expected 60 answers, got ${answers?.length || 0}`);
  }

  // Validate all answers have valid scores (1–7) and valid questionIds (1–60)
  for (const ans of answers) {
    if (!ans.questionId || ans.questionId < 1 || ans.questionId > 60) {
      throw new Error(`Invalid questionId: ${ans.questionId}`);
    }
    if (!ans.score || ans.score < 1 || ans.score > 7) {
      throw new Error(`Invalid score for question ${ans.questionId}: ${ans.score}`);
    }
    if (!questionLookup[ans.questionId]) {
      throw new Error(`Unknown questionId: ${ans.questionId}`);
    }
  }

  // Check no duplicate questionIds
  const ids = new Set(answers.map((a) => a.questionId));
  if (ids.size !== 60) {
    throw new Error("Duplicate questionIds found in answers");
  }

  // Accumulate scores per dimension per pole
  const scores = {
    Mind:    { I: 0, E: 0 },
    Energy:  { N: 0, S: 0 },
    Nature:  { T: 0, F: 0 },
    Tactics: { J: 0, P: 0 },
  };

  for (const ans of answers) {
    const { dimension, tag } = questionLookup[ans.questionId];
    scores[dimension][tag] += ans.score;
  }

  // Compute percentages and determine dominant pole per dimension
  const dimensions = {};
  let mbtiType = "";

  for (const cfg of DIMENSION_CONFIG) {
    const { dimension, pole1, pole2, tiebreakWinner } = cfg;
    const p1Score = scores[dimension][pole1];
    const p2Score = scores[dimension][pole2];
    const total = p1Score + p2Score;

    const p1Percent = total > 0 ? Math.round((p1Score / total) * 100) : 50;
    const p2Percent = total > 0 ? 100 - p1Percent : 50;

    let dominant;
    if (p1Percent > p2Percent) {
      dominant = pole1;
    } else if (p2Percent > p1Percent) {
      dominant = pole2;
    } else {
      dominant = tiebreakWinner; // 50/50 tiebreaker
    }

    mbtiType += dominant;

    dimensions[dimension.toLowerCase()] = {
      pole1Score: p1Score,
      pole2Score: p2Score,
      pole1Percent: p1Percent,
      pole2Percent: p2Percent,
      dominant,
    };
  }

  // Get type metadata
  const typeInfo = mbtiTypeData[mbtiType];
  if (!typeInfo) {
    throw new Error(`Unknown MBTI type computed: ${mbtiType}`);
  }

  return {
    mbtiType,
    typeName: typeInfo.name,
    typeCategory: typeInfo.category,
    dimensions,
    strengths: typeInfo.strengths,
    weaknesses: typeInfo.weaknesses,
    famousPersonalities: typeInfo.famousPersonalities,
    learningStyle: typeInfo.learningStyle,
    workingStyle: typeInfo.workingStyle,
    summary: typeInfo.summary,
  };
};
