import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Return empty array - client will load from localStorage
    return NextResponse.json({
      projects: [],
      message: "Use client-side storage",
    })
  } catch (error) {
    console.error("GET /api/admin/projects error:", error)
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()
    console.log("✅ Server received project data:", projectData)

    // Return success - actual storage happens on client
    return NextResponse.json({
      success: true,
      project: projectData,
      message: "Project data received",
    })
  } catch (error) {
    console.error("❌ POST /api/admin/projects error:", error)
    return NextResponse.json({ error: "Failed to process project" }, { status: 500 })
  }
}
