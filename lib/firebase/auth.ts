import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "./config"

export interface AuthError {
  code: string
  message: string
}

/**
 * Sign in with email and password
 */
export async function login(email: string, password: string): Promise<User> {
  if (!auth) {
    throw {
      code: "auth/not-configured",
      message: "Firebase is not configured. Please set up your Firebase project and add configuration to .env.local",
    } as AuthError
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    } as AuthError
  }
}

/**
 * Create a new user account
 */
export async function signUp(email: string, password: string): Promise<User> {
  if (!auth) {
    throw {
      code: "auth/not-configured",
      message: "Firebase is not configured. Please set up your Firebase project and add configuration to .env.local",
    } as AuthError
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    } as AuthError
  }
}

/**
 * Sign out the current user
 */
export async function logout(): Promise<void> {
  if (!auth) {
    return // Nothing to do if auth is not configured
  }
  try {
    await signOut(auth)
  } catch (error: any) {
    throw {
      code: error.code,
      message: error.message,
    } as AuthError
  }
}

/**
 * Get the current user
 */
export function getCurrentUser(): User | null {
  if (!auth) return null
  return auth.currentUser
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (!auth) {
    // Return a no-op unsubscribe function if auth is not configured
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

/**
 * Get the current user's ID token
 */
export async function getIdToken(): Promise<string | null> {
  const user = getCurrentUser()
  if (!user) return null
  return await user.getIdToken()
}
