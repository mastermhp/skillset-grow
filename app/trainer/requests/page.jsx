import TrainerSidebar from "@/components/trainer-sidebar";
import TraineeHeader from "@/components/trainee-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Video } from "lucide-react";

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
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/requests" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Request Company</h1>
          </div>

          {/* trainers card  */}

          <div className="space-y-4">
            {requests.map((request) => (
              <div className="rounded-3xl border-2 border-gray-300 p-6 shadow-sm h-[200px] mb-10">
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
                        <h5 className="font-bold text-[28px] text-black">
                         Company Name
                        </h5>
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex items-center justify-center">
                          <svg
                            className="w-2 h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
                          {/* <span className="italic">@</span>thomashope */}
                        </p>
                        <div className="flex items-center space-x-1">
                          {/* <Users className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">
                            200K Trainees
                          </span> */}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4 text-black text-[18px]" />
                          <span className="text-black text-[18px] font-medium">
                            300 Videos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          request.status === "approved"
                            ? "bg-[#33D067] h-[50px] w-[250px] text-[16px] text-white"
                            : "bg-[#2B3445] h-[50px] w-[250px] text-[16px] text-white"
                        }
                      >
                        {request.status === "approved" ? "Sent Request" : "Pending"}
                      </Badge>
                    </div> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
