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
import { Upload, Video } from "lucide-react"

export default function UploadTraining() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    trainerId: "", // Changed from null to empty string for better form handling
  })
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const [trainers, setTrainers] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      const response = await apiClient.getTrainers()
      setTrainers(response.trainers || [])
    } catch (error) {
      console.error("[v0] Failed to fetch trainers:", error)
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

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        setError("Video file size must be less than 500MB")
        return
      }
      setVideoFile(file)
      setError("")
    }
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Thumbnail file size must be less than 10MB")
        return
      }
      setThumbnailFile(file)
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    setError("")
    setUploadProgress(0)

    try {
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (!userStr) {
        throw new Error("Please sign in to upload training content")
      }
      const user = JSON.parse(userStr)

      console.log("[v0] User data from localStorage:", user) // Added debug log

      if (!user._id) {
        throw new Error("Invalid user session. Please sign in again.")
      }

      // Upload video file
      setUploadProgress(20)
      const videoUpload = await apiClient.uploadFile(videoFile, "skillset-grow/training-videos")

      // Upload thumbnail
      setUploadProgress(50)
      const thumbnailUpload = await apiClient.uploadFile(thumbnailFile, "skillset-grow/thumbnails")

      // Create training module
      setUploadProgress(80)
      const moduleData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        duration: Number.parseInt(formData.duration),
        price: Number.parseFloat(formData.price) || 0,
        videoUrl: videoUpload.url,
        thumbnail: {
          url: thumbnailUpload.url,
          publicId: thumbnailUpload.publicId,
        },
        trainerId: formData.trainerId && formData.trainerId !== "none" ? formData.trainerId : null, // Handle "none" value
        companyId: user._id,
      }

      console.log("[v0] Submitting module data:", moduleData) // Added debug log

      await apiClient.createTrainingModule(moduleData)

      setUploadProgress(100)
      router.push("/training-company/training-videos")
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError(err.message || "Failed to upload training content")
    } finally {
      setUploading(false)
    }
  }

  return (
    <AuthGuard requiredRole="company">
      <div className="flex min-h-screen bg-gray-50">
        <TrainingCompanySidebar currentPath="/training-company/training-videos" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Training Content</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
                  )}

                  {uploading && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600">Uploading...</span>
                        <span className="text-sm text-blue-600">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Training Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter training title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      disabled={uploading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter training description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      disabled={uploading}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        placeholder="e.g., Safety, Operations"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        disabled={uploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="e.g., 30"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        disabled={uploading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00 (Leave empty for free)"
                        value={formData.price}
                        onChange={handleChange}
                        disabled={uploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="trainerId">Assign Trainer (Optional)</Label>
                      <Select
                        value={formData.trainerId}
                        onValueChange={(value) => handleSelectChange("trainerId", value)}
                        disabled={uploading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a trainer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No trainer assigned</SelectItem> {/* Updated value prop */}
                          {trainers.map((trainer) => (
                            <SelectItem key={trainer._id} value={trainer._id}>
                              {trainer.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video">Video File * (Max 500MB)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        required
                        disabled={uploading}
                        className="hidden"
                      />
                      <label htmlFor="video" className="cursor-pointer">
                        <Video className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">{videoFile ? videoFile.name : "Click to upload video"}</p>
                        <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, MOV, AVI (max 500MB)</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail Image * (Max 10MB)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        required
                        disabled={uploading}
                        className="hidden"
                      />
                      <label htmlFor="thumbnail" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {thumbnailFile ? thumbnailFile.name : "Click to upload thumbnail"}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={uploading || !videoFile || !thumbnailFile} className="flex-1">
                      {uploading ? "Uploading..." : "Upload Training Content"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={uploading}
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
