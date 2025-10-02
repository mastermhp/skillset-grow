// Review model for trainers and training modules
import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trainingModule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingModule",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema)
