import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-4">
            <h2 className="text-[35px] font-bold text-[#4e97fd]">Let's get you <br /> set up</h2>
            <p className="text-[#7a7d88] text-sm leading-relaxed">
              It only takes a moment. And it'll take your time with SkillSetGrow even better.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/trainee/dashboard">
              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start border-gray-200 hover:bg-gray-50 bg-transparent mb-4"
              >
                Continue as Trainee
              </Button>
            </Link>
            <Link href="/trainer/dashboard">
              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start border-gray-200 hover:bg-gray-50 bg-transparent mb-4"
              >
                Continue as Trainer
              </Button>
            </Link>
            <Link href="/training-company/dashboard">
              <Button
                variant="outline"
                className="w-full h-12 text-left justify-start border-gray-200 hover:bg-gray-50 bg-transparent"
              >
                Continue as Training Company
              </Button>
            </Link>
          </div>

          <Button className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] rounded-[30px] text-white">Get set up</Button>
        </div>
      </div>

      {/* Right Side - Welcome Section with 3D Shapes */}
      <div className="flex-1 bg-[#2b3445] flex items-start justify-start p-8 relative overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-[90px] font-bold text-white mb-4">
            Welcome to
            <br />
            Skill Set Grow
          </h1>
        </div>

        {/* 3D Shapes */}
        <div className="absolute inset-0">
          <img src="/Frame.png" alt="" className="absolute right-0 bottom-0 " />
        </div>
      </div>
    </div>
  )
}
