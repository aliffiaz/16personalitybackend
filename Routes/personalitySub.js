import express from "express";
import {
  getPersonalityPlans,
  createPersonalityOrder,
  verifyPersonalityPayment,
  getMyQuota,
  validateCoupon,
  createCoupon,
  getAllCoupons,
} from "../Controllers/PersonalitySubscriptionController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Fetch all available personality test plans
router.get("/plans", getPersonalityPlans);

// Create a Razorpay order
router.post("/create-order", protect, createPersonalityOrder);

// Verify the Razorpay payment
router.post("/verify-payment", protect, verifyPersonalityPayment);

// Get the user's current quota and plan history
router.get("/my-quota", protect, getMyQuota);

// Validate coupon
router.post("/validate-coupon", protect, validateCoupon);

// Admin: Create a new coupon
router.post("/admin/create-coupon", protect, createCoupon);

// Admin: Get all coupons
router.get("/admin/all-coupons", protect, getAllCoupons);

export default router;
