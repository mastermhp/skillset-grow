"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export default function AuthGuard({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = apiClient.getToken()
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null

      if (!token || !userStr) {
        // No authentication - redirect to signin
        const signinPath = requiredRole === "company" ? "training-company" : requiredRole
        router.push(`/signin/${signinPath}`)
        return
      }

      try {
        const user = JSON.parse(userStr)

        // Check if user role matches required role
        if (user.role !== requiredRole) {
          // Wrong role - redirect to their correct dashboard or signin
          if (user.role === "trainee") {
            router.push("/trainee/dashboard")
          } else if (user.role === "trainer") {
            router.push("/trainer/dashboard")
          } else if (user.role === "company") {
            router.push("/training-company/dashboard")
          } else {
            const signinPath = requiredRole === "company" ? "training-company" : requiredRole
            router.push(`/signin/${signinPath}`)
          }
          return
        }

        // User is authorized
        setIsAuthorized(true)
      } catch (error) {
        console.error("[v0] Auth check failed:", error)
        apiClient.clearToken()
        localStorage.removeItem("user")
        const signinPath = requiredRole === "company" ? "training-company" : requiredRole
        router.push(`/signin/${signinPath}`)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [requiredRole, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
