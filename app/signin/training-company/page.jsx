"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export default function TrainingCompanySignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.signin({
        email: formData.email,
        password: formData.password,
        role: "company",
      })

      apiClient.setToken(response.token)

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      router.push("/training-company/dashboard")
    } catch (err) {
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-[#4e97fd]">Sign in</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 border-gray-200 rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 border-gray-200 rounded-lg"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="rounded border-gray-300"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-[#4e97fd] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white rounded-[30px]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup/training-company" className="text-[#4e97fd] hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="flex-1 bg-[#2b3445] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="text-center z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Let's start as
            <br />
            Trainee amazing
            <br />
            journey with us
          </h1>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <img src="/Frame.png" alt="" className="absolute right-0 bottom-0" />
        </div>
      </div>
    </div>
  )
}
