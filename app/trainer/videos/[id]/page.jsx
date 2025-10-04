"use client"

import AuthGuard from "@/components/auth-guard"
import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Users, Eye, Clock, Award } from "lucide-react"

export default function TrainingModuleDetails() {
  const [module, setModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchModuleDetails()
    }
  }, [params.id])

  const fetchModuleDetails = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getTrainingModule(params.id)
      setModule(response.module)
    } catch (error) {
      console.error("[v0] Failed to fetch module details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="trainer">
        <div className="flex min-h-screen bg-gray-50">
          <TrainerSidebar currentPath="/trainer/own-videos" />
          <div className="flex-1">
            <TraineeHeader />
            <main className="ml-64 p-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Loading module details...</p>
              </div>
            </main>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (!module) {
    return (
      <AuthGuard requiredRole="trainer">
        <div className="flex min-h-screen bg-gray-50">
          <TrainerSidebar currentPath="/trainer/own-videos" />
          <div className="flex-1">
            <TraineeHeader />
            <main className="ml-64 p-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Module not found</p>
                <Button onClick={() => router.back()} className="mt-4">
                  Go Back
                </Button>
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
        <TrainerSidebar currentPath="/trainer/own-videos" />

        <div className="flex-1">
          <TraineeHeader />

          <main className="ml-64 p-6">
            <div className="mb-6">
              <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Videos
              </Button>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                  <Badge className={module.isPublished ? "bg-green-500" : "bg-yellow-500"}>
                    {module.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Enrolled Trainees</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-2xl font-bold">{module.enrolledTrainees?.length || 0}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-green-500" />
                        <span className="text-2xl font-bold">{module.views || 0}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <span className="text-2xl font-bold">{module.duration} min</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span className="text-2xl font-bold">{module.rating?.toFixed(1) || "N/A"}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Training Content</h2>
                  <div className="space-y-4">
                    {module.videos && module.videos.length > 0 ? (
                      module.videos.map((video, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{video.title}</CardTitle>
                            <CardDescription>Duration: {Math.floor(video.duration / 60)} minutes</CardDescription>
                          </CardHeader>
                        </Card>
                      ))
                    ) : (
                      <p className="text-gray-500">No videos uploaded yet</p>
                    )}
                  </div>
                </div>

                {module.enrolledTrainees && module.enrolledTrainees.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Trainee Progress</h2>
                    <div className="space-y-4">
                      {module.enrolledTrainees.map((trainee, index) => (
                        <Card key={trainee._id || index}>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={trainee.profileImage?.url || "/placeholder-user.jpg"}
                                  alt={trainee.fullName}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                  <p className="font-medium">{trainee.fullName}</p>
                                  <p className="text-sm text-gray-500">{trainee.email}</p>
                                </div>
                              </div>
                              <Badge className="bg-green-500">Completed</Badge>
                            </div>
                            <Progress value={100} className="h-2" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
