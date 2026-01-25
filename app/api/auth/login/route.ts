import { NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/firebase/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await login(email, password)
    const token = await user.getIdToken()

    const response = NextResponse.json({ success: true, uid: user.uid })
    
    // Set HTTP-only cookie for session management (optional, if using cookies)
    // response.cookies.set("auth-token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 24 * 7, // 7 days
    // })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Authentication failed" },
      { status: 401 }
    )
  }
}
