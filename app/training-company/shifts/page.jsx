"use client"

import AuthGuard from "@/components/auth-guard"
import TraineeHeader from "@/components/trainee-header"
import TrainingCompanySidebar from "@/components/training-company-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Plus, Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompanyShifts() {
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [companyId, setCompanyId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchShifts()
  }, [])

  const fetchShifts = async () => {
    try {
      setLoading(true)
      const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (userStr) {
        const user = JSON.parse(userStr)
        setCompanyId(user._id)

        const response = await apiClient.getShifts({ companyId: user._id })
        setShifts(response.shifts || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch shifts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (shiftId, requestId) => {
    try {
      await apiClient.updateShiftRequest(shiftId, requestId, "accepted")
      fetchShifts() // Refresh the list
    } catch (error) {
      console.error("[v0] Failed to accept request:", error)
    }
  }

  const handleRejectRequest = async (shiftId, requestId) => {
    try {
      await apiClient.updateShiftRequest(shiftId, requestId, "rejected")
      fetchShifts() // Refresh the list
    } catch (error) {
      console.error("[v0] Failed to reject request:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "filled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <AuthGuard requiredRole="company">
      <div className="flex min-h-screen bg-gray-50">
        <TrainingCompanySidebar currentPath="/training-company/shifts" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Shift Management</h1>
                <Button onClick={() => router.push("/training-company/shifts/create")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Shift
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading shifts...</p>
                </div>
              ) : shifts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No shifts posted yet</p>
                  <Button onClick={() => router.push("/training-company/shifts/create")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Shift
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {shifts.map((shift) => (
                    <Card key={shift._id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl">{shift.title}</CardTitle>
                            <CardDescription className="mt-2">{shift.description}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(shift.status)}>{shift.status.toUpperCase()}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(shift.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              {shift.startTime} - {shift.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{shift.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>
                              {shift.assignedTrainees?.length || 0} / {shift.maxTrainees} filled
                            </span>
                          </div>
                        </div>

                        {shift.requests && shift.requests.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">Shift Requests ({shift.requests.length})</h3>
                            <div className="space-y-3">
                              {shift.requests.map((request) => (
                                <div
                                  key={request._id}
                                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={request.trainee?.profileImage?.url || "/placeholder-user.jpg"}
                                      alt={request.trainee?.fullName}
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                      <p className="font-medium">{request.trainee?.fullName}</p>
                                      <p className="text-sm text-gray-500">
                                        Requested {new Date(request.requestedAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {request.status === "pending" ? (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleAcceptRequest(shift._id, request._id)}
                                          className="text-green-600 border-green-600 hover:bg-green-50"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-1" />
                                          Accept
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleRejectRequest(shift._id, request._id)}
                                          className="text-red-600 border-red-600 hover:bg-red-50"
                                        >
                                          <XCircle className="w-4 h-4 mr-1" />
                                          Reject
                                        </Button>
                                      </>
                                    ) : (
                                      <Badge className={request.status === "accepted" ? "bg-green-500" : "bg-red-500"}>
                                        {request.status.toUpperCase()}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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
