// Signin API route
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password, role } = body

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email, role })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      subscription: user.subscription,
    }

    // Add role-specific fields
    if (user.role === "trainer") {
      userResponse.companyId = user.companyId
      userResponse.expertise = user.expertise
      userResponse.experience = user.experience
      userResponse.certifications = user.certifications
      userResponse.videoCallSlots = user.videoCallSlots
    } else if (user.role === "company") {
      userResponse.companyName = user.companyName
      userResponse.industry = user.industry
      userResponse.companySize = user.companySize
      userResponse.website = user.website
    }

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userResponse,
    })
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
