import { motion } from 'framer-motion';
import {
  BarChart,
  Book,
  ChevronRight,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiUrl}/api/v1/users/courses`);
        
        if (response.ok) {
          const data = await response.json();
          // Use data directly if it's an array, or data[0] if it's a document-like response
          setCourses(Array.isArray(data) ? data : (data[0] || []));
        } else {
          console.error('Failed to fetch courses');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const courseCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={index < Math.floor(rating) ? '#FFC107' : 'none'}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">
              Explore Our Courses
            </h2>
            <p className="text-xl text-gray-600">
              Transform Your Skills, Advance Your Career
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="bg-gray-200 rounded-xl h-96 w-full"
              />
            ))}
          </div>
        )}

        {/* Courses Grid */}
        {!isLoading && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {!courses ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <Book className="mx-auto mb-4 text-blue-400" size={64} />
                <p className="text-xl">No courses available</p>
              </div>
            ) : (
              courses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all"
                >
                  <Link to={`/courses/${course._id}`}>
                    <div className="relative">
                      <img
                        src={course.aboutImgUrl}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 flex items-center">
                        {renderStarRating(course.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          ({course.rating.toFixed(1)})
                        </span>
                      </div>
                    </div>
                    <div className="p-5 bg-blue-50">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.tagline}
                      </p>
                      
                      <div className="flex flex-wrap justify-between items-center text-gray-600 mb-4">
                        <div className="flex items-center mr-2 mb-2">
                          <Clock className="mr-2 text-blue-500" size={16} />
                          <span className="text-sm">{course.duration}</span>
                        </div>
                        <div className="flex items-center mr-2 mb-2">
                          <BarChart className="mr-2 text-blue-500" size={16} />
                          <span className="text-sm">{course.courseType}</span>
                        </div>
                        <div className="flex items-center mr-2 mb-2">
                          <TrendingUp className="mr-2 text-blue-500" size={16} />
                          <span className="text-sm">₹{course.totalCourseFee.toLocaleString()}</span>
                        </div>
                      </div>

                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-center flex items-center justify-center"
                      >
                        View Course Details
                        <ChevronRight className="ml-2" size={16} />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;