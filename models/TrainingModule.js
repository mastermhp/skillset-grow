// Training module model
import mongoose from "mongoose"

const TrainingModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    thumbnail: {
      url: String,
      publicId: String,
    },
    videos: [
      {
        title: String,
        url: String,
        publicId: String,
        duration: Number, // in seconds
        order: Number,
      },
    ],
    materials: [
      {
        title: String,
        url: String,
        publicId: String,
        type: String, // pdf, doc, etc.
      },
    ],
    quizzes: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
    duration: {
      type: Number, // total duration in minutes
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    enrolledTrainees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.TrainingModule || mongoose.model("TrainingModule", TrainingModuleSchema)
