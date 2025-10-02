// Certification model
import mongoose from "mongoose"

const CertificationSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainingModule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingModule",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completionDate: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: Number,
      required: true,
    },
    certificateUrl: String,
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Certification || mongoose.model("Certification", CertificationSchema)
