// File upload API route using Cloudinary
import { NextResponse } from "next/server"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const folder = formData.get("folder") || "skillset-grow"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Videos: 500MB, Images: 10MB
    const isVideo = file.type.startsWith("video/")
    const maxSize = isVideo ? 500 * 1024 * 1024 : 10 * 1024 * 1024
    const maxSizeMB = maxSize / (1024 * 1024)

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File size exceeds ${maxSizeMB}MB limit. ${isVideo ? "For videos larger than 500MB, consider compressing the video or splitting it into multiple parts." : ""}`,
        },
        { status: 413 },
      )
    }

    console.log(
      `[v0] Uploading ${isVideo ? "video" : "image"}: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`,
    )

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

    const result = await uploadToCloudinary(base64, folder, {
      // For videos, use eager transformation to optimize delivery
      ...(isVideo && {
        eager: [{ streaming_profile: "auto", format: "m3u8" }],
        eager_async: true,
      }),
    })

    console.log(`[v0] Upload successful: ${result.url}`)

    return NextResponse.json({
      message: "File uploaded successfully",
      ...result,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)

    if (error.http_code === 413 || error.message?.includes("413") || error.message?.includes("too large")) {
      return NextResponse.json(
        {
          error:
            "File is too large for Cloudinary. Please compress your video or use a file under 500MB. Consider using video compression tools or splitting large videos into smaller segments.",
        },
        { status: 413 },
      )
    }

    if (error.message?.includes("timeout") || error.message?.includes("ETIMEDOUT")) {
      return NextResponse.json(
        { error: "Upload timeout. The file may be too large or your connection is slow. Please try again." },
        { status: 408 },
      )
    }

    if (error.message?.includes("Invalid")) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 })
  }
}
