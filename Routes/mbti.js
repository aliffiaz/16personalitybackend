import express from "express";
import {
  startTest,
  saveAnswer,
  saveProgress,
  submitTest,
  getLatestResult,
  getTestSession,
  getResultHistory,
  getCareerGuidance,
  getPersonalizedCareerAdvice,
  generateReport,
  downloadReport,
} from "../Controllers/MBTIController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/test/start", protect, startTest);
router.put("/test/:sessionId/answer", protect, saveAnswer);
router.post("/test/:sessionId/progress", protect, saveProgress);
router.post("/test/:sessionId/submit", protect, submitTest);
router.get("/test/:sessionId", protect, getTestSession);

router.get("/results/:userId/latest", protect, getLatestResult);
router.get("/results/:userId/history", protect, getResultHistory);

router.get("/career-guidance/:mbtiType", protect, getCareerGuidance);
router.post("/career-guidance/personalized", protect, getPersonalizedCareerAdvice);

router.post("/report/generate", protect, generateReport);
router.get("/report/:resultId/download", protect, downloadReport);

export default router;
