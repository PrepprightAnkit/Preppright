import { motion } from 'framer-motion';
import {
  Book,
  ChevronRight,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';

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
          const approvedCourses = Array.isArray(data) 
            ? data.filter(course => course.isApproved).slice(0, 4) 
            : (data[0] && data[0].filter(course => course.isApproved).slice(0, 4)) || [];
          
          setCourses(approvedCourses);
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
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: `0 20px 25px -5px ${theme.colors.primary.main}25, 0 10px 10px -5px ${theme.colors.primary.main}15`,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
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
    <section className={`bg-gradient-to-br from-${theme.colors.primary.light} to-white min-h-auto py-16 px-4`}>
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          <div>
            <h2 className={`text-3xl md:text-5xl font-extrabold ${theme.typography.hero} ${theme.typography.gradient} mb-2 tracking-tight`}>
              Explore Our Courses
            </h2>
            <p className="text-xl text-gray-600 flex items-center">
              <TrendingUp className={`mr-2 text-${theme.colors.primary.main}`} size={24} />
              Transform Your Skills, Advance Your Career
            </p>
          </div>
          
          <Link to="/allCourse">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${theme.components.button.base} ${theme.components.button.primary} text-white px-6 py-3 rounded-full shadow-lg hover:bg-${theme.colors.primary.hover} transition-all font-semibold`}
            >
              View All Courses
              <ChevronRight className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className={`bg-${theme.colors.gray[200]} rounded-2xl h-96 w-full`}
              />
            ))}
          </div>
        )}

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
            {courses.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <Book className={`mx-auto mb-4 text-${theme.colors.primary.main}`} size={64} />
                <p className="text-xl">No approved courses available</p>
              </div>
            ) : (
              courses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={courseCardVariants}
                  whileHover="hover"
                  className={`bg-white border-2 border-${theme.colors.primary.light} rounded-2xl shadow-lg overflow-hidden transform transition-all group`}
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
                    <div className={`p-5 bg-${theme.colors.primary.light}`}>
                      <h3 className={`text-xl font-semibold text-${theme.colors.primary.dark} mb-2 line-clamp-1 group-hover:text-${theme.colors.primary.hover} transition-colors`}>
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.tagline}
                      </p>
                      <div className="flex flex-wrap justify-between items-center text-gray-600 mb-4">
                        <div className="flex items-center mr-2 mb-2">
                          <Clock className={`mr-2 text-${theme.colors.primary.main}`} size={16} />
                          <span className="text-sm">{course.duration} Months</span>
                        </div>
                        <div className="flex items-center mr-2 mb-2">
                          <TrendingUp className={`mr-2 text-${theme.colors.primary.main}`} size={16} />
                          <span className="text-sm">₹{course.totalCourseFee.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;