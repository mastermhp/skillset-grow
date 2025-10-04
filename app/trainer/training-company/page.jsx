"use client"

import TraineeHeader from "@/components/trainee-header"
import { Users, Video } from "lucide-react"
import TrainerSidebar from "@/components/trainer-sidebar"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import AuthGuard from "@/components/auth-guard"

export default function TrainerTrainingCompany() {
  const [company, setCompany] = useState(null)
  const [companyVideos, setCompanyVideos] = useState([])
  const [companyTrainers, setCompanyTrainers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanyData()
  }, [])

  const fetchCompanyData = async () => {
    try {
      setLoading(true)
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)

        console.log("[v0] User data:", user)

        if (!user.companyId) {
          console.log("[v0] No companyId found for trainer")
          setLoading(false)
          return
        }

        try {
          const companyResponse = await apiClient.getCompany(user.companyId)
          if (companyResponse.success) {
            setCompany(companyResponse.company)
          }
        } catch (error) {
          console.error("[v0] Company not found:", error)
          // Company doesn't exist, but don't crash the page
        }

        try {
          const videosResponse = await apiClient.getTrainingModules({ companyId: user.companyId })
          if (videosResponse.success) {
            setCompanyVideos(videosResponse.modules || [])
          }
        } catch (error) {
          console.error("[v0] Failed to fetch videos:", error)
        }

        try {
          const trainersResponse = await apiClient.getTrainers({ companyId: user.companyId, limit: 10 })
          if (trainersResponse.success) {
            setCompanyTrainers(trainersResponse.trainers || [])
          }
        } catch (error) {
          console.error("[v0] Failed to fetch trainers:", error)
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch company data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="trainer">
        <div className="flex min-h-screen bg-gray-50">
          <TrainerSidebar currentPath="/trainer/training-company" />
          <div className="flex-1">
            <TraineeHeader />
            <main className="ml-64 p-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Loading company information...</p>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!company) {
    return (
      <AuthGuard requiredRole="trainer">
        <div className="flex min-h-screen bg-gray-50">
          <TrainerSidebar currentPath="/trainer/training-company" />
          <div className="flex-1">
            <TraineeHeader />
            <main className="ml-64 p-6">
              <div className="text-center py-12">
                <p className="text-gray-500">You are not associated with any training company yet</p>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="trainer">
      <div className="flex min-h-screen bg-gray-50">
        <TrainerSidebar currentPath="/trainer/training-company" />

        <div className="flex-1 flex flex-col">
          <TraineeHeader className="h-16" />

          <main className="ml-64 flex-1 p-6 overflow-hidden">
            <section className="relative overflow-hidden w-full h-[620px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#230B34CC] to-[#230B344D] mb-18">
                <img src="/profilebg.jpg" alt="profilebg" className="w-full h-full object-cover" />
                <div className="absolute  inset-0 bg-gradient-to-r from-[#230B34CC] to-[#230B344D] w-full h-full overflow-hidden"></div>
              </div>
            </section>

            <div className="relative z-10 -mt-44 w-full rounded-3xl p-6 h-[200px] mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-[150px] h-[150px] p-2 rounded-full overflow-hidden border-2 border-gray-400">
                    <img
                      src={company.profileImage?.url || "/thomas-hope-profile.png"}
                      alt={company.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mt-24">
                      <h5 className="font-bold text-[28px] text-black">{company.fullName}</h5>
                      {company.isVerified && (
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
                        {company.email?.split("@")[0]}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-black text-[18px]" />
                        <span className="text-black text-[18px] font-medium">
                          {company.totalTrainees || 0} Trainees
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4 text-black text-[18px]" />
                        <span className="text-black text-[18px] font-medium">{companyVideos.length} Videos</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right mr-4 mt-24">
                  <button className="bg-[#4E97FD] w-[150px] h-[50px] hover:bg-gray-800 text-white px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors">
                    Favorite
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 mb-8 mt-20">
              <div className="flex items-center mb-4">
                <h2 className="text-[30px] font-medium mr-4">Trainers</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              {companyTrainers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No other trainers in this company</p>
                </div>
              ) : (
                companyTrainers.map((trainer) => (
                  <div key={trainer._id} className="rounded-3xl border-2 border-gray-300 p-6 shadow-sm h-[200px] mb-8">
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
                              <span className="text-black text-[18px] font-medium">
                                {trainer.totalVideos || 0} Videos
                              </span>
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
                ))
              )}
            </div>

            <div className="px-6 mb-8 mt-20">
              <div className="flex items-center mb-4">
                <h2 className="text-[30px] font-medium mr-4">Videos</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            <div className="px-6 mb-8 mt-10">
              {companyVideos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No videos available from this company</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {companyVideos.map((course) => (
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
                              src={company.profileImage?.url || "/runningTask1.png"}
                              alt={company.fullName}
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
                          <span className="text-[16px] leading-[14px] text-[#B7B9D2]">{company.fullName}</span>
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
