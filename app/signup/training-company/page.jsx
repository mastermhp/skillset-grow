"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { Eye, EyeOff, Camera } from "lucide-react"
import Image from "next/image"

export default function TrainingCompanySignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
    terms: false,
    // Step 2: Company Details
    profileImage: null,
    profileImagePreview: null,
    companyName: "",
    trainingCertificate: null,
    trainingCertificatePreview: null,
    phoneNumber: "",
    // Step 3: Services
    services: [],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const totalSteps = 3

  const availableServices = [
    "Information Technology",
    "Agriculture",
    "Information Technology",
    "Agriculture",
    "Information Technology",
    "Agriculture",
    "Information Technology",
    "Agriculture",
    "Information Technology",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const submitData = new FormData()
      submitData.append("fullName", formData.fullName)
      submitData.append("email", formData.email)
      submitData.append("password", formData.password)
      submitData.append("role", "company")
      submitData.append("companyName", formData.companyName)
      submitData.append("phoneNumber", formData.phoneNumber)
      submitData.append("services", JSON.stringify(formData.services))

      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage)
      }
      if (formData.trainingCertificate) {
        submitData.append("trainingCertificate", formData.trainingCertificate)
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      apiClient.setToken(data.token)

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      router.push("/training-company/dashboard")
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

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: URL.createObjectURL(file),
      }))
    }
  }

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.password || !formData.repeatPassword) {
          setError("Please fill in all required fields")
          return false
        }
        if (formData.password !== formData.repeatPassword) {
          setError("Passwords do not match")
          return false
        }
        if (!formData.terms) {
          setError("Please accept the terms & conditions")
          return false
        }
        return true
      case 2:
        if (!formData.companyName || !formData.phoneNumber) {
          setError("Please fill in all required fields")
          return false
        }
        return true
      case 3:
        if (formData.services.length === 0) {
          setError("Please select at least one service")
          return false
        }
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError("")
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-gray-300 rounded-lg flex items-center justify-center gap-2 bg-transparent"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79297V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
            fill="#0077B5"
          />
        </svg>
        Sign up with linkedin
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm text-gray-700">
          Your name
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Your name"
          className="h-12 border-gray-300 rounded-lg"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm text-gray-700">
          Your email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          className="h-12 border-gray-300 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-12 border-gray-300 rounded-lg pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="repeatPassword" className="text-sm text-gray-700">
          Repeat password
        </Label>
        <div className="relative">
          <Input
            id="repeatPassword"
            type={showRepeatPassword ? "text" : "password"}
            placeholder="Repeat password"
            className="h-12 border-gray-300 rounded-lg pr-10"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showRepeatPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 rounded border-gray-300"
          checked={formData.terms}
          onChange={handleChange}
        />
        <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
          I accept the terms & conditions
        </Label>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {formData.profileImagePreview ? (
              <Image
                src={formData.profileImagePreview || "/placeholder.svg"}
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Profile Picture</span>
            )}
          </div>
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "profileImage")}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm text-gray-700">
          Company Name
        </Label>
        <Input
          id="companyName"
          type="text"
          placeholder="Company Name"
          className="h-12 border-gray-300 rounded-lg"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingCertificate" className="text-sm text-gray-700">
          Training Certificate
        </Label>
        <div className="relative">
          <Input
            id="trainingCertificateInput"
            type="text"
            placeholder={formData.trainingCertificate?.name || "Training Certificate"}
            className="h-12 border-gray-300 rounded-lg pr-24"
            value={formData.trainingCertificate?.name || ""}
            readOnly
          />
          <label
            htmlFor="trainingCertificate"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Browse
            <input
              type="file"
              id="trainingCertificate"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileChange(e, "trainingCertificate")}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-sm text-gray-700">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          className="h-12 border-gray-300 rounded-lg"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {availableServices.map((service, index) => (
          <button
            key={index}
            type="button"
            onClick={() => toggleService(service)}
            className={`h-24 rounded-lg border-2 transition-all flex items-center justify-center text-center px-2 text-sm font-medium ${
              formData.services.includes(service)
                ? "bg-[#2b3445] text-white border-[#2b3445]"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            {currentStep === 1 && (
              <h2 className="text-3xl font-semibold">
                <span className="text-[#4e97fd]">Sign</span> up
              </h2>
            )}
            {currentStep === 2 && (
              <h2 className="text-3xl font-semibold">
                <span className="text-[#4e97fd]">Company</span> registration
              </h2>
            )}
            {currentStep === 3 && <h2 className="text-3xl font-semibold">Company services</h2>}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex gap-4">
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white rounded-[30px]"
                >
                  {currentStep === 1 ? "Next" : "Continue"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white rounded-[30px]"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Continue"}
                </Button>
              )}
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin/training-company" className="text-[#4e97fd] hover:underline font-medium">
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
