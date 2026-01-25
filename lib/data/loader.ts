import { getSiteContent } from "@/lib/firebase/firestore"
import data from "@/data/data.json"

/**
 * Load site data from Firestore with fallback to static JSON
 */
export async function loadSiteData() {
  try {
    // Try to fetch from Firestore first
    const firestoreData = await getSiteContent()
    if (firestoreData) {
      return firestoreData
    }
  } catch (error) {
    console.warn("Failed to load from Firestore, using fallback:", error)
  }

  // Fallback to static JSON
  return data
}

/**
 * Load site data on the client side
 * This is used in client components
 */
export async function loadSiteDataClient() {
  try {
    const response = await fetch("/api/content/all")
    if (response.ok) {
      const result = await response.json()
      return result.data
    }
  } catch (error) {
    console.warn("Failed to load from API, using fallback:", error)
  }

  // Fallback to static JSON
  return data
}
