import { AnimatePresence, motion } from 'framer-motion';
import { Star,ChevronLeft, ChevronRight } from 'lucide-react';
import React,{useState} from 'react';
import theme from './theme';

const ReviewCarousel = ({ reviews }) => {
  const [currentReview, setCurrentReview] = useState(0);

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevious = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-primary-main' : 'text-gray-300'}`} 
        fill={index < rating ? theme.colors.primary.main : 'none'}
      />
    ));
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary-light to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentReview}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.img 
                src={reviews[currentReview].image || "/api/placeholder/100/100"} 
                alt={reviews[currentReview].name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-primary-light"
              />
            </div>
            
            <h3 className="text-3xl font-semibold text-primary-dark mb-2">
              {reviews[currentReview].name}
            </h3>
            <p className="text-primary-main text-lg mb-4">
              {reviews[currentReview].role}
            </p>
            
            <div className="flex justify-center mb-4">
              {renderStars(reviews[currentReview].rating)}
            </div>
            
            <p className="text-gray-600 text-xl italic max-w-2xl mx-auto mb-8">
              "{reviews[currentReview].review}"
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
          <motion.button 
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/50 hover:bg-primary-light backdrop-blur-sm p-3 rounded-full shadow-md"
          >
            <ChevronLeft className="w-7 h-7 text-primary-main" />
          </motion.button>
          <motion.button 
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/50 hover:bg-primary-light backdrop-blur-sm p-3 rounded-full shadow-md"
          >
            <ChevronRight className="w-7 h-7 text-primary-main" />
          </motion.button>
        </div>
        
        <div className="flex justify-center mt-10 space-x-2">
          {reviews.map((_, index) => (
            <motion.button 
              key={index}
              onClick={() => setCurrentReview(index)}
              animate={{ 
                scale: index === currentReview ? 1.2 : 1,
                backgroundColor: index === currentReview ? theme.colors.primary.main : theme.colors.gray[300]
              }}
              className="w-3 h-3 rounded-full transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
    <div className="bg-gradient-to-br from-primary-light to-white px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className={`text-3xl md:text-5xl font-bold ${theme.typography.gradient} mb-2`}>
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Explore Learning Paths Tailored to Your Goals
            </p>
          </div>
        </div>
        <ReviewCarousel reviews={reviews} />
      </div>
    </div>
  );
};

export default HomeReviews;