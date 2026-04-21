import mongoose from "mongoose";

const dimensionScoreSchema = new mongoose.Schema(
  {
    pole1Score: { type: Number, required: true },
    pole2Score: { type: Number, required: true },
    pole1Percent: { type: Number, required: true },
    pole2Percent: { type: Number, required: true },
    dominant: { type: String, required: true },
  },
  { _id: false }
);

const personalityResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestSession",
      required: true,
    },
    mbtiType: {
      type: String,
      required: true,
      enum: [
        "INTJ", "INTP", "ENTJ", "ENTP",
        "INFJ", "INFP", "ENFJ", "ENFP",
        "ISTJ", "ISFJ", "ESTJ", "ESFJ",
        "ISTP", "ISFP", "ESTP", "ESFP",
      ],
    },
    typeName: {
      type: String,
      required: true,
    },
    typeCategory: {
      type: String,
      required: true,
      enum: ["Analyst", "Diplomat", "Sentinel", "Explorer"],
    },
    dimensions: {
      mind: dimensionScoreSchema,    // I vs E
      energy: dimensionScoreSchema,  // N vs S
      nature: dimensionScoreSchema,  // T vs F
      tactics: dimensionScoreSchema, // J vs P
    },
    strengths: [String],
    weaknesses: [String],
    famousPersonalities: [String],
    learningStyle: String,
    workingStyle: String,
    summary: String,
    aiAdvice: String,
    fullProfile: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

// Index for quick user result lookups
personalityResultSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("PersonalityResult", personalityResultSchema);
