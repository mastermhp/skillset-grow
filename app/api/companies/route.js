import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = Number.parseInt(searchParams.get("skip")) || 0

    const companies = await User.find({ role: "company" })
      .select("companyName email companyLogo companyDescription isVerified isActive")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })

    // Calculate additional stats for each company
    const companiesWithStats = companies.map((company) => ({
      ...company.toObject(),
      totalTrainers: Math.floor(Math.random() * 100) + 10, // This would come from actual data
      totalVideos: Math.floor(Math.random() * 200) + 50, // This would come from TrainingModule count
    }))

    return NextResponse.json({
      success: true,
      companies: companiesWithStats,
      total: await User.countDocuments({ role: "company" }),
    })
  } catch (error) {
    console.error("[v0] Get companies error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
