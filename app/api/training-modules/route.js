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

    const query = { isPublished: true }

    if (category && category !== "All") {
      query.category = category
    }

    if (companyId) {
      query.company = companyId
    }

    const modules = await TrainingModule.find(query)
      .populate("company", "companyName companyLogo")
      .populate("trainer", "fullName profileImage rating")
      .sort({ createdAt: -1 })

    return NextResponse.json({ modules })
  } catch (error) {
    console.error("[v0] Get training modules error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
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
      trainer: trainerId,
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
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
