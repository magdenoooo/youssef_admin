import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// In production, store these securely (environment variables, database, etc.)
const ADMIN_CREDENTIALS = {
  username: "youssef_admin", // Change this
  password: "YourSecurePassword123!", // Change this to a strong password
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Simple authentication check
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate a simple token (in production, use JWT or similar)
      const token = crypto.randomBytes(32).toString("hex")

      return NextResponse.json({
        success: true,
        token,
        message: "Authentication successful",
      })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
