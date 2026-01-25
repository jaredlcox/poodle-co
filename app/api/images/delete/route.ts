import { NextRequest, NextResponse } from "next/server"
import { deleteImage } from "@/lib/firebase/storage"

export async function DELETE(request: NextRequest) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firebase Storage security rules will enforce access control

    const { path } = await request.json()

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 })
    }

    await deleteImage(path)

    return NextResponse.json({ success: true, message: "Image deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting image:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete image" },
      { status: 500 }
    )
  }
}
