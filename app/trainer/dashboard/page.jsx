"use client"

import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Users, Video, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export default function TrainerDashboard() {
  const [trainingModules, setTrainingModules] = useState([])
  const [trainers, setTrainers] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Get user profile from localStorage
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        setProfile(user)

        // Fetch trainer's own videos
        const modulesResponse = await apiClient.getTrainingModules({ trainerId: user._id })
        setTrainingModules(modulesResponse.modules || [])
      }

      // Fetch other trainers
      const trainersResponse = await apiClient.getTrainers({ limit: 4 })
      setTrainers(trainersResponse.trainers || [])
    } catch (error) {
      console.error("[v0] Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadVideo = () => {
    router.push("/trainer/upload-video")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/dashboard" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-6">
          {/* profile section  */}
          <section className="relative overflow-hidden w-full h-[620px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#230B34CC] to-[#230B344D] mb-18">
              <img src="/profilebg.jpg" alt="profilebg" className="w-full h-full object-cover" />
              <div className="absolute  inset-0 bg-gradient-to-r from-[#230B34CC] to-[#230B344D] w-full h-full overflow-hidden"></div>
            </div>
          </section>

          {/* profile description  */}
          <div className="relative z-10 -mt-44 w-full rounded-3xl p-6 h-[200px] mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-[150px] h-[150px] p-2 rounded-full overflow-hidden border-2 border-gray-400">
                  <img
                    src={profile?.profileImage?.url || "/thomas-hope-profile.png"}
                    alt={profile?.fullName || "Trainer"}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mt-24">
                    <h5 className="font-bold text-[28px] text-black">{profile?.fullName || "Trainer Name"}</h5>
                    {profile?.isVerified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-6">
                    <p className="text-black text-[18px]">
                      <span className="italic">@</span>
                      {profile?.email?.split("@")[0] || "trainer"}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-black text-[18px]" />
                      <span className="text-black text-[18px] font-medium">{profile?.totalTrainees || 0} Trainees</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4 text-black text-[18px]" />
                      <span className="text-black text-[18px] font-medium">{profile?.totalVideos || 0} Videos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right mr-4 mt-28">
                <button
                  onClick={handleUploadVideo}
                  className="border-[#000000] border-1 w-[250px] h-[50px] hover:bg-gray-800 hover:text-white text-black px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  UPLOAD NEW VIDEO
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="px-6 mb-6 mt-20">
            <div className="flex space-x-4 overflow-x-auto">
              {["Home", "About", "Trainers", "Videos"].map((category, index) => (
                <button
                  key={category}
                  className={`px-5 py-3 rounded-[12px] text-md font-semibold whitespace-nowrap ${
                    index === 0 ? "bg-gray-800 text-white" : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Course Grid - Now fetches real data from MongoDB */}
          <div className="px-6 mb-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading videos...</p>
              </div>
            ) : trainingModules.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No videos uploaded yet</p>
                <Button onClick={handleUploadVideo} className="mt-4">
                  Upload Your First Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-8 mb-8">
                {trainingModules.map((course, index) => (
                  <div
                    key={course._id || index}
                    className="h-[420px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  >
                    <div className="relative w-full h-56">
                      <img
                        src={course.thumbnail?.url || "/dash1.jpg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/40 bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                        {course.duration} min
                      </div>
                      <div className="absolute -bottom-7 right-6 w-[70px] h-[70px] border-2 p-1 border-white rounded-full flex items-center justify-center">
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <img
                            src={profile?.profileImage?.url || "/dashbrand.png"}
                            alt={profile?.fullName}
                            className="w-full h-full rounded-full"
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
                        {course.price > 0 && (
                          <span className="text-[15px] leading-[18px] font-bold text-[#FFFFFF] ml-2">
                            ${course.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trainers Section - Now fetches real trainers from MongoDB */}
          <div className="px-6 mb-8 mt-20">
            <div className="flex items-center mb-4">
              <h2 className="text-[30px] font-medium mr-4">Trainers</h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {trainers.map((trainer, index) => (
              <div
                key={trainer._id || index}
                className="rounded-3xl border-2 border-gray-300 p-6 shadow-sm h-[200px] mb-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-[150px] h-[150px] p-2 rounded-full overflow-hidden border-2 border-gray-400">
                      <img
                        src={trainer.profileImage?.url || "/thomas-hope-profile.png"}
                        alt={trainer.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-bold text-[28px] text-black">{trainer.fullName}</h5>
                        {trainer.isVerified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-6">
                        <p className="text-black text-[18px]">
                          <span className="italic">@</span>
                          {trainer.email?.split("@")[0]}
                        </p>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">
                            {trainer.totalTrainees || 0} Trainees
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">{trainer.totalVideos || 0} Videos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="bg-[#2B3445] h-[50px] hover:bg-gray-800 text-white px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors">
                      Book Call
                    </button>
                    <p className="text-2xl font-bold text-center text-black">${trainer.hourlyRate || 40}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
