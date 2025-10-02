// Message model for chat system
import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        url: String,
        publicId: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
