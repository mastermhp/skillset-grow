// Shift model for company scheduling
import mongoose from "mongoose"

const ShiftSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    requiredTraining: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingModule",
    },
    maxTrainees: {
      type: Number,
      default: 1,
    },
    requests: [
      {
        trainee: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    assignedTrainees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["open", "filled", "completed", "cancelled"],
      default: "open",
    },
    payRate: Number,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Shift || mongoose.model("Shift", ShiftSchema)
