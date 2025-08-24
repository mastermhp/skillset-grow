import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Star } from "lucide-react"

export default function TrainerRequests() {
  const requests = [
    {
      id: 1,
      name: "Thomas Hope",
      username: "@thomashope",
      trainees: "200K Trainees",
      videos: "300 Videos",
      status: "pending",
      avatar: "/trainer-profile.png",
    },
    {
      id: 2,
      name: "Thomas Hope",
      username: "@thomashope",
      trainees: "200K Trainees",
      videos: "300 Videos",
      status: "approved",
      avatar: "/trainer-profile.png",
    },
    {
      id: 3,
      name: "Thomas Hope",
      username: "@thomashope",
      trainees: "200K Trainees",
      videos: "300 Videos",
      status: "pending",
      avatar: "/trainer-profile.png",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/requests" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Trainer Requests</h1>
            <p className="text-gray-600 mt-1">Manage incoming requests from trainees</p>
          </div>

          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full">
                      <img
                        src={request.avatar || "/placeholder.svg"}
                        alt={request.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-gray-600">{request.username}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Users className="w-4 h-4 mr-1" />
                        {request.trainees}
                        <Star className="w-4 h-4 ml-3 mr-1" />
                        {request.videos}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={request.status === "approved" ? "default" : "secondary"}
                      className={
                        request.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {request.status === "approved" ? "Approved" : "Pending"}
                    </Badge>

                    {request.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
