import mongoose from "mongoose";

const testSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["in_progress", "completed", "abandoned"],
      default: "in_progress",
    },
    answers: [
      {
        questionId: {
          type: Number,
          required: true,
          min: 1,
          max: 60,
        },
        score: {
          type: Number,
          required: true,
          min: 1,
          max: 7,
        },
      },
    ],
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 60,
    },
    questionOrder: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

// Partial Unique Index: Only one "in_progress" test allowed per user at a time.
testSessionSchema.index(
  { userId: 1, status: 1 },
  { 
    unique: true, 
    partialFilterExpression: { status: "in_progress" } 
  }
);

export default mongoose.model("TestSession", testSessionSchema);
