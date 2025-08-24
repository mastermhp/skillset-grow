import Link from "next/link"
import {
  LayoutDashboard,
  MessageSquare,
  PlaySquare,
  Building2,
  History,
  HelpCircle,
  Settings,
  UserCheck,
  Star,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/trainer/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/trainer/messages", icon: MessageSquare },
  { name: "Trainer Request", href: "/trainer/requests", icon: UserCheck },
  { name: "Own Videos", href: "/trainer/own-videos", icon: PlaySquare },
  { name: "Training company", href: "/trainer/training-company", icon: Building2 },
]

const additionalNav = [
  { name: "Reviews", href: "/trainer/reviews", icon: Star },
  { name: "Spending History", href: "/trainer/spending-history", icon: History },
  { name: "Support Tickets", href: "/trainer/support-tickets", icon: HelpCircle },
  { name: "Account Settings", href: "/trainer/settings", icon: Settings },
]

export default function TrainerSidebar({ currentPath = "/trainer/dashboard" }) {
  return (
    <div className="w-64 bg-[#2b3445] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-600">
        <h1 className="text-white font-bold text-lg">SKILLSETGROW</h1>
        <p className="text-gray-400 text-sm mt-1">TRAINER</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive ? "bg-[#4e97fd] text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8">
          <p className="text-gray-400 text-xs uppercase tracking-wider px-4 mb-4">ADDITIONAL</p>
          <ul className="space-y-2">
            {additionalNav.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive ? "bg-[#4e97fd] text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}
