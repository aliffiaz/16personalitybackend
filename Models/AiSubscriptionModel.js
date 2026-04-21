import mongoose from "mongoose";
const aiSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  usageCount: {
    type: Number,
    default: 0,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const AiSubscription = mongoose.model("AiSubscription", aiSubscriptionSchema);

export default AiSubscription;