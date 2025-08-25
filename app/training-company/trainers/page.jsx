import TraineeHeader from "@/components/trainee-header";
import TrainingCompanySidebar from "@/components/training-company-sidebar";
import { Trash2 } from "lucide-react";

export default function TrainingCompanyTrainers() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainingCompanySidebar currentPath="/training-company/trainers" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden">
          <div className="flex-1 flex flex-col">
        

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Trainers Information</h1>
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
              New Users
            </button>
          </div>

          {/* Trainers Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-200 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 font-medium text-gray-700">
                <div className="col-span-2">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-4">Services</div>
                <div className="col-span-3">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 11 }, (_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <span className="text-gray-900 font-medium">John Smith</span>
                    </div>
                    <div className="col-span-3">
                      <span className="text-gray-700">trainersking@gmail.com</span>
                    </div>
                    <div className="col-span-4">
                      <span className="text-gray-700">Information Technology, Agriculture, Skills</span>
                    </div>
                    <div className="col-span-3 flex items-center space-x-2">
                      {/* Show Join request button for some rows, hide for others */}
                      {index !== 3 && index !== 5 && index !== 8 && (
                        <button className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded text-sm hover:bg-blue-50 transition-colors">
                          Join request
                        </button>
                      )}
                      <button className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors flex items-center space-x-1">
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </main>
      </div>
    </div>
  );
}
