import mongoose from "mongoose";

const personalitySubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalityPlan",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    // Snapshot of how many tests were granted at purchase time
    testsAllowed: {
      type: Number,
      required: true,
    },

    // Incremented each time the student starts a new test session
    testsUsed: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "exhausted", "failed"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Index for fast user quota lookups
personalitySubscriptionSchema.index({ userId: 1, status: 1 });

export default mongoose.model(
  "PersonalitySubscription",
  personalitySubscriptionSchema
);
