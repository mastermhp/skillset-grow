import TraineeHeader from "@/components/trainee-header";
import { ChevronDown } from "lucide-react";
import TrainingCompanySidebar from "../../../components/training-company-sidebar";

export default function TrainingCompanyDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainingCompanySidebar currentPath="/training-company/dashboard" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-6">
          <div className="flex-1 p-8">
            <div className="grid grid-cols-2 gap-8 h-full">
              {/* Total Revenue Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Total revenue
                  </h2>
                  <p className="text-3xl font-bold text-blue-500">$22,323</p>
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Call</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Videos Call</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Videos</span>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="relative h-64">
                  <div className="flex items-end justify-between h-full space-x-2">
                    {[
                      { height: "h-32", color: "bg-gray-300", month: "Jan" },
                      { height: "h-20", color: "bg-blue-500", month: "Feb" },
                      { height: "h-16", color: "bg-gray-300", month: "Mar" },
                      { height: "h-12", color: "bg-gray-300", month: "Apr" },
                      { height: "h-48", color: "bg-purple-500", month: "May" },
                      { height: "h-8", color: "bg-gray-300", month: "Jun" },
                      { height: "h-28", color: "bg-gray-300", month: "Jul" },
                      { height: "h-24", color: "bg-gray-300", month: "Aug" },
                      { height: "h-4", color: "bg-gray-300", month: "Sep" },
                      { height: "h-40", color: "bg-green-500", month: "Oct" },
                      { height: "h-20", color: "bg-gray-300", month: "Nov" },
                      { height: "h-16", color: "bg-gray-300", month: "Dec" },
                    ].map((bar, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-8 ${bar.height} ${bar.color} rounded-t-sm mb-2`}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {bar.month}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Chart dots */}
                  <div className="absolute top-8 left-8 w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-32 left-32 w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-24 right-32 w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Total Trainer Section */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Total Trainer
                    </h2>
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">
                        Select Filter
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Circular Progress Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#gradient1)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset="62.8"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-purple-600">
                          5,000
                        </span>
                        <span className="text-sm text-purple-500">Today</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trainer Info Section */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Trainer Info
                    </h2>
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-600">
                        Select filter
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-48 h-48">
                      <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="35"
                          stroke="#e5e7eb"
                          strokeWidth="16"
                          fill="none"
                        />
                        {/* Purple segment (Total) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="35"
                          stroke="#8b5cf6"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray="109.9 109.9"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                        />
                        {/* Orange segment (Inactive) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="35"
                          stroke="#f97316"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray="54.95 164.85"
                          strokeDashoffset="-109.9"
                          strokeLinecap="round"
                        />
                        {/* Blue segment (Active) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="35"
                          stroke="#3b82f6"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray="54.95 164.85"
                          strokeDashoffset="-164.85"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-purple-600">
                          500
                        </span>
                        <span className="text-sm text-gray-500">(30 days)</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Total</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Inactive</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
