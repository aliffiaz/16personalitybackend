import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      enum: ["1 Month", "3 Months", "6 Months", "1 Year"],
      required: true,
    },

    appleProductId: {
      type: String,
      required: false,
      trim: true,
    },

    durationInDays: {
      type: Number, // 30, 90, 180, 365
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    description: String,
    features: [String],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

