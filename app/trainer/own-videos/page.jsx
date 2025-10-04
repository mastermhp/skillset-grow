"use client"

import TraineeHeader from "@/components/trainee-header"
import TrainerSidebar from "@/components/trainer-sidebar"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import AuthGuard from "@/components/auth-guard"

export default function TrainerOwnVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchOwnVideos()
  }, [])

  const fetchOwnVideos = async () => {
    try {
      setLoading(true)
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        setProfile(user)

        const response = await apiClient.getTrainingModules({ trainerId: user._id })
        if (response.success) {
          setVideos(response.modules || [])
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch own videos:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard requiredRole="trainer">
      <div className="flex min-h-screen bg-gray-50">
        <TrainerSidebar currentPath="/trainer/own-videos" />

        <div className="flex-1 flex flex-col">
          <TraineeHeader className="h-16" />

          <main className="ml-64 flex-1 p-6 overflow-hidden">
            <div className="px-6 mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-[30px] font-medium mr-4">Uploaded Videos</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            <div className="px-6 mb-8">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading videos...</p>
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No videos uploaded yet</p>
                  <button
                    onClick={() => (window.location.href = "/trainer/upload-video")}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Upload Your First Video
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {videos.map((course) => (
                    <div
                      key={course._id}
                      className="h-[420px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
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
                              src={profile?.profileImage?.url || "/runningTask1.png"}
                              alt={profile?.fullName}
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
                          <span className="text-[16px] leading-[14px] text-[#B7B9D2]">{profile?.fullName}</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-start justify-between mb-8">
                          <h3 className="text-[24px] w-[70%] leading-[24px] font-medium text-[#FFFFFF] line-clamp-2">
                            {course.title}
                          </h3>
                        </div>
                        <div className="flex items-start justify-between mb-8">
                          <p className="text-[15px] text-[#808191]">
                            {course.views} views • {new Date(course.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
