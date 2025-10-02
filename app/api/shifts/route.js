// Shifts API routes
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Shift from "@/models/Shift"

// GET all shifts
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get("companyId")
    const status = searchParams.get("status")

    const query = {}

    if (companyId) {
      query.company = companyId
    }

    if (status) {
      query.status = status
    }

    const shifts = await Shift.find(query)
      .populate("company", "companyName companyLogo")
      .populate("requiredTraining", "title")
      .populate("requests.trainee", "fullName profileImage")
      .populate("assignedTrainees", "fullName profileImage")
      .sort({ date: 1 })

    return NextResponse.json({ shifts })
  } catch (error) {
    console.error("[v0] Get shifts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create new shift
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    const shift = await Shift.create(body)

    return NextResponse.json(
      {
        message: "Shift created successfully",
        shift,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Create shift error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
