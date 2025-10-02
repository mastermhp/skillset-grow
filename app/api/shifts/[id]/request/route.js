// Shift request API route
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Shift from "@/models/Shift"

// POST request a shift
export async function POST(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json()
    const { traineeId } = body

    const shift = await Shift.findById(id)

    if (!shift) {
      return NextResponse.json({ error: "Shift not found" }, { status: 404 })
    }

    // Check if trainee already requested
    const existingRequest = shift.requests.find((req) => req.trainee.toString() === traineeId)

    if (existingRequest) {
      return NextResponse.json({ error: "Already requested this shift" }, { status: 400 })
    }

    // Add request
    shift.requests.push({
      trainee: traineeId,
      status: "pending",
    })

    await shift.save()

    return NextResponse.json({
      message: "Shift request submitted successfully",
      shift,
    })
  } catch (error) {
    console.error("[v0] Request shift error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
