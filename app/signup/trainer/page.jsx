"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Camera, ChevronDown } from "lucide-react"
import Image from "next/image"

export default function TrainerSignUp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
    terms: false,
    // Step 2: Personal Info
    profileImage: null,
    profileImagePreview: null,
    companyId: "",
    companyName: "",
    certificate: null,
    certificateName: "",
    serviceType: "",
    phoneNumber: "",
    // Step 3: Time Slots
    availableTimeSlots: [],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [companies, setCompanies] = useState([])
  const [services, setServices] = useState([])
  const [loadingCompanies, setLoadingCompanies] = useState(false)
  const [loadingServices, setLoadingServices] = useState(false)
  const [useManualServiceType, setUseManualServiceType] = useState(false)
  const router = useRouter()

  const totalSteps = 3

  // Generate time slots (3:00 - 4:00 AM repeated for demo)
  const timeSlots = Array(18).fill("3:00 - 4:00AM")

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies()
  }, [])

  // Fetch services when company is selected
  useEffect(() => {
    if (formData.companyId) {
      fetchServices(formData.companyId)
    } else {
      setServices([])
      setUseManualServiceType(false)
    }
  }, [formData.companyId])

  const fetchCompanies = async () => {
    setLoadingCompanies(true)
    try {
      const response = await fetch("/api/companies")
      const data = await response.json()
      if (response.ok) {
        setCompanies(data.companies || [])
      }
    } catch (err) {
      console.error("[v0] Error fetching companies:", err)
    } finally {
      setLoadingCompanies(false)
    }
  }

  const fetchServices = async (companyId) => {
    setLoadingServices(true)
    setError("")
    try {
      const response = await fetch(`/api/companies/${companyId}/services`)
      const data = await response.json()
      if (response.ok) {
        setServices(data.services || [])
        if (!data.services || data.services.length === 0) {
          setUseManualServiceType(true)
        }
      } else {
        console.error("[v0] Error fetching services:", data.error)
        setUseManualServiceType(true)
      }
    } catch (err) {
      console.error("[v0] Error fetching services:", err)
      setUseManualServiceType(true)
    } finally {
      setLoadingServices(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const submitData = new FormData()
      submitData.append("fullName", formData.fullName)
      submitData.append("email", formData.email)
      submitData.append("password", formData.password)
      submitData.append("role", "trainer")
      submitData.append("companyId", formData.companyId)
      submitData.append("serviceType", formData.serviceType)
      submitData.append("phoneNumber", formData.phoneNumber)
      submitData.append("availableTimeSlots", JSON.stringify(formData.availableTimeSlots))

      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage)
      }
      if (formData.certificate) {
        submitData.append("certificate", formData.certificate)
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account")
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      router.push("/trainer/dashboard")
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
      if (field === "profileImage") {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: URL.createObjectURL(file),
        }))
      } else if (field === "certificate") {
        setFormData((prev) => ({
          ...prev,
          certificate: file,
          certificateName: file.name,
        }))
      }
    }
  }

  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value
    const selectedCompany = companies.find((c) => c._id === selectedCompanyId)
    setFormData((prev) => ({
      ...prev,
      companyId: selectedCompanyId,
      companyName: selectedCompany?.companyName || "",
      serviceType: "", // Reset service type when company changes
    }))
  }

  const toggleTimeSlot = (slot) => {
    setFormData((prev) => ({
      ...prev,
      availableTimeSlots: prev.availableTimeSlots.includes(slot)
        ? prev.availableTimeSlots.filter((s) => s !== slot)
        : [...prev.availableTimeSlots, slot],
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
        if (!formData.companyId) {
          setError("Please select a company")
          return false
        }
        if (!formData.serviceType || formData.serviceType.trim() === "") {
          setError("Please select or enter a service type")
          return false
        }
        if (!formData.phoneNumber) {
          setError("Please enter your phone number")
          return false
        }
        return true
      case 3:
        if (formData.availableTimeSlots.length === 0) {
          setError("Please select at least one time slot")
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
          placeholder="John Williams"
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
          placeholder="johnwilliams@example.com"
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
            placeholder="••••••••"
            className="h-12 border-gray-300 rounded-lg pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
            placeholder="••••••••"
            className="h-12 border-gray-300 rounded-lg pr-10"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
            className="absolute bottom-0 right-0 w-10 h-10 bg-[#2b3445] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#374151] transition-colors"
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
        <Label htmlFor="companyId" className="text-sm text-gray-700">
          Company Name
        </Label>
        <div className="relative">
          <select
            id="companyId"
            className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-10 appearance-none bg-white text-gray-700"
            value={formData.companyId}
            onChange={handleCompanyChange}
            required
          >
            <option value="">Select Company</option>
            {loadingCompanies ? (
              <option disabled>Loading companies...</option>
            ) : (
              companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate" className="text-sm text-gray-700">
          Upload Certificate
        </Label>
        <label
          htmlFor="certificate"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Camera className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500 text-sm">{formData.certificateName || "Upload Certificate"}</span>
          <input
            type="file"
            id="certificate"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFileChange(e, "certificate")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceType" className="text-sm text-gray-700">
          Service Type
        </Label>
        {!useManualServiceType && services.length > 0 ? (
          <div className="space-y-2">
            <div className="relative">
              <select
                id="serviceType"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-10 appearance-none bg-white text-gray-700"
                value={formData.serviceType}
                onChange={handleChange}
                required
                disabled={!formData.companyId || loadingServices}
              >
                <option value="">Service Type i.e ; information technology</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <button
              type="button"
              onClick={() => setUseManualServiceType(true)}
              className="text-sm text-[#4e97fd] hover:underline"
            >
              Or enter manually
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              id="serviceType"
              type="text"
              placeholder="Service Type i.e ; information technology"
              className="h-12 border-gray-300 rounded-lg"
              value={formData.serviceType}
              onChange={handleChange}
              required
              disabled={!formData.companyId}
            />
            {services.length > 0 && (
              <button
                type="button"
                onClick={() => setUseManualServiceType(false)}
                className="text-sm text-[#4e97fd] hover:underline"
              >
                Or select from list
              </button>
            )}
          </div>
        )}
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
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            type="button"
            onClick={() => toggleTimeSlot(slot)}
            className={`h-12 rounded-lg border transition-all flex items-center justify-center text-sm font-medium ${
              formData.availableTimeSlots.includes(slot)
                ? "bg-[#2b3445] text-white border-[#2b3445]"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {slot}
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
                <span className="text-[#4e97fd]">Personal</span> Info
              </h2>
            )}
            {currentStep === 3 && (
              <h2 className="text-3xl font-semibold">
                <span className="text-[#4e97fd]">Video Call</span> Time Slots
              </h2>
            )}
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
                  {currentStep === 1 ? "Next" : currentStep === 2 ? "Continue" : "Next"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white rounded-[30px]"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
              )}
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin/trainer" className="text-[#4e97fd] hover:underline font-medium">
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
