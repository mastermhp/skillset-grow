"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const token = apiClient.getToken()
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("[v0] Failed to parse user data:", error)
        apiClient.clearToken()
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    apiClient.setToken(token)
    setUser(userData)
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
