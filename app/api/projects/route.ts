import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return empty array - client will load from localStorage
    // This ensures the public site shows the same projects as admin
    return NextResponse.json({
      projects: [],
      message: "Projects loaded from client storage",
    })
  } catch (error) {
    console.error("❌ Public projects API error:", error)
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 })
  }
}
