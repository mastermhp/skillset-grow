"use client"

import TraineeSidebar from "@/components/trainee-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Play, Users, Video } from "lucide-react"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import AuthGuard from "@/components/auth-guard"

export default function TraineeDashboard() {
  const [trainingModules, setTrainingModules] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrainingModules()
  }, [selectedCategory])

  const fetchTrainingModules = async () => {
    try {
      setLoading(true)
      const params = selectedCategory !== "All" ? { category: selectedCategory } : {}
      const response = await apiClient.getTrainingModules(params)
      setTrainingModules(response.modules || [])
    } catch (error) {
      console.error("[v0] Failed to fetch training modules:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "All",
    "Coding",
    "Marketing",
    "BBAS",
    "Technology",
    "Chess",
    "Physician",
    "Agricultur",
    "Artist",
    "Physician",
    "Gymnastic",
  ]

  return (
    <AuthGuard requiredRole="trainee">
      <div className="flex min-h-screen bg-gray-50">
        <TraineeSidebar currentPath="/trainee/dashboard" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            {/* Hero Section */}
            <div className="w-full h-[540px] bg-gradient-to-r from-[rgba(13,170,188,.8)] to-[rgba(13,170,188,1)] rounded-xl text-white mb-20">
              <div className="flex items-center justify-between  rounded-2xl w-full h-full">
                <div className="ml-20">
                  <h1 className="text-[50px] leading-[40px] font-bold mb-2">How to do</h1>
                  <h1 className="text-[50px] leading-[40px] font-bold mb-2">learn Jumping</h1>
                  <h1 className="text-[50px] leading-[40px] font-bold mb-2">and how to</h1>
                  <h1 className="text-[50px] leading-[40px] font-bold mb-20">land safely</h1>
                  <div className="flex space-x-4 w-full">
                    <Button className="bg-white text-teal-600 hover:bg-gray-100 w-[110px] h-[50px] text-[14px] leading-[40px]">
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-teal-600 bg-transparent w-[160px] h-[50px]  text-[14px] leading-[40px]"
                    >
                      Show Info
                    </Button>
                  </div>
                </div>
                <div className="w-[70%] h-full flex items-center justify-center">
                  <img
                    src="/traineeDashboardHero.png"
                    alt="Jumping tutorial"
                    className="w-full h-full object-cover rounded-r-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="px-6 mb-6">
              <div className="flex space-x-4 overflow-x-auto">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-[12px] text-sm whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Grid */}
            <div className="px-6 mb-8">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading training modules...</p>
                </div>
              ) : trainingModules.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No training modules found</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {trainingModules.slice(0, 8).map((course, index) => (
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
                              src={course.company?.companyLogo?.url || "/dashbrand.png"}
                              alt={course.company?.companyName}
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
                          <span className="text-[16px] leading-[14px] text-[#B7B9D2]">
                            {course.trainer?.fullName || course.company?.companyName}
                          </span>
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

            {/* Recommended Section */}
            <div className="px-6 mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-[30px] font-medium mr-4">Recommended</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div className="grid grid-cols-3 gap-10">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-lg p-14 text-white relative overflow-hidden h-[400px]">
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <img
                        src="/skateboarding-sunset.png"
                        alt="Skateboarding at sunset"
                        className="w-full scale-x-[-1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-orange-500/30 to-orange-600/40"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-[40px] font-semibold mb-14 leading-[36px]">Learn Play and Jumping</h3>

                      <div className="mb-4">
                        <p className="text-[18px] leading-[15px] font-medium opacity-95 mb-2">Tony Andrew</p>
                        <p className="text-[14px] opacity-80">53K views • 2 weeks ago</p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="absolute bottom-5 w-[80px] h-[80px] border-2 p-1 border-white rounded-full flex items-center justify-center">
                          <div className="w-full h-full rounded-full flex items-center justify-center">
                            <img
                              src="/person-orange-beanie.png"
                              alt="dashbrand"
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-5 left-14 rounded-full flex items-center justify-center">
                          <img
                            src="/verificationWhite.png"
                            alt="verificationWhite"
                            className="w-[16px] h-[16px] rounded-full"
                          />
                        </div>
                      </div>

                      <div className="absolute -bottom-6 -right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm font-medium">
                        10 min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainees Section */}
            <div className="px-6 mb-8">
              <div className="flex items-center mb-4">
                <h2 className="text-[30px] font-medium mr-4">Trainees</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              <div className="rounded-3xl border-2 border-gray-300 p-6 shadow-sm h-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-[150px] h-[150px] p-2 rounded-full overflow-hidden border-2 border-gray-400">
                      <img
                        src="/thomas-hope-profile.png"
                        alt="Thomas Hope"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-bold text-[28px] text-black">Thomas Hope</h5>
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <p className="text-black text-[18px]">
                          <span className="italic">@</span>thomashope
                        </p>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">200K Trainees</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">300 Videos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="bg-[#2B3445] h-[50px] hover:bg-gray-800 text-white px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors">
                      Book Call
                    </button>
                    <p className="text-2xl font-bold text-center text-black">$40</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
