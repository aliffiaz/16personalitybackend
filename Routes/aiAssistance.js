import express from "express";
import {
  generatePsychometricTest,
  analyzePsychometricAnswers,
  generateCareerGuidanceTest,
  generateCareerGuidance,
  getInitialCareerQuestions,
  getInitialPsychometricQuestions,
  careerFollowupQuestions,
  analyzeCareerFull,
  analyzePsychometricFull,
  psychometricFollowupQuestions,
} from "../Controllers/AiAssistanceController.js";
import { protect } from "../Middleware/authMiddleware.js";
const router = express.Router();

// Used interchangeably array in QuickAssessment depending on type:
router.get("/psychometric-test", generatePsychometricTest);
router.post("/psychometric-result", analyzePsychometricAnswers);
router.get("/career-guidance-test", generateCareerGuidanceTest);
router.post("/career-guidance-result", generateCareerGuidance);

// Main endpoints hit by QuickAssessment.jsx
router.post("/initial-career-questions", protect, getInitialCareerQuestions);
router.post("/initial-psychometric-questions", protect, getInitialPsychometricQuestions);
router.post("/career-followup-questions", protect, careerFollowupQuestions);
router.post("/psychometric-followup-questions", protect, psychometricFollowupQuestions);
router.post("/analyze-career-full", protect, analyzeCareerFull);
router.post("/analyze-psychometric-full", protect, analyzePsychometricFull);

export default router;
