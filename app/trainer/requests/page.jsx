"use client"

import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Badge } from "@/components/ui/badge"
import { Video } from "lucide-react"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import AuthGuard from "@/components/auth-guard"

export default function TrainerRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)

        const response = await apiClient.getTrainerRequests({ trainerId: user._id })
        if (response.success) {
          setRequests(response.requests || [])
        }
      }
    } catch (error) {
      console.error("[v0] Failed to fetch trainer requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await apiClient.updateTrainerRequest(requestId, { status: "accepted" })
      if (response.success) {
        fetchRequests()

        // Update user's companyId in localStorage
        const userStr = localStorage.getItem("user")
        if (userStr) {
          const user = JSON.parse(userStr)
          const request = requests.find((r) => r._id === requestId)
          if (request) {
            user.companyId = request.company._id
            localStorage.setItem("user", JSON.stringify(user))
          }
        }

        alert("Request accepted successfully!")
      }
    } catch (error) {
      console.error("[v0] Failed to accept request:", error)
      alert("Failed to accept request")
    }
  }

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await apiClient.updateTrainerRequest(requestId, { status: "rejected" })
      if (response.success) {
        fetchRequests()
        alert("Request declined")
      }
    } catch (error) {
      console.error("[v0] Failed to decline request:", error)
      alert("Failed to decline request")
    }
  }

  return (
    <AuthGuard requiredRole="trainer">
      <div className="flex min-h-screen bg-gray-50">
        <TrainerSidebar currentPath="/trainer/requests" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Request Company</h1>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No company requests yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request._id} className="rounded-3xl border-2 border-gray-300 p-6 shadow-sm h-[200px] mb-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-[150px] h-[150px] p-2 rounded-full overflow-hidden border-2 border-gray-400">
                          <img
                            src={request.company?.profileImage?.url || "/thomas-hope-profile.png"}
                            alt={request.company?.fullName || "Company"}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-bold text-[28px] text-black">
                              {request.company?.companyName || request.company?.fullName || "Company Name"}
                            </h5>
                            {request.company?.isVerified && (
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
                            <p className="text-black text-[18px]"></p>
                            <div className="flex items-center space-x-1">
                              <Video className="w-4 h-4 text-black text-[18px]" />
                              <span className="text-black text-[18px] font-medium">
                                {request.company?.totalVideos || 0} Videos
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          {request.status === "pending" ? (
                            <>
                              <button
                                onClick={() => handleAcceptRequest(request._id)}
                                className="bg-[#33D067] h-[50px] w-[150px] text-[16px] text-white rounded-[20px] hover:bg-green-600 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleDeclineRequest(request._id)}
                                className="bg-red-500 h-[50px] w-[150px] text-[16px] text-white rounded-[20px] hover:bg-red-600 transition-colors"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <Badge
                              variant={request.status === "accepted" ? "default" : "secondary"}
                              className={
                                request.status === "accepted"
                                  ? "bg-[#33D067] h-[50px] w-[250px] text-[16px] text-white"
                                  : request.status === "rejected"
                                    ? "bg-red-500 h-[50px] w-[250px] text-[16px] text-white"
                                    : "bg-[#2B3445] h-[50px] w-[250px] text-[16px] text-white"
                              }
                            >
                              {request.status === "accepted"
                                ? "Accepted"
                                : request.status === "rejected"
                                  ? "Rejected"
                                  : "Pending"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
