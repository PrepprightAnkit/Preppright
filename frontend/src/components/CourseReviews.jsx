import { Star } from 'lucide-react';
import React from 'react';

const CourseReviews = () => {
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
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">What Students Say</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white border-2 border-blue-100 rounded-xl shadow-lg p-6 flex items-center">
              <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-lg font-medium text-blue-700">{review.name}</h3>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <Star key={i} size={18} />
                  ))}
                  {review.rating % 1 !== 0 && (
                    <Star size={18} className="text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;