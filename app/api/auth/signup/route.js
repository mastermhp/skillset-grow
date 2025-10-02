// Signup API route
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadToCloudinary(file, folder) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      },
    )
    uploadStream.end(buffer)
  })
}

export async function POST(request) {
  try {
    await connectDB()

    const formData = await request.formData()
    const fullName = formData.get("fullName")
    const email = formData.get("email")
    const password = formData.get("password")
    const role = formData.get("role")
    const companyName = formData.get("companyName")
    const phoneNumber = formData.get("phoneNumber")
    const servicesString = formData.get("services")
    const services = servicesString ? JSON.parse(servicesString) : []
    const profileImage = formData.get("profileImage")
    const trainingCertificate = formData.get("trainingCertificate")

    const companyId = formData.get("companyId")
    const serviceType = formData.get("serviceType")
    const availableTimeSlotsString = formData.get("availableTimeSlots")
    const availableTimeSlots = availableTimeSlotsString ? JSON.parse(availableTimeSlotsString) : []
    const certificate = formData.get("certificate")

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user data
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      role,
    }

    if (role === "company") {
      if (companyName) userData.companyName = companyName
      if (phoneNumber) userData.phoneNumber = phoneNumber
      if (services && services.length > 0) userData.services = services

      // Upload profile image if provided
      if (profileImage && profileImage.size > 0) {
        try {
          const uploadResult = await uploadToCloudinary(profileImage, "profile-images")
          userData.profileImage = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          }
        } catch (uploadError) {
          console.error("[v0] Profile image upload error:", uploadError)
        }
      }

      // Upload training certificate if provided
      if (trainingCertificate && trainingCertificate.size > 0) {
        try {
          const uploadResult = await uploadToCloudinary(trainingCertificate, "training-certificates")
          userData.trainingCertificate = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          }
        } catch (uploadError) {
          console.error("[v0] Training certificate upload error:", uploadError)
        }
      }
    }

    if (role === "trainer") {
      if (companyId) userData.companyId = companyId
      if (serviceType) userData.serviceType = serviceType
      if (phoneNumber) userData.phoneNumber = phoneNumber
      if (availableTimeSlots && availableTimeSlots.length > 0) userData.availableTimeSlots = availableTimeSlots

      // Upload profile image if provided
      if (profileImage && profileImage.size > 0) {
        try {
          const uploadResult = await uploadToCloudinary(profileImage, "profile-images")
          userData.profileImage = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          }
        } catch (uploadError) {
          console.error("[v0] Profile image upload error:", uploadError)
        }
      }

      // Upload certificate if provided
      if (certificate && certificate.size > 0) {
        try {
          const uploadResult = await uploadToCloudinary(certificate, "trainer-certificates")
          userData.certificate = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          }
        } catch (uploadError) {
          console.error("[v0] Certificate upload error:", uploadError)
        }
      }
    }

    const user = await User.create(userData)

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    const responseUser = {
      _id: user._id,
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    }

    // Add role-specific fields to response
    if (user.role === "company") {
      if (user.companyName) responseUser.companyName = user.companyName
      if (user.phoneNumber) responseUser.phoneNumber = user.phoneNumber
      if (user.services) responseUser.services = user.services
      if (user.profileImage) responseUser.profileImage = user.profileImage
    }

    if (user.role === "trainer") {
      if (user.companyId) responseUser.companyId = user.companyId
      if (user.serviceType) responseUser.serviceType = user.serviceType
      if (user.phoneNumber) responseUser.phoneNumber = user.phoneNumber
      if (user.availableTimeSlots) responseUser.availableTimeSlots = user.availableTimeSlots
      if (user.profileImage) responseUser.profileImage = user.profileImage
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: responseUser,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
