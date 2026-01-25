import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Check for auth token in cookies or headers
    // Since we're using Firebase Auth client-side, we'll handle auth in the component
    // This middleware can be extended to check for server-side tokens if needed
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
