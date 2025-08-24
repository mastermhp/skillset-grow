import TraineeSidebar from "@/components/trainee-sidebar";
import TraineeHeader from "@/components/trainee-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function TraineeMessages() {
  const messages = [
    {
      id: 1,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "5 min ago",
      unread: false,
    },
    {
      id: 3,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "10 min ago",
      unread: false,
    },
    {
      id: 4,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "15 min ago",
      unread: false,
    },
    {
      id: 5,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "20 min ago",
      unread: false,
    },
    {
      id: 6,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 7,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "5 min ago",
      unread: false,
    },
    {
      id: 8,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "10 min ago",
      unread: false,
    },
    {
      id: 9,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "15 min ago",
      unread: false,
    },
    {
      id: 10,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "20 min ago",
      unread: false,
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "2 min ago",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      message: "Hey, how can I help you?",
      time: "1 min ago",
      isMe: true,
    },
    {
      id: 3,
      sender: "John Smith",
      message: "Hey, I am here for your help...",
      time: "30 sec ago",
      isMe: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TraineeSidebar currentPath="/trainee/messages" />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <TraineeHeader className="h-16" />

        {/* Main content -> screen - header */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="flex gap-8 h-full">
            {/* Messages List */}
            <div className="w-80 h-full bg-white border-2 border-[#0000004D] rounded-[30px] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-lg">All Messages</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <img
                          src="/chatlist.png"
                          alt={msg.sender}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            {msg.sender}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {msg.message}
                        </p>
                      </div>
                      {msg.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white border-2 border-[#0000004D] rounded-[30px]">
              {/* Chat Header */}
              <div className="p-4 bg-white rounded-t-[30px] shadow-md border-b border-gray-200">
                <div className="flex items-center space-x-3 px-12">
                  <div className="w-10 h-10 bg-gray-300 rounded-full">
                    <img
                      src="/chatlist.png"
                      alt="John Smith"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-18">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex items-end ${
                      msg.isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Show avatar on left for others */}
                    {!msg.isMe && (
                      <div className="w-8 h-8 mr-2">
                        <img
                          src="/chatReply.png"
                          alt={msg.sender}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.isMe
                          ? "bg-[#4e97fd] text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isMe ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>

                    {/* Show avatar on right for me */}
                    {msg.isMe && (
                      <div className="w-8 h-8 ml-2">
                        <img
                          src="/chatlist.png"
                          alt="Me"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Hey, how are you?" className="flex-1 h-[60px] border-[#000000] rounded-[30px]" />
                  <Button size="sm" className=" hover:bg-[#3b82f6]">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
