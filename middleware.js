import { NextResponse } from "next/server"
import { verifyToken } from "./lib/jwt"

export async function middleware(request) {
  const token = request.cookies.get("auth-token")?.value
  const pathname = request.nextUrl.pathname

  console.log("[v0] Middleware - pathname:", pathname)
  console.log("[v0] Middleware - token exists:", !!token)

  // Define protected routes and their required roles
  const protectedRoutes = {
    "/trainee": "trainee",
    "/trainer": "trainer",
    "/training-company": "company",
  }

  // Check if the current path matches any protected route
  for (const [route, requiredRole] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      console.log("[v0] Middleware - matched protected route:", route, "required role:", requiredRole)

      // No token - redirect to signin
      if (!token) {
        console.log("[v0] Middleware - no token, redirecting to signin")
        const signinUrl = new URL(
          `/signin/${requiredRole === "company" ? "training-company" : requiredRole}`,
          request.url,
        )
        return NextResponse.redirect(signinUrl)
      }

      // Verify token and check role
      const decoded = await verifyToken(token)
      console.log("[v0] Middleware - decoded token:", decoded)

      if (!decoded) {
        console.log("[v0] Middleware - token verification failed, redirecting to signin")
        const signinUrl = new URL(
          `/signin/${requiredRole === "company" ? "training-company" : requiredRole}`,
          request.url,
        )
        return NextResponse.redirect(signinUrl)
      }

      if (decoded.role !== requiredRole) {
        console.log("[v0] Middleware - role mismatch. decoded role:", decoded.role, "required:", requiredRole)
        const signinUrl = new URL(
          `/signin/${requiredRole === "company" ? "training-company" : requiredRole}`,
          request.url,
        )
        return NextResponse.redirect(signinUrl)
      }

      // Valid token and correct role - allow access
      console.log("[v0] Middleware - authentication successful, allowing access")
      return NextResponse.next()
    }
  }

  console.log("[v0] Middleware - not a protected route, allowing access")
  return NextResponse.next()
}

export const config = {
  matcher: ["/trainee/:path*", "/trainer/:path*", "/training-company/:path*"],
}
