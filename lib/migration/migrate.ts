import { updateAllSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

/**
 * Migrate data from data.json to Firestore
 * Run this once to initialize Firestore with existing data
 */
export async function migrateToFirestore() {
  try {
    console.log("Starting migration to Firestore...")
    
    // Validate data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid data structure")
    }

    // Update all site content in Firestore
    await updateAllSiteContent(data)
    
    console.log("Migration completed successfully!")
    return { success: true, message: "Data migrated successfully" }
  } catch (error: any) {
    console.error("Migration failed:", error)
    throw error
  }
}
