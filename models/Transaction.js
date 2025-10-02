// Transaction model for payment history
import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["subscription", "training", "shift-payment", "refund"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    description: String,
    relatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedToModel",
    },
    relatedToModel: {
      type: String,
      enum: ["TrainingModule", "Shift", "User"],
    },
    paymentMethod: String,
    transactionId: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
