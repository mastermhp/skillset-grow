import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let stats = {}

    if (role === "company") {
      const totalTrainers = await User.countDocuments({ role: "trainer" })
      const activeTrainers = await User.countDocuments({ role: "trainer", isActive: true })
      const inactiveTrainers = totalTrainers - activeTrainers
      const totalRevenue = 22323 // This would come from actual payment records

      stats = {
        totalRevenue,
        totalTrainers,
        activeTrainers,
        inactiveTrainers,
        monthlyRevenue: [
          { month: "Jan", call: 1200, videoCall: 800, videos: 1500 },
          { month: "Feb", call: 1500, videoCall: 1200, videos: 1800 },
          { month: "Mar", call: 1000, videoCall: 900, videos: 1200 },
          { month: "Apr", call: 800, videoCall: 700, videos: 1000 },
          { month: "May", call: 2200, videoCall: 1800, videos: 2500 },
          { month: "Jun", call: 600, videoCall: 500, videos: 800 },
          { month: "Jul", call: 1400, videoCall: 1100, videos: 1600 },
          { month: "Aug", call: 1200, videoCall: 1000, videos: 1400 },
          { month: "Sep", call: 400, videoCall: 300, videos: 600 },
          { month: "Oct", call: 1900, videoCall: 1600, videos: 2200 },
          { month: "Nov", call: 1000, videoCall: 800, videos: 1200 },
          { month: "Dec", call: 900, videoCall: 700, videos: 1100 },
        ],
      }
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("[v0] Get dashboard stats error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
