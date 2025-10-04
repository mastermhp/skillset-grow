// API route to update shift request status (accept/reject)
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Shift from "@/models/Shift"

export async function PATCH(request, { params }) {
  try {
    await connectDB()

    const { id: shiftId, requestId } = params
    const { status } = await request.json()

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const shift = await Shift.findById(shiftId)

    if (!shift) {
      return NextResponse.json({ error: "Shift not found" }, { status: 404 })
    }

    // Find the request
    const requestIndex = shift.requests.findIndex((req) => req._id.toString() === requestId)

    if (requestIndex === -1) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Update request status
    shift.requests[requestIndex].status = status

    // If accepted, add trainee to assignedTrainees
    if (status === "accepted") {
      const traineeId = shift.requests[requestIndex].trainee
      if (!shift.assignedTrainees.includes(traineeId)) {
        shift.assignedTrainees.push(traineeId)
      }

      // Check if shift is now filled
      if (shift.assignedTrainees.length >= shift.maxTrainees) {
        shift.status = "filled"
      }
    }

    await shift.save()

    return NextResponse.json({
      message: `Request ${status} successfully`,
      shift,
    })
  } catch (error) {
    console.error("[v0] Update shift request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
