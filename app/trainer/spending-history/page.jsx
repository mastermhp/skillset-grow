import TraineeHeader from "@/components/trainee-header";
import { Check, RefreshCw } from "lucide-react";
import TrainerSidebar from "@/components/trainer-sidebar";

export default function TrainerSpendingHistory() {
  return (
    <div className="flex min-h-screen bg-[#F3F5F9]">
      <TrainerSidebar currentPath="/trainer/spending-history" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden bg-[#F3F5F9]">
          <div className="flex min-h-screen bg-[#F3F5F9]">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Main Content Area */}
              <div className="flex-1 p-8">
                {/* Recent Earnings Section */}
                <div>
                  <div className="flex items-center justify-between bg-white p-8 rounded-t-md">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Recent Earnings
                    </h2>
                    <button className="text-blue-500 text-sm font-medium px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50">
                      All Orders
                    </button>
                  </div>

                  {/* Table */}
                  <div className="bg-white border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#F3F5F9]">
                        <tr>
                          <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                            Month
                          </th>
                          <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                            Payment
                          </th>
                          <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo5
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Success
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $152.25
                          </td>
                        </tr>
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo6
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Pending
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $125.25
                          </td>
                        </tr>
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo5
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Success
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $152.25
                          </td>
                        </tr>
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo6
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Pending
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $125.25
                          </td>
                        </tr>
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo5
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Success
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $152.25
                          </td>
                        </tr>
                        <tr>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            #6d3wedo6
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-600">
                            January
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Pending
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            $125.25
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
