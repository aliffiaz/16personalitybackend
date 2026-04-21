import Razorpay from "razorpay";
import crypto from "crypto";
import PersonalityPlan from "../Models/PersonalityPlanModel.js";
import PersonalitySubscription from "../Models/PersonalitySubscriptionModel.js";
import User from "../Models/UserModel.js";
import Payment from "../Models/PaymentModel.js";
import Coupon from "../Models/CouponModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ============================================================
   1. Get All Active Personality Plans
   GET /api/personality-sub/plans
   Public — no auth needed
============================================================ */
export const getPersonalityPlans = async (req, res) => {
  try {
    const plans = await PersonalityPlan.find({ isActive: true }).sort({
      amount: 1,
    });

    if (!plans || plans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active personality plans found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    console.error("Get Personality Plans Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch plans.",
    });
  }
};

/* ============================================================
   2. Get Current Quota for Logged-In User
   GET /api/personality-sub/my-quota
   Protected
============================================================ */
export const getMyQuota = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select(
      "personalityTestsRemaining FullName"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Also pull the latest active subscription for extra context
    const latestSub = await PersonalitySubscription.findOne({
      userId,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("planId", "name testsAllowed amount");

    return res.status(200).json({
      success: true,
      data: {
        testsRemaining: user.personalityTestsRemaining,
        latestSubscription: latestSub || null,
      },
    });
  } catch (error) {
    console.error("Get My Quota Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch quota.",
    });
  }
};

/* ============================================================
   2.5 Validate Coupon
   POST /api/personality-sub/validate-coupon
   Protected
   Body: { code, planId }
============================================================ */
export const validateCoupon = async (req, res) => {
  try {
    const { code, planId } = req.body;
    const userId = req.userId;

    if (!code || !planId) {
      return res.status(400).json({
        success: false,
        message: "code and planId are required.",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
      status: "active",
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found or inactive.",
      });
    }

    // Check dates
    const now = new Date();
    if (coupon.startDate && now < coupon.startDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon campaign has not started yet.",
      });
    }
    if (coupon.endDate && now > coupon.endDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired.",
      });
    }

    // Check usage limits
    if (coupon.usage === "limited" && coupon.usedCount >= coupon.allowCount) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached.",
      });
    }

    // Check if user already used this coupon (one time per user check)
    const alreadyUsed = coupon.usedBy.find(
      (entry) => entry.studentId.toString() === userId
    );
    if (alreadyUsed) {
      return res.status(400).json({
        success: false,
        message: "You have already used this coupon.",
      });
    }

    // Get the plan to calculate discount
    const plan = await PersonalityPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid or inactive plan selected link.",
      });
    }

    const discountAmount = (plan.amount * coupon.applicableDiscountPercent) / 100;
    const finalAmount = plan.amount - discountAmount;

    return res.status(200).json({
      success: true,
      message: `${coupon.applicableDiscountPercent}% discount applied!`,
      data: {
        code: coupon.code,
        discountPercent: coupon.applicableDiscountPercent,
        originalAmount: plan.amount,
        discountAmount,
        finalAmount,
      },
    });
  } catch (error) {
    console.error("Validate Coupon Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to validate coupon.",
    });
  }
};

/* ============================================================
   3. Create Razorpay Order for a Personality Plan Purchase
   POST /api/personality-sub/create-order
   Protected
   Body: { planId }
============================================================ */
export const createPersonalityOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId, couponCode } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "planId is required.",
      });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Fetch and validate plan
    const plan = await PersonalityPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({
        success: false,
        message: "Plan not found or inactive.",
      });
    }

    let finalAmount = plan.amount;
    let discountAmount = 0;
    let validatedCoupon = null;

    // Optional Coupon Validation
    if (couponCode) {
      validatedCoupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        active: true,
        status: "active",
      });

      if (validatedCoupon) {
        // Re-check all constraints for security
        const now = new Date();
        const withinDates = (!validatedCoupon.startDate || now >= validatedCoupon.startDate) &&
                           (!validatedCoupon.endDate || now <= validatedCoupon.endDate);
        const withinLimits = (validatedCoupon.usage === "unlimited" || validatedCoupon.usedCount < validatedCoupon.allowCount);
        const notUsedByUser = !validatedCoupon.usedBy.find(u => u.studentId.toString() === userId);

        if (withinDates && withinLimits && notUsedByUser) {
          discountAmount = (plan.amount * validatedCoupon.applicableDiscountPercent) / 100;
          finalAmount = plan.amount - discountAmount;
        }
      }
    }

    // ── Handle Free Orders (100% Discount) ───────────────────
    if (finalAmount === 0) {
      const freeOrderId = `FREE_OR_${Date.now()}`;
      const freePaymentId = `FREE_TXN_${Date.now()}`;

      // 1. Create Paid Payment record
      await Payment.create({
        orderId: freeOrderId,
        amount: 0,
        userId: userId,
        currency: "INR",
        paymentType: "personality-test",
        status: "paid",
        paymentId: freePaymentId,
        couponCode: couponCode || null,
        discountAmount: discountAmount,
      });

      // 2. Create Subscription
      await PersonalitySubscription.create({
        userId,
        planId,
        orderId: freeOrderId,
        paymentId: freePaymentId,
        testsAllowed: plan.testsAllowed,
        testsUsed: 0,
        status: "active",
      });

      // 3. Increment user's cached test counter
      await User.findByIdAndUpdate(userId, {
        $inc: { personalityTestsRemaining: plan.testsAllowed },
      });

      // 4. Finalize Coupon Usage if applicable
      if (couponCode) {
        await Coupon.findOneAndUpdate(
          { code: couponCode.toUpperCase() },
          {
            $inc: { usedCount: 1 },
            $push: {
              usedBy: {
                studentId: userId,
                usedAt: new Date()
              }
            }
          }
        );
      }

      return res.status(201).json({
        success: true,
        isFree: true,
        message: `Success! ${plan.name} has been activated with your coupon.`,
        plan: {
          name: plan.name,
          testsAllowed: plan.testsAllowed,
        }
      });
    }

    // ── Handle Regular Paid Orders (Razorpay) ───────────────────
    
    // Create Razorpay order (amount in paise — 1 INR = 100 paise)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(finalAmount * 100),
      currency: "INR",
      receipt: `personality_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        planId: planId.toString(),
        testsAllowed: plan.testsAllowed,
        couponCode: couponCode || "",
        discountAmount: discountAmount.toString(),
      },
    });

    // Record the payment intent in DB
    await Payment.create({
      orderId: razorpayOrder.id,
      amount: finalAmount,
      userId: userId,
      currency: "INR",
      paymentType: "personality-test",
      status: "created",
      couponCode: couponCode || null,
      discountAmount: discountAmount,
    });

    return res.status(201).json({
      success: true,
      isFree: false,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,        // in paise
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,    // frontend uses this to init Razorpay checkout
      plan: {
        name: plan.name,
        testsAllowed: plan.testsAllowed,
        amount: plan.amount,
      },
      prefill: {
        name: user.FullName,
        email: user.email,
        contact: user.phoneNumber || "",
      },
    });
  } catch (error) {
    console.error("Create Personality Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create payment order.",
    });
  }
};

/* ============================================================
   4. Verify Razorpay Payment + Activate Subscription
   POST /api/personality-sub/verify-payment
   Protected
   Body: { orderId, paymentId, signature, planId }
============================================================ */
export const verifyPersonalityPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, paymentId, signature, planId } = req.body;

    if (!orderId || !paymentId || !signature || !planId) {
      return res.status(400).json({
        success: false,
        message: "orderId, paymentId, signature, and planId are required.",
      });
    }

    // ── Step 1: Verify Razorpay HMAC signature ──────────────────
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      // Mark payment as failed
      await Payment.findOneAndUpdate(
        { orderId },
        { status: "failed", paymentId }
      );
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: invalid signature.",
      });
    }

    // ── Step 2: Fetch the plan to get testsAllowed ───────────────
    const plan = await PersonalityPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    // ── Step 3: Create the PersonalitySubscription record ────────
    const existingSub = await PersonalitySubscription.findOne({
      userId,
      status: "active",
    });

    await PersonalitySubscription.create({
      userId,
      planId,
      orderId,
      paymentId,
      testsAllowed: plan.testsAllowed,
      testsUsed: 0,
      status: "active",
    });

    // ── Step 4: Increment user's cached test counter ──────────
    // We add on top of existing remaining tests so a user can
    // "top up" while still having tests left from a previous plan.
    await User.findByIdAndUpdate(userId, {
      $inc: { personalityTestsRemaining: plan.testsAllowed },
    });

    // ── Step 5: Mark Payment as paid ─────────────────────────────
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { status: "paid", paymentId },
      { new: true }
    );

    // ── Step 6: Finalize Coupon Usage if applicable ──────────────
    if (payment && payment.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: payment.couponCode.toUpperCase() },
        {
          $inc: { usedCount: 1 },
          $push: {
            usedBy: {
              studentId: userId,
              usedAt: new Date()
            }
          }
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: `Payment verified! You now have ${plan.testsAllowed} new test(s) added to your account.`,
      testsAdded: plan.testsAllowed,
    });
  } catch (error) {
    console.error("Verify Personality Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed. Please contact support.",
    });
  }
};

/* ============================================================
   5. Create a Personality Plan (Admin only)
   POST /api/personality-sub/admin/create-plan
   Protected (caller is responsible for admin check in route)
   Body: { name, amount, testsAllowed, description, features }
============================================================ */
export const createPersonalityPlan = async (req, res) => {
  try {
    const { name, amount, testsAllowed, description, features } = req.body;

    if (!name || !amount || !testsAllowed) {
      return res.status(400).json({
        success: false,
        message: "name, amount, and testsAllowed are required.",
      });
    }

    if (amount <= 0 || testsAllowed < 1) {
      return res.status(400).json({
        success: false,
        message: "amount must be positive; testsAllowed must be at least 1.",
      });
    }

    const plan = await PersonalityPlan.create({
      name,
      amount,
      testsAllowed,
      description: description || "",
      features: features || [],
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Personality plan created successfully.",
      data: plan,
    });
  } catch (error) {
    console.error("Create Personality Plan Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create plan.",
    });
  }
};

/* ============================================================
   6. Update a Personality Plan (Admin only)
   PATCH /api/personality-sub/admin/update-plan/:planId
============================================================ */
export const updatePersonalityPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, amount, testsAllowed, description, features, isActive } =
      req.body;

    const plan = await PersonalityPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found.",
      });
    }

    if (name !== undefined) plan.name = name;
    if (amount !== undefined) plan.amount = amount;
    if (testsAllowed !== undefined) plan.testsAllowed = testsAllowed;
    if (description !== undefined) plan.description = description;
    if (features !== undefined) plan.features = features;
    if (isActive !== undefined) plan.isActive = isActive;

    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan updated successfully.",
      data: plan,
    });
  } catch (error) {
    console.error("Update Personality Plan Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update plan.",
    });
  }
};

/* ============================================================
   7. Get All Subscriptions for a User (admin / debug)
   GET /api/personality-sub/my-subscriptions
   Protected
============================================================ */
export const getMySubscriptions = async (req, res) => {
  try {
    const userId = req.userId;

    const subs = await PersonalitySubscription.find({ userId })
      .sort({ createdAt: -1 })
      .populate("planId", "name amount testsAllowed");

    return res.status(200).json({
      success: true,
      data: subs,
    });
  } catch (error) {
    console.error("Get My Subscriptions Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscriptions.",
    });
  }
};

/* ============================================================
   8. Create a Coupon (Admin only)
   POST /api/personality-sub/admin/create-coupon
   Protected
   Body: { code, applicableDiscountPercent, allowCount, usage, startDate, endDate, ... }
============================================================ */
export const createCoupon = async (req, res) => {
  try {
    const { 
      code, 
      applicableDiscountPercent, 
      allowCount, 
      usage, 
      startDate, 
      endDate,
      campaignName,
      issuedToAgentName,
      issuedToSchoolName
    } = req.body;

    if (!code || !applicableDiscountPercent || !allowCount || !usage) {
      return res.status(400).json({
        success: false,
        message: "code, applicableDiscountPercent, allowCount, and usage are required.",
      });
    }

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: "A coupon with this code already exists.",
      });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      applicableDiscountPercent,
      allowCount,
      usage,
      startDate,
      endDate,
      campaignName,
      issuedToAgentName,
      issuedToSchoolName,
      status: "active",
      active: true,
      usedCount: 0,
      usedBy: []
    });

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully.",
      data: coupon,
    });
  } catch (error) {
    console.error("Create Coupon Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create coupon.",
    });
  }
};

/* ============================================================
   9. Get All Coupons (Admin only)
   GET /api/personality-sub/admin/all-coupons
   Protected
============================================================ */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    console.error("Get All Coupons Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch coupons.",
    });
  }
};
