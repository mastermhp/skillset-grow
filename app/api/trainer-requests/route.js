import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import TrainerRequest from "@/models/TrainerRequest"

// GET - Fetch trainer requests
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get("companyId")
    const trainerId = searchParams.get("trainerId")
    const status = searchParams.get("status")

    const query = {}
    if (companyId) query.company = companyId
    if (trainerId) query.trainer = trainerId
    if (status) query.status = status

    const requests = await TrainerRequest.find(query)
      .populate("trainer", "fullName email profileImage expertise isVerified")
      .populate("company", "fullName email profileImage")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      requests,
    })
  } catch (error) {
    console.error("[v0] Get trainer requests error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST - Create a new trainer request
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { trainerId, companyId, message } = body

    if (!trainerId || !companyId) {
      return NextResponse.json({ success: false, error: "Trainer ID and Company ID are required" }, { status: 400 })
    }

    // Check if request already exists
    const existingRequest = await TrainerRequest.findOne({
      trainer: trainerId,
      company: companyId,
      status: "pending",
    })

    if (existingRequest) {
      return NextResponse.json({ success: false, error: "Request already sent" }, { status: 400 })
    }

    const trainerRequest = await TrainerRequest.create({
      trainer: trainerId,
      company: companyId,
      message: message || "",
    })

    const populatedRequest = await TrainerRequest.findById(trainerRequest._id)
      .populate("trainer", "fullName email profileImage expertise isVerified")
      .populate("company", "fullName email profileImage")

    return NextResponse.json({
      success: true,
      request: populatedRequest,
    })
  } catch (error) {
    console.error("[v0] Create trainer request error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
