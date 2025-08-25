import TraineeSidebar from "@/components/trainee-sidebar";
import TraineeHeader from "@/components/trainee-header";
import { Users, Video } from "lucide-react";

export default function RunningTAask() {
 

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TraineeSidebar currentPath="/trainee/running-task" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden">
          {/* Today Section */}
          <div className="px-6 mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-[30px] font-medium mr-4">Today</h2>
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
                      <h5 className="font-bold text-[28px] text-black">
                        Thomas Hope
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
                        <span className="italic">@</span>thomashope
                      </p>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-black text-[18px]" />
                        <span className="text-black text-[18px] font-medium">
                          200K Trainees
                        </span>
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
                  <button className="bg-[#2B3445] h-[50px] hover:bg-gray-800 text-white px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Week Ago Section */}
          <div className="px-6 mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-[30px] font-medium mr-4">Week Ago</h2>
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
                      <h5 className="font-bold text-[28px] text-black">
                        Thomas Hope
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
                        <span className="italic">@</span>thomashope
                      </p>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-black text-[18px]" />
                        <span className="text-black text-[18px] font-medium">
                          200K Trainees
                        </span>
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
                  <button className="bg-[#33D067] h-[50px] hover:bg-gray-800 text-white px-6 py-2.5 rounded-[20px] mb-3 font-medium transition-colors">
                    Attended
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="px-6 mb-8">
            <div className="grid grid-cols-4 gap-8 mb-8">
              {[
                {
                  title: "Learn to playing chess only in 7 min",
                  instructor: "Budi Hakim",
                  views: "1.5M views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash3.png",
                  price: "$24",
                },

                {
                  title: "Learn to playing chess only in 7 min",
                  instructor: "Budi Hakim",
                  views: "1.5M views",
                  time: "2 weeks ago",
                  duration: "2 min",
                  image: "/dash3.png",
                  price: "$24",
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="h-[420px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
                >
                  <div className="relative w-full h-56">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/40 bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                      {course.duration}
                    </div>
                    <div className="absolute -bottom-7 right-6 w-[70px] h-[70px] border-2 p-1 border-white rounded-full flex items-center justify-center">
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <img
                          src="/runningTask1.png"
                          alt="runningTask1"
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
                      <span className="text-[16px] leading-[14px] text-[#B7B9D2]">
                        {course.instructor}
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
                        {course.views} • {course.time}
                      </p>
                      {/* {course.price && (
                        <span className="text-[15px] leading-[18px] font-bold text-[#FFFFFF] ml-2">
                          {course.price}
                        </span>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
