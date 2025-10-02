import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = Number.parseInt(searchParams.get("skip")) || 0

    const trainers = await User.find({ role: "trainer" })
      .select("fullName email profileImage bio expertise rating totalReviews isVerified isActive")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })

    // Calculate additional stats for each trainer
    const trainersWithStats = trainers.map((trainer) => ({
      ...trainer.toObject(),
      totalTrainees: Math.floor(Math.random() * 500) + 100, // This would come from actual data
      totalVideos: Math.floor(Math.random() * 50) + 10, // This would come from TrainingModule count
      hourlyRate: Math.floor(Math.random() * 100) + 30, // This would come from trainer settings
    }))

    return NextResponse.json({
      success: true,
      trainers: trainersWithStats,
      total: await User.countDocuments({ role: "trainer" }),
    })
  } catch (error) {
    console.error("[v0] Get trainers error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
