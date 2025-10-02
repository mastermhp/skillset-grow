// Messages API routes
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Message from "@/models/Message"

// GET messages between two users
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const otherUserId = searchParams.get("otherUserId")

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .populate("sender", "fullName profileImage")
      .populate("receiver", "fullName profileImage")
      .sort({ createdAt: 1 })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("[v0] Get messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST send message
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()
    const { senderId, receiverId, content } = body

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    })

    await message.populate("sender", "fullName profileImage")
    await message.populate("receiver", "fullName profileImage")

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: message,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Send message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
