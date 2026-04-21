import mongoose from "mongoose";

const reportDeliverySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalityResult",
      required: true,
    },
    channel: {
      type: String,
      enum: ["email", "download", "parent_email"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    sentAt: {
      type: Date,
    },
    recipientEmail: {
      type: String,
    },
    retryCount: {
      type: Number,
      default: 0,
    },
    errorMessage: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const ReportDelivery = mongoose.models.ReportDelivery || mongoose.model("ReportDelivery", reportDeliverySchema);

export default ReportDelivery;
