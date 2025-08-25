import Link from "next/link"
import {
  LayoutDashboard,
  MessageSquare,
  PlaySquare,
  Building2,
  History,
  HelpCircle,
  Settings,
  CheckSquare,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/trainee/dashboard", icon: LayoutDashboard },
  { name: "Messages", href: "/trainee/messages", icon: MessageSquare },
  { name: "Running Task", href: "/trainee/running-task", icon: CheckSquare },
  { name: "Own Videos", href: "/trainee/own-videos", icon: PlaySquare },
  { name: "Training company", href: "/trainee/training-company", icon: Building2 },
]

const additionalNav = [
  { name: "Spending History", href: "/trainee/spending-history", icon: History },
  { name: "Support Tickets", href: "/trainee/support-tickets", icon: HelpCircle },
  { name: "Account Settings", href: "/trainee/settings", icon: Settings },
]

export default function TraineeSidebar({ currentPath = "/trainee/dashboard" }) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#2b3445] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-600">
        <h1 className="text-white font-bold text-lg">SKILLSET|GROW</h1>
        <p className="text-gray-400 text-sm mt-1">TRAINEE</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#4e97fd] text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
                      isActive
                        ? "bg-[#4e97fd] text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
