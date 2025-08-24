import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function TraineeSignUp() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#4e97fd]">Sign up</h2>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-gray-700">
                Full Name
              </Label>
              <Input id="fullName" type="text" placeholder="Enter your full name" className="h-12 border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-700">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" className="h-12 border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-700">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Create a password" className="h-12 border-gray-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="h-12 border-gray-200"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="rounded" />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms and Conditions
              </Label>
            </div>

            <Button className="w-full h-12 bg-[#2b3445] hover:bg-[#374151] text-white">Create Account</Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signin/trainee" className="text-[#4e97fd] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="flex-1 bg-[#2b3445] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Let's start as
            <br />
            Trainee amazing
            <br />
            journey with us
          </h1>
        </div>

        {/* 3D Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-8 translate-y-4">
            <div className="w-48 h-48 rounded-full gradient-orange-pink opacity-90 blur-sm"></div>
          </div>
          <div className="absolute bottom-20 right-20">
            <div className="w-24 h-24 rounded-full gradient-purple-blue opacity-80"></div>
          </div>
          <div className="absolute top-32 right-32">
            <div className="w-16 h-16 rounded-full gradient-blue-purple opacity-75"></div>
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2">
            <div className="w-32 h-64 bg-gradient-to-b from-gray-400 to-gray-600 opacity-60 rounded-full transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
