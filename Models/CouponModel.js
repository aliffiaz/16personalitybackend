import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    // Coupon Code
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // Campaign Info
    campaignName: {
      type: String,
      trim: true,
    },

    // Validity
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    // Status control
    status: {
      type: String,
      enum: ["active", "used", "expired"],
      default: "active",
      index: true,
      tolowercase: true,
    },

    // Discount (percentage only as requested)
    applicableDiscountPercent: {
      type: Number,
      min: 1,
      max: 100,
    },
    usage:{
      type: String,
      enum:["limited","unlimited"],
    }
    ,

    // Usage limits
    allowCount: {
      type: Number,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Issued To (Agent / Individual)
    issuedToAgentName: {
      type: String,
      trim: true,
    },
    issuedToEmails: {
      type: [String],
      trim: true,
    },

    issuedToMobiles: {
      type: [String],
      trim: true,
    },

    issuedToSchoolName: {
      type: String,
      trim: true,
    },

    // Activation flag (manual kill-switch)
    active: {
      type: Boolean,
      default: true,
    },

    //usedBy records
    usedBy: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Optional but RECOMMENDED:
 * Prevent usedCount exceeding allowCount
 */
couponSchema.pre("save", function (next) {
  if (this.usedCount > this.allowCount) {
    return next(new Error("usedCount cannot exceed allowCount"));
  }
  next();
});

export default mongoose.model("Coupon", couponSchema);
