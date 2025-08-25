import TraineeHeader from "@/components/trainee-header";
import TrainingCompanySidebar from "@/components/training-company-sidebar";
import { CheckCircle, Download, Play, Trash2 } from "lucide-react";

export default function TrainingCompanyTrainersRequests() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainingCompanySidebar currentPath="/training-company/trainer-requests" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="ml-64 flex-1 p-6 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Trainer videos Request
              </h1>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Send Invite Link</span>
              </button>
            </div>

            {/* Request Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-start justify-between">
                {/* Left Section - Profile and Details */}
                <div className="flex items-start space-x-6">
                  {/* Profile Image and Info */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 mb-3">
                      <img
                        src="/thomas-hope-profile.png"
                        alt="Thomas Hope"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Thomas Hope
                      </h2>
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 mb-6">
                      <Play className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">06 Videos</span>
                    </div>

                    {/* Details List */}
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">
                          Service:{" "}
                        </span>
                        <span className="text-gray-700">
                          Information Technology
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          Address:{" "}
                        </span>
                        <span className="text-gray-700">United Kingdom</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          Trainer certificate:{" "}
                        </span>
                        <span className="text-gray-700">Certificate.png</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">
                          Profile certificate:{" "}
                        </span>
                        <span className="text-gray-700">profile.png</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions and Timestamp */}
                <div className="flex flex-col items-end space-y-4">
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Accept Request
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Reject
                    </button>
                  </div>

                  {/* Timestamp */}
                  <div className="text-right text-gray-600">
                    <div className="text-sm">22 April 2024 03:00 PM</div>
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
