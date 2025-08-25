import TraineeSidebar from "@/components/trainee-sidebar";
import TraineeHeader from "@/components/trainee-header";

export default function OwnVideos() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TraineeSidebar currentPath="/trainee/own-videos" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden">
          {/* Purchased Section */}
          <div className="px-6 mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-[30px] font-medium mr-4">Purchased</h2>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="px-6 mb-8">
            <div className="grid grid-cols-4 gap-8 mb-8">
              {[
                
                {
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
                {
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
                {
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
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
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
                {
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
                {
                  title: "Learn the basics of the Coding in 7 min?",
                  instructor: "Johny Wise",
                  views: "100k views",
                  time: "2 weeks ago",
                  duration: "7 min",
                  image: "/dash2.jpg",
                  price: "$24",
                },
                {
                  title: "Learn to playing chess only in 7 min",
                  instructor: "Budi Hakim",
                  views: "1.5M views",
                  time: "2 weeks ago",
                  duration: "7 min",
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
