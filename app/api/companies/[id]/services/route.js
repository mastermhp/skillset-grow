import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    // Find the company by ID
    const company = await User.findById(id).select("services companyName")

    if (!company) {
      return NextResponse.json({ success: false, error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      services: company.services || [],
      companyName: company.companyName,
    })
  } catch (error) {
    console.error("[v0] Get company services error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
