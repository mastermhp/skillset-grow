import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request, { params }) {
  try {
    await connectDB()

    console.log("[v0] Fetching company with ID:", params.id)

    // Validate ObjectId format
    if (!params.id || params.id.length !== 24) {
      console.log("[v0] Invalid company ID format:", params.id)
      return NextResponse.json({ success: false, error: "Invalid company ID format" }, { status: 400 })
    }

    const company = await User.findOne({ _id: params.id, role: "company" }).select("-password")

    if (!company) {
      console.log("[v0] Company not found with ID:", params.id)
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 })
    }

    console.log("[v0] Company found:", company.fullName)
    return NextResponse.json({
      success: true,
      company,
    })
  } catch (error) {
    console.error("[v0] Get company error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
