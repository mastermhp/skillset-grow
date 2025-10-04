"use client"

import AuthGuard from "@/components/auth-guard"
import TraineeHeader from "@/components/trainee-header"
import TrainingCompanySidebar from "@/components/training-company-sidebar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Plus, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TrainingVideos() {
  const [trainingModules, setTrainingModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [companyId, setCompanyId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchTrainingVideos()
  }, [])

  const fetchTrainingVideos = async () => {
    try {
      setLoading(true)
      // Get company ID from localStorage
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        console.log("[v0] User data from localStorage:", user) // Added debug log

        if (!user._id) {
          console.error("[v0] No user ID found in localStorage")
          return
        }

        setCompanyId(user._id)

        // Fetch training modules for this company
        const response = await apiClient.getTrainingModules({ companyId: user._id })
        console.log("[v0] Fetched training modules:", response) // Added debug log
        setTrainingModules(response.modules || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch training videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddVideo = () => {
    router.push("/training-company/upload-training")
  }

  return (
    <AuthGuard requiredRole="company">
      <div className="flex min-h-screen bg-gray-50">
        <TrainingCompanySidebar currentPath="/training-company/training-videos" />

        <div className="flex-1 flex flex-col">
          <TraineeHeader className="h-16" />

          <main className="ml-64 flex-1 p-6 overflow-hidden">
            <div className="px-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h2 className="text-[30px] font-medium mr-4">Training Videos</h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <Button onClick={handleAddVideo} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Training Video
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading training videos...</p>
              </div>
            ) : trainingModules.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No training videos uploaded yet</p>
                <Button onClick={handleAddVideo}>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Your First Training Video
                </Button>
              </div>
            ) : (
              <div className="px-6 mb-8">
                <div className="grid grid-cols-3 gap-8 mb-8">
                  {trainingModules.map((course) => (
                    <div
                      key={course._id}
                      className="h-[460px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
                    >
                      <div className="relative w-full h-56">
                        <img
                          src={course.thumbnail?.url || "/dash2.jpg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/40 bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                          {course.duration} min
                        </div>
                        <div className="absolute -bottom-7 right-6 w-[70px] h-[70px] border-2 p-1 border-white rounded-full flex items-center justify-center">
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            <img
                              src={course.company?.companyLogo?.url || "/runningTask1.png"}
                              alt={course.company?.companyName || "Company"}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="absolute -bottom-7 right-6 rounded-full flex items-center justify-center">
                          <img
                            src="/verificationBadge.png"
                            alt="verificationBadge"
                            className="w-[18px] h-[18px] rounded-full"
                          />
                        </div>
                      </div>
                      <div className="p-8 bg-[#2B3445] w-full h-full">
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-[16px] leading-[14px] text-[#B7B9D2]">
                            {course.trainer?.fullName || "Company Training"}
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-start justify-between mb-8">
                          <h3 className="text-[24px] w-[70%] leading-[24px] font-medium text-[#FFFFFF] line-clamp-2">
                            {course.title}
                          </h3>
                        </div>
                        <div className="flex items-start justify-between mb-4">
                          <p className="text-[15px] text-[#808191]">
                            {course.views || 0} views • {new Date(course.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-white border-white hover:bg-white hover:text-[#2B3445] bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
