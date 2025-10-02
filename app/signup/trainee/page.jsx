"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"

export default function TraineeSignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // Validate terms acceptance
    if (!formData.terms) {
      setError("Please accept the Terms and Conditions")
      setLoading(false)
      return
    }

    try {
      const response = await apiClient.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "trainee",
      })

      apiClient.setToken(response.token)

      // Store user data
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.user))
      }

      router.push("/trainee/dashboard")
    } catch (err) {
      setError(err.message || "Failed to create account")
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
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-[#4e97fd]">Sign up</h2>
            <p className="text-sm text-gray-500">Create your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="h-12 border-gray-200 rounded-lg"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Create a password"
                className="h-12 border-gray-200 rounded-lg"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="h-12 border-gray-200 rounded-lg"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-gray-300"
                checked={formData.terms}
                onChange={handleChange}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="text-[#4e97fd] hover:underline">
                  Terms & Conditions
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white rounded-[30px]"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign up"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin/trainee" className="text-[#4e97fd] hover:underline font-medium">
                Sign in
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
