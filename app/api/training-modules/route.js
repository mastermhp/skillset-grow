// Training modules API routes
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import TrainingModule from "@/models/TrainingModule"

// GET all training modules
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const companyId = searchParams.get("companyId")
    const trainerId = searchParams.get("trainerId")

    console.log("[v0] Fetching training modules with params:", { category, companyId, trainerId })

    const query = {}

    if (!trainerId && !companyId) {
      query.isPublished = true
    }

    if (category && category !== "All") {
      query.category = category
    }

    if (companyId) {
      query.company = companyId
    }

    if (trainerId) {
      query.trainer = trainerId
    }

    console.log("[v0] Query:", query)

    const modules = await TrainingModule.find(query)
      .populate("company", "companyName companyLogo profileImage fullName")
      .populate("trainer", "fullName profileImage rating")
      .sort({ createdAt: -1 })

    console.log("[v0] Found modules:", modules.length)

    return NextResponse.json({ success: true, modules })
  } catch (error) {
    console.error("[v0] Get training modules error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

// POST create new training module
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, category, companyId, trainerId, duration, price, videoUrl, thumbnail } = body

    console.log("[v0] Creating training module with data:", {
      title,
      category,
      companyId,
      trainerId,
      duration,
      price,
      hasVideoUrl: !!videoUrl,
      hasThumbnail: !!thumbnail,
    })

    if (!companyId) {
      return NextResponse.json({ error: "Company ID is required" }, { status: 400 })
    }

    const module = await TrainingModule.create({
      title,
      description,
      category,
      company: companyId,
      trainer: trainerId || null,
      duration,
      price: price || 0,
      thumbnail,
      videos: videoUrl
        ? [
            {
              title: title,
              url: videoUrl,
              duration: duration * 60, // Convert minutes to seconds
              order: 1,
            },
          ]
        : [],
      isPublished: true, // Auto-publish uploaded videos
    })

    console.log("[v0] Training module created successfully:", module._id)

    return NextResponse.json(
      {
        message: "Training module created successfully",
        module,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Create training module error:", error)
    return NextResponse.json({ success: false, error: error.message || "Internal server error" }, { status: 500 })
  }
}
