"use client"
import { useState } from "react";
import TraineeHeader from "@/components/trainee-header";
import { ChevronDown, X } from "lucide-react";
import TrainingCompanySidebar from "@/components/training-company-sidebar";

export default function TrainerSettings() {
  const [notificationSetting, setNotificationSetting] = useState("Enable");
  const [rolesAllow, setRolesAllow] = useState("Trainee");
  const [paymentsAvailable, setPaymentsAvailable] = useState("Card Payment");
  const [notificationSound, setNotificationSound] = useState("Pop Up Tune");
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [billingsEnabled, setBillingsEnabled] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F3F5F9]">
      <TrainingCompanySidebar currentPath="/training-company/account-settings" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-8 bg-[#F3F5F9] ">
          <div className="flex-1 p-8 bg-white rounded-xl shadow-md">
            <div className="max-w-6xl mx-auto">
              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-16 mb-16">
                {/* General Settings */}
                <div>
                  <h2 className="text-2xl font-bold text-black mb-8">
                    General settings
                  </h2>

                  <div className="space-y-8">
                    {/* Notification Setting */}
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Notification Setting
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You are enable or disable the notification setting from
                        here.
                      </p>

                      <div className="relative">
                        <select
                          value={notificationSetting}
                          onChange={(e) =>
                            setNotificationSetting(e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Enable">Enable</option>
                          <option value="Disable">Disable</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Roles Allow */}
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Roles allow
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Select roles show to all users
                      </p>

                      <div className="relative">
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              Trainee
                              <X className="w-3 h-3" />
                            </span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Settings */}
                <div>
                  <h2 className="text-2xl font-bold text-black mb-8">
                    Purchase settings
                  </h2>

                  <div className="space-y-8">
                    {/* Payments Available */}
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        Payments Available
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Select the available Option at a time for payments
                      </p>

                      <div className="relative">
                        <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              Card Payment
                              <X className="w-3 h-3" />
                            </span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* General Notification Sound */}
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        General notification sound
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You can select the notification Sound for App
                      </p>

                      <div className="relative">
                        <select
                          value={notificationSound}
                          onChange={(e) => setNotificationSound(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pop Up Tune">Pop Up Tune</option>
                          <option value="Bell Sound">Bell Sound</option>
                          <option value="Chime">Chime</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-8">
                  Notification settings
                </h2>

                <div className="grid grid-cols-2 gap-16">
                  {/* Updates Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-black">
                      Updates
                    </span>
                    <button
                      onClick={() => setUpdatesEnabled(!updatesEnabled)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        updatesEnabled ? "bg-slate-800" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          updatesEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Billings Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-black">
                      Billings
                    </span>
                    <button
                      onClick={() => setBillingsEnabled(!billingsEnabled)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        billingsEnabled ? "bg-slate-800" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          billingsEnabled ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
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
