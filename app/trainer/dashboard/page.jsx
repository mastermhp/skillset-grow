import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Users } from "lucide-react"

export default function TrainerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/dashboard" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="p-6">
          {/* Hero Section with Guitar Background */}
          <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-white mb-8 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/guitar-background.png"
                alt="Guitar background"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <img
                    src="/trainer-profile.png"
                    alt="Company Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Company Name</h2>
                  <p className="text-white/80">@company</p>
                  <div className="flex items-center space-x-4 text-sm mt-1">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      200K Viewers
                    </span>
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      300 Videos
                    </span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Button className="bg-[#4e97fd] hover:bg-[#3b82f6]">Favorite</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Trainers Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Trainers</h2>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full">
                        <img
                          src="/trainer-profile.png"
                          alt="Thomas Hope"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">Thomas Hope</h3>
                        <p className="text-sm text-gray-600">@thomashope</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Users className="w-4 h-4 mr-1" />
                          200K Trainees
                          <Play className="w-4 h-4 ml-3 mr-1" />
                          300 Videos
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">$40</div>
                      <Button className="bg-[#2b3445] hover:bg-[#374151] mt-2">Book Call</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="p-0 overflow-hidden">
                  <div className="relative">
                    <img src="/skateboard-tutorial-video.png" alt={`Video ${i}`} className="w-full h-32 object-cover" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      $14
                    </div>
                    <Button size="sm" className="absolute top-2 left-2 bg-black/70 hover:bg-black/80">
                      <Play className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1">Learn the basics of the Coding in 7 min</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Play className="w-3 h-3 mr-1" />7 min • 2 weeks ago
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
