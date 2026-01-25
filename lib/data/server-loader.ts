import { getSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

/**
 * Server-side data loader for public pages
 * Fetches from Firestore with fallback to static JSON
 */
export async function loadSiteDataServer() {
  try {
    // Try to fetch from Firestore
    const firestoreData = await getSiteContent()
    if (firestoreData) {
      return firestoreData
    }
  } catch (error) {
    // Silently fall back to static JSON if Firestore is not available
    console.warn("Firestore not available, using static data")
  }

  // Fallback to static JSON
  return data
}
