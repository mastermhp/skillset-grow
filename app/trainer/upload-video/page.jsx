"use client"

import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { Upload, Video } from "lucide-react"

export default function UploadVideo() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    price: "",
  })
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        setError(
          "Video file size must be less than 500MB. For larger videos, please compress them using video editing software or online compression tools.",
        )
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
      // Get user from localStorage
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (!userStr) {
        throw new Error("Please sign in to upload videos")
      }
      const user = JSON.parse(userStr)

      // Upload video file
      setUploadProgress(20)
      const videoUpload = await apiClient.uploadFile(videoFile, "skillset-grow/videos")

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
        trainerId: user._id,
        companyId: user._id, // Using trainer's ID as company for self-employed trainers
      }

      await apiClient.createTrainingModule(moduleData)

      setUploadProgress(100)
      router.push("/trainer/dashboard")
    } catch (err) {
      const errorMessage = err.message || "Failed to upload video"
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/upload-video" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload New Video</h1>

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
                  <Label htmlFor="title">Video Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter video title"
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
                    placeholder="Enter video description"
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
                      placeholder="e.g., Coding, Marketing"
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
                      placeholder="e.g., 15"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      disabled={uploading}
                    />
                  </div>
                </div>

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
                      <p className="text-xs text-gray-400 mt-1">
                        Note: Large videos may take several minutes to upload
                      </p>
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
                    {uploading ? "Uploading..." : "Upload Video"}
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
  )
}
