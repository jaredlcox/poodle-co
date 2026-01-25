import { NextRequest, NextResponse } from "next/server"
import { getSiteContent, updateAllSiteContent } from "@/lib/firebase/firestore"

export async function GET(request: NextRequest) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firestore security rules will enforce access control

    const data = await getSiteContent()
    
    if (!data) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching all content:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch content" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firestore security rules will enforce access control

    const body = await request.json()

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    await updateAllSiteContent(body)

    return NextResponse.json({ success: true, message: "Content updated successfully" })
  } catch (error: any) {
    console.error("Error updating all content:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update content" },
      { status: 500 }
    )
  }
}
