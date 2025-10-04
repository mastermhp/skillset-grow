import mongoose from "mongoose"

const TrainerRequestSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.TrainerRequest || mongoose.model("TrainerRequest", TrainerRequestSchema)
