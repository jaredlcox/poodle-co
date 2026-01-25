import { ref, uploadBytes, getDownloadURL, deleteObject, UploadResult } from "firebase/storage"
import { storage } from "./config"

/**
 * Upload an image to Firebase Storage
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not configured. Please set up your Firebase project and add configuration to .env.local")
  }
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image")
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      throw new Error("Image size must be less than 10MB")
    }

    const storageRef = ref(storage, path)
    const snapshot: UploadResult = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

/**
 * Delete an image from Firebase Storage
 */
export async function deleteImage(path: string): Promise<void> {
  if (!storage) {
    throw new Error("Firebase Storage is not configured. Please set up your Firebase project and add configuration to .env.local")
  }
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}

/**
 * Get download URL for an image
 */
export async function getImageURL(path: string): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not configured. Please set up your Firebase project and add configuration to .env.local")
  }
  try {
    const storageRef = ref(storage, path)
    return await getDownloadURL(storageRef)
  } catch (error) {
    console.error("Error getting image URL:", error)
    throw error
  }
}

/**
 * Generate a unique path for an image upload
 */
export function generateImagePath(folder: string, filename: string): string {
  const timestamp = Date.now()
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_")
  return `${folder}/${timestamp}_${sanitizedFilename}`
}
