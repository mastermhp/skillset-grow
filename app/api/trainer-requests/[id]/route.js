import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import TrainerRequest from "@/models/TrainerRequest"
import User from "@/models/User"

// PATCH - Update trainer request status (accept/reject)
export async function PATCH(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    const trainerRequest = await TrainerRequest.findByIdAndUpdate(id, { status }, { new: true })
      .populate("trainer", "fullName email profileImage expertise isVerified")
      .populate("company", "fullName email profileImage")

    if (!trainerRequest) {
      return NextResponse.json({ success: false, error: "Request not found" }, { status: 404 })
    }

    // If accepted, update the trainer's company association
    if (status === "accepted") {
      await User.findByIdAndUpdate(trainerRequest.trainer._id, {
        companyId: trainerRequest.company._id,
      })
    }

    return NextResponse.json({
      success: true,
      request: trainerRequest,
    })
  } catch (error) {
    console.error("[v0] Update trainer request error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
