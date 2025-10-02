import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const trainer = await User.findOne({ _id: params.id, role: "trainer" }).select("-password")

    if (!trainer) {
      return NextResponse.json({ success: false, error: "Trainer not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      trainer,
    })
  } catch (error) {
    console.error("[v0] Get trainer error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
