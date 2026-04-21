import mongoose from "mongoose";

const personalityPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true, // e.g. 499, 999 — in INR (fully variable, no hardcoding)
    },

    testsAllowed: {
      type: Number,
      required: true, // e.g. 3, 6 — number of test attempts granted
      min: 1,
    },

    description: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [], // marketing bullet points shown on pricing page
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PersonalityPlan", personalityPlanSchema);
