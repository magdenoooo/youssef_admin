import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, name, email, service, budget, timeline, message } = body

    // Create email content
    const emailContent = `
New project inquiry received:

Name: ${name}
Email: ${email}
Service: ${service || "Not specified"}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

Message:
${message}

---
This message was sent from your video editor website contact form.
    `.trim()

    // Log the email details (in production, you would integrate with an email service)
    console.log("Email would be sent to:", to)
    console.log("Subject:", subject)
    console.log("Content:", emailContent)

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Email processed successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing email:", error)
    return NextResponse.json({ success: false, message: "Failed to process email" }, { status: 500 })
  }
}

// Add OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
