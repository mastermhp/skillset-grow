"use client"

import TraineeHeader from "@/components/trainee-header"
import TrainingCompanySidebar from "@/components/training-company-sidebar"
import { Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import AuthGuard from "@/components/auth-guard"

export default function TrainingCompanyTrainers() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [companyId, setCompanyId] = useState(null)
  const [sentRequests, setSentRequests] = useState(new Set())

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        setCompanyId(user._id)

        const requestsResponse = await apiClient.getTrainerRequests({ companyId: user._id, status: "pending" })
        if (requestsResponse.success) {
          const requestedTrainerIds = new Set(requestsResponse.requests.map((req) => req.trainer._id))
          setSentRequests(requestedTrainerIds)
        }
      }

      const response = await apiClient.getTrainers({ limit: 50 })
      if (response.success) {
        setTrainers(response.trainers)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch trainers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinRequest = async (trainerId) => {
    if (!companyId) {
      alert("Please log in as a company to send requests")
      return
    }

    try {
      const response = await apiClient.createTrainerRequest({
        trainerId,
        companyId,
        message: "We would like you to join our training company",
      })

      if (response.success) {
        alert("Join request sent successfully!")
        setSentRequests((prev) => new Set([...prev, trainerId]))
      } else {
        alert(response.error || "Failed to send request")
      }
    } catch (error) {
      console.error("[v0] Failed to send join request:", error)
      alert("Failed to send request")
    }
  }

  const handleDelete = async (trainerId) => {
    if (confirm("Are you sure you want to remove this trainer?")) {
      // TODO: Implement delete functionality
      console.log("[v0] Delete trainer:", trainerId)
    }
  }

  return (
    <AuthGuard requiredRole="company">
      <div className="flex min-h-screen bg-gray-50">
        <TrainingCompanySidebar currentPath="/training-company/trainers" />

        <div className="flex-1 flex flex-col">
          <TraineeHeader className="h-16" />

          <main className="ml-64 flex-1 p-6 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Trainers Information</h1>
                  <button
                    onClick={() => (window.location.href = "/training-company/trainer-requests")}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Requests
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-200 px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 font-medium text-gray-700">
                      <div className="col-span-2">Name</div>
                      <div className="col-span-3">Email</div>
                      <div className="col-span-4">Services</div>
                      <div className="col-span-3">Actions</div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {loading ? (
                      <div className="px-6 py-12 text-center text-gray-500">Loading trainers...</div>
                    ) : trainers.length === 0 ? (
                      <div className="px-6 py-12 text-center text-gray-500">No trainers found</div>
                    ) : (
                      trainers.map((trainer) => (
                        <div key={trainer._id} className="px-6 py-4">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-2">
                              <span className="text-gray-900 font-medium">{trainer.fullName}</span>
                            </div>
                            <div className="col-span-3">
                              <span className="text-gray-700">{trainer.email}</span>
                            </div>
                            <div className="col-span-4">
                              <span className="text-gray-700">
                                {trainer.expertise?.join(", ") || "No expertise listed"}
                              </span>
                            </div>
                            <div className="col-span-3 flex items-center space-x-2">
                              {!sentRequests.has(trainer._id) ? (
                                <button
                                  onClick={() => handleJoinRequest(trainer._id)}
                                  className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded text-sm hover:bg-blue-50 transition-colors"
                                >
                                  Join request
                                </button>
                              ) : (
                                <span className="px-3 py-1.5 text-gray-500 text-sm">Request Sent</span>
                              )}
                              <button
                                onClick={() => handleDelete(trainer._id)}
                                className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors flex items-center space-x-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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
