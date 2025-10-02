// User model for trainees, trainers, companies, and admin
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["trainee", "trainer", "company", "admin"],
      required: true,
    },
    profileImage: {
      url: String,
      publicId: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Trainee specific fields
    completedTrainings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainingModule",
      },
    ],
    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certification",
      },
    ],
    // Trainer specific fields
    expertise: [String],
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    certificate: {
      url: String,
      publicId: String,
    },
    serviceType: String,
    availableTimeSlots: [String],
    // Company specific fields
    companyName: String,
    companyLogo: {
      url: String,
      publicId: String,
    },
    companyDescription: String,
    industry: String,
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    location: String,
    website: String,
    // Training certificate for companies
    trainingCertificate: {
      url: String,
      publicId: String,
    },
    services: [String],
    // Subscription
    subscription: {
      isActive: {
        type: Boolean,
        default: false,
      },
      plan: {
        type: String,
        enum: ["basic", "premium", "enterprise"],
      },
      startDate: Date,
      endDate: Date,
    },
    // Additional info
    phoneNumber: String,
    address: String,
    bio: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
