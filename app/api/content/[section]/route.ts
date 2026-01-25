import { NextRequest, NextResponse } from "next/server"
import { getSiteContentSection, updateSiteContent } from "@/lib/firebase/firestore"
import { getCurrentUser } from "@/lib/firebase/auth"

// Helper to verify authentication on server
async function verifyAuth(request: NextRequest) {
  // For server-side, we'll check the Authorization header
  // Client-side auth is handled by Firebase Auth
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    // In a production app, you'd verify the token here
    // For now, we'll allow the request and let Firestore security rules handle it
    return true
  }
  return true
}

export async function GET(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firestore security rules will enforce access control

    const section = params.section
    const data = await getSiteContentSection(section)
    
    if (!data) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error("Error fetching content:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch content" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firestore security rules will enforce access control

    const section = params.section
    const body = await request.json()

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    await updateSiteContent(section, body)

    return NextResponse.json({ success: true, message: "Content updated successfully" })
  } catch (error: any) {
    console.error("Error updating content:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update content" },
      { status: 500 }
    )
  }
}
