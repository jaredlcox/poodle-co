import { NextRequest, NextResponse } from "next/server"
import { logout } from "@/lib/firebase/auth"

export async function POST(request: NextRequest) {
  try {
    await logout()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Logout failed" },
      { status: 500 }
    )
  }
}
