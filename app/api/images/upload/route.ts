import { NextRequest, NextResponse } from "next/server"
import { uploadImage, generateImagePath } from "@/lib/firebase/storage"

export async function POST(request: NextRequest) {
  try {
    // Note: Authentication is handled client-side with Firebase Auth
    // Firebase Storage security rules will enforce access control

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "images"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image size must be less than 10MB" },
        { status: 400 }
      )
    }

    const path = generateImagePath(folder, file.name)
    const url = await uploadImage(file, path)

    return NextResponse.json({ url, path })
  } catch (error: any) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    )
  }
}
