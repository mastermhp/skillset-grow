"use client"

import AuthGuard from "@/components/auth-guard"
import TraineeHeader from "@/components/trainee-header"
import TrainingCompanySidebar from "@/components/training-company-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export default function CreateShift() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    maxTrainees: "1",
    payRate: "",
    requiredTraining: "",
  })
  const [trainingModules, setTrainingModules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchTrainingModules()
  }, [])

  const fetchTrainingModules = async () => {
    try {
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        const response = await apiClient.getTrainingModules({ companyId: user._id })
        setTrainingModules(response.modules || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch training modules:", error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (!userStr) {
        throw new Error("Please sign in to create shifts")
      }
      const user = JSON.parse(userStr)

      const shiftData = {
        ...formData,
        company: user._id,
        maxTrainees: Number.parseInt(formData.maxTrainees),
        payRate: Number.parseFloat(formData.payRate) || 0,
        requiredTraining: formData.requiredTraining || null,
      }

      await apiClient.createShift(shiftData)
      router.push("/training-company/shifts")
    } catch (err) {
      console.error("[v0] Create shift error:", err)
      setError(err.message || "Failed to create shift")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard requiredRole="company">
      <div className="flex min-h-screen bg-gray-50">
        <TrainingCompanySidebar currentPath="/training-company/shifts" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Post New Shift</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Shift Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Warehouse Assistant"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the shift responsibilities"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={loading}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., 123 Main St, City, State"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxTrainees">Number of Workers Needed *</Label>
                      <Input
                        id="maxTrainees"
                        type="number"
                        min="1"
                        placeholder="1"
                        value={formData.maxTrainees}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payRate">Pay Rate (per hour)</Label>
                      <Input
                        id="payRate"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.payRate}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requiredTraining">Required Training (Optional)</Label>
                    <Select
                      value={formData.requiredTraining}
                      onValueChange={(value) => handleSelectChange("requiredTraining", value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select required training" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No training required</SelectItem>
                        {trainingModules.map((module) => (
                          <SelectItem key={module._id} value={module._id}>
                            {module.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Only trainees who completed this training can request this shift
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Creating..." : "Post Shift"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
