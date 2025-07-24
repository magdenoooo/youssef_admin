import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updateData = await request.json()

    console.log(`✅ Server received update for project ${id}:`, updateData)

    return NextResponse.json({
      success: true,
      project: { ...updateData, id },
      message: "Project update received",
    })
  } catch (error) {
    console.error("❌ PUT /api/admin/projects error:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    console.log(`✅ Server received delete request for project ${id}`)

    return NextResponse.json({
      success: true,
      message: "Project delete received",
    })
  } catch (error) {
    console.error("❌ DELETE /api/admin/projects error:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
