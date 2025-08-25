import TraineeHeader from "@/components/trainee-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react"
import TrainingCompanySidebar from "@/components/training-company-sidebar"

export default function TrainerSupportTickets() {
  const tickets = [
    { id: 1, info: "How much do I have to pay for...", type: "Normal", date: "10 April, 2022", title: "UX Problem" },
    { id: 2, info: "Cannot book call", type: "Urgent", date: "13 April, 2022", title: "Website Problem" },
    { id: 3, info: "Do you accept prepaid card?", type: "Normal", date: "13 April, 2022", title: "Website Problem" },
    { id: 4, info: "Where's My Stuff?", type: "Urgent", date: "13 April, 2022", title: "Website Problem" },
    { id: 5, info: "Cannot book call", type: "Normal", date: "15 April, 2022", title: "UX Problem" },
    { id: 6, info: "Can you give me some discount", type: "Urgent", date: "16 April, 2022", title: "Payment Problem" },
    { id: 7, info: "Cannot book call", type: "Urgent", date: "17 April, 2022", title: "Payment Problem" },
    { id: 8, info: "How to buy video?", type: "Normal", date: "19 April, 2022", title: "UX Problem" },
    { id: 9, info: "Payment method is not working", type: "Urgent", date: "23 April, 2022", title: "Payment Problem" },
  ]

  return (
    <div className="flex min-h-screen bg-[#F3F5F9]">
      <TrainingCompanySidebar currentPath="/training-company/support-tickets" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-8 bg-[#F3F5F9]">
          <div className="bg-white rounded-lg shadow-sm mt-10">
            {/* <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-semibold">Support Tickets</h1>
            </div> */}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F3F5F9]">
                  <tr>
                    <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                      Information
                    </th>
                    <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                      Ticket Date
                    </th>
                    <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                      Problem Title
                    </th>
                    <th className="px-8 py-4 text-left text-[16px] font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.info}</td>
                      <td className="px-8 py-4 whitespace-nowrap">
                        <Badge
                          variant={ticket.type === "Urgent" ? "destructive" : "secondary"}
                          className={
                            ticket.type === "Urgent" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {ticket.type}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.date}</td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-[#7D879C] hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#7D879C] hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2">
                <Button variant="outline" size="sm" className="border-[#4e97fd] text-[#4e97fd] rounded-full" disabled>
                   <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-[#4e97fd] text-[#4e97fd] rounded-full">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-[#4e97fd] text-[#4E97FD] rounded-full" disabled>
                   <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
