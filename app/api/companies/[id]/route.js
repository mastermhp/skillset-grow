import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const company = await User.findOne({ _id: params.id, role: "company" }).select("-password")

    if (!company) {
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      company,
    })
  } catch (error) {
    console.error("[v0] Get company error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
