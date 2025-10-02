// Signup API route
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { fullName, email, password, role, companyName } = body

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

    // Create user
    const userData = {
      fullName,
      email,
      password: hashedPassword,
      role,
    }

    if (role === "company" && companyName) {
      userData.companyName = companyName
    }

    const user = await User.create(userData)

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
