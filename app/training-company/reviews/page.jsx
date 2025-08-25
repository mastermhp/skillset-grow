import TrainingCompanySidebar from "@/components/training-company-sidebar";
import TraineeHeader from "@/components/trainee-header";
import { Eye, ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function TrainingCompanyReviews() {
  const reviewsData = [
    {
      name: "Video Call",
      customer: "Nathan Clark",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 5,
    },
    {
      name: "Video Call",
      customer: "Ollie Casper",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 5,
    },
    {
      name: "Video Purchased",
      customer: "Ken Matthews",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 3,
    },
    {
      name: "Video Purchased",
      customer: "Bruce Reynolds",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 5,
    },
    {
      name: "Video Call",
      customer: "Gage Pequette",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 5,
    },
    {
      name: "Video Purchased",
      customer: "Zachary Taylor",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 4,
    },
    {
      name: "Video Call",
      customer: "Zach Marshall",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 4,
    },
    {
      name: "Video Call",
      customer: "Tony Richardson",
      comment: "But I must explain to you how all this of denouncing pleasure.",
      rating: 5,
    },
  ]

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  // const averageRating = 4.5;
  // const totalReviews = reviews.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TrainingCompanySidebar currentPath="/training-company/reviews" />

      <div className="flex-1">
        <TraineeHeader />

        <main className="ml-64 p-6">
          <div className="flex-1 flex flex-col">
            

            {/* Reviews Content */}
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Trainers Reviews
              </h1>

              {/* Reviews Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Comment
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reviewsData.map((review, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {review.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {review.customer}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                            {review.comment}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStars(review.rating)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Eye className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-8 space-x-2">
                <button className="p-2 border border-[#4e97fd] text-[#4e97fd] rounded-full hover:text-gray-600 hover:border-gray-400" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full border border-[#4e97fd] text-[#4e97fd] text-sm font-medium">
                  1
                </button>
                <button className="p-2 rounded-full border border-[#4e97fd] text-[#4e97fd] hover:text-gray-600 hover:border-gray-400" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
