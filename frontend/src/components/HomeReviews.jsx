import { Star } from 'lucide-react';
import React from 'react';

const HomeReviews = () => {
  const reviews = [
    {
      image: 'https://img.freepik.com/premium-photo/portrait-young-indian-teenage-boy-relaxing-park_251136-11008.jpg?semt=ais_hybrid',
      name: 'Sanjay L.',
      rating: 4.5,
      review: "The courses on this platform have been incredibly helpful for improving my skills. Highly recommended!"
    },
    {
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202208/Option_1_-_Aryan_JAIN_x.jpeg?VersionId=iT6pvrs3MzZV9itpfqLODfKPS.FvzW58',
      name: 'Rahul T.',
      rating: 4.8,
      review: "I'm amazed by the quality of the content and the engaging way it's presented. Definitely worth the investment."
    },
    {
      image: 'https://rubuen.weebly.com/uploads/6/1/2/5/61257037/s715340680631163983_p1_i1_w262.jpeg',
      name: 'Vignesh S.',
      rating: 5,
      review: "This is the best online learning experience I've had. The instructors are knowledgeable and the platform is user-friendly."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <div className="container  mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Explore Learning Paths Tailored to Your Goals
            </p>
          </div>
          {/* <a href="/allCat" className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all">
            View All Categories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white border-2 border-blue-100 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className="p-6 text-center">
                <img src={review.image} alt={review.name} className="mx-auto h-24 w-24 mb-4 object-contain" />
                <h3 className="text-2xl font-bold text-blue-700 mb-3">{review.name}</h3>
                <div className="flex justify-center text-yellow-500 mb-3">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <Star key={i} size={18} />
                  ))}
                  {review.rating % 1 !== 0 && (
                    <Star size={18} className="text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 line-clamp-3">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeReviews;