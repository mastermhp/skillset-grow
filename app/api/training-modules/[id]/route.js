// Single training module API routes
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import TrainingModule from "@/models/TrainingModule"

// GET single training module
export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const module = await TrainingModule.findById(id)
      .populate("company", "companyName companyLogo")
      .populate("trainer", "fullName profileImage rating")
      .populate("enrolledTrainees", "fullName profileImage")

    if (!module) {
      return NextResponse.json({ error: "Training module not found" }, { status: 404 })
    }

    // Increment views
    module.views += 1
    await module.save()

    return NextResponse.json({ module })
  } catch (error) {
    console.error("[v0] Get training module error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT update training module
export async function PUT(request, { params }) {
  try {
    await connectDB()

    const { id } = params
    const body = await request.json()

    const module = await TrainingModule.findByIdAndUpdate(id, { $set: body }, { new: true })

    if (!module) {
      return NextResponse.json({ error: "Training module not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Training module updated successfully",
      module,
    })
  } catch (error) {
    console.error("[v0] Update training module error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE training module
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const module = await TrainingModule.findByIdAndDelete(id)

    if (!module) {
      return NextResponse.json({ error: "Training module not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Training module deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Delete training module error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
