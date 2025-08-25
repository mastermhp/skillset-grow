import TraineeHeader from "@/components/trainee-header";
import TrainingCompanySidebar from "@/components/training-company-sidebar";
import { Trash2 } from "lucide-react";

export default function TrainingCompanyTrainersPayment() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainingCompanySidebar currentPath="/training-company/trainers-payment" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden">
             {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Trainers Payments</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-200 px-6 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="font-medium text-gray-900">Name</div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="font-medium text-gray-900">Services</div>
                <div className="font-medium text-gray-900">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 11 }, (_, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-gray-900">John Smith</div>
                    <div className="text-gray-900">trainersking@gmail.com</div>
                    <div className="text-gray-900">Information Technology, Agriculture, Skills</div>
                    <div>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        $100 Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
