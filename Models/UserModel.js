import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: null
    },
    // Required for the personality module
    personalityTestsRemaining: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
