// Support tickets API routes
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import SupportTicket from "@/models/SupportTicket"

// GET all support tickets
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const query = {}

    if (userId) {
      query.user = userId
    }

    const tickets = await SupportTicket.find(query)
      .populate("user", "fullName email profileImage")
      .populate("responses.user", "fullName profileImage")
      .sort({ createdAt: -1 })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("[v0] Get support tickets error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create support ticket
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    const ticket = await SupportTicket.create(body)

    return NextResponse.json(
      {
        message: "Support ticket created successfully",
        ticket,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Create support ticket error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
