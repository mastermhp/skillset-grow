import TrainerSidebar from "@/components/trainer-sidebar"
import TraineeHeader from "@/components/trainee-header"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TrainerReviews() {
  const reviews = [
    {
      id: 1,
      name: "John Smith",
      username: "@johnsmith",
      rating: 5,
      comment:
        "Excellent trainer! Very knowledgeable and patient. Highly recommend for anyone looking to improve their skills.",
      date: "2 days ago",
      avatar: "/user-profile-illustration.png",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "@sarahjohnson",
      rating: 4,
      comment: "Great experience overall. The training sessions were well structured and informative.",
      date: "1 week ago",
      avatar: "/user-profile-illustration.png",
    },
    {
      id: 3,
      name: "Mike Wilson",
      username: "@mikewilson",
      rating: 5,
      comment: "Outstanding trainer! Really helped me understand complex concepts in a simple way.",
      date: "2 weeks ago",
      avatar: "/user-profile-illustration.png",
    },
    {
      id: 4,
      name: "Emily Davis",
      username: "@emilydavis",
      rating: 4,
      comment: "Very professional and helpful. Would definitely book another session.",
      date: "3 weeks ago",
      avatar: "/user-profile-illustration.png",
    },
  ]

  const averageRating = 4.5
  const totalReviews = reviews.length

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainerSidebar currentPath="/trainer/reviews" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Reviews</h1>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">{averageRating}</span>
              </div>
              <span className="text-gray-600">({totalReviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-gray-600">{review.username}</p>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
