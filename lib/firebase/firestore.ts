import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Firestore,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore"
import { db } from "./config"

const CONTENT_COLLECTION = "siteContent"

/**
 * Get all site content
 */
export async function getSiteContent(): Promise<DocumentData | null> {
  if (!db) {
    console.warn("Firestore is not configured. Returning null.")
    return null
  }
  try {
    const docRef = doc(db, CONTENT_COLLECTION, "main")
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  } catch (error) {
    console.error("Error getting site content:", error)
    throw error
  }
}

/**
 * Update site content section
 */
export async function updateSiteContent(
  section: string,
  data: DocumentData
): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not configured. Please set up your Firebase project and add configuration to .env.local")
  }
  try {
    const docRef = doc(db, CONTENT_COLLECTION, "main")
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, {
        [section]: data,
        updatedAt: new Date().toISOString(),
      })
    } else {
      // Create new document
      await setDoc(docRef, {
        [section]: data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Error updating site content:", error)
    throw error
  }
}

/**
 * Update entire site content
 */
export async function updateAllSiteContent(data: DocumentData): Promise<void> {
  if (!db) {
    throw new Error("Firestore is not configured. Please set up your Firebase project and add configuration to .env.local")
  }
  try {
    const docRef = doc(db, CONTENT_COLLECTION, "main")
    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )
  } catch (error) {
    console.error("Error updating all site content:", error)
    throw error
  }
}

/**
 * Get a specific section of site content
 */
export async function getSiteContentSection(section: string): Promise<DocumentData | null> {
  try {
    const content = await getSiteContent()
    if (content && content[section]) {
      return content[section]
    }
    return null
  } catch (error) {
    console.error("Error getting site content section:", error)
    throw error
  }
}

/**
 * Delete a section from site content
 */
export async function deleteSiteContentSection(section: string): Promise<void> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, "main")
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      delete data[section]
      await setDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Error deleting site content section:", error)
    throw error
  }
}
