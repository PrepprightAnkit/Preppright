import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    fetch(`${apiUrl}/api/v1/users/cat`, { method: 'get' })
      .then(response => response.json())
      .then(data => {
        const mappedCategories = data.data.map(category => ({
          imageUrl: category.image,
          name: category.title,
          description: category.description,
        })).slice(0, 4);
        setCategories(mappedCategories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  const cardVariants = {
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

  return (
    <section className={`bg-gradient-to-br from-${theme.colors.primary.light} to-white min-h-auto py-16 px-4`}>
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          <div>
          <h2 className={`text-3xl md:text-5xl font-extrabold overflow-visible ${theme.typography.hero} ${theme.typography.gradient} mb-2 tracking-tight`}>
  Top Categories
</h2>

            <p className="text-xl text-gray-600 flex items-center">
              <TrendingUp className={`mr-2 text-${theme.colors.primary.main}`} size={24} />
              Explore Learning Paths Tailored to Your Goals
            </p>
          </div>
          
          <Link to="/allCourse">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center ${theme.components.button.base} ${theme.components.button.primary} text-white px-6 py-3 rounded-full shadow-lg hover:bg-${theme.colors.primary.hover} transition-all font-semibold`}
            >
              View All Categories
              <ChevronRight className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className={`bg-${theme.colors.gray[200]} rounded-2xl h-80 w-full`}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {categories.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <BookOpen className={`mx-auto mb-4 text-${theme.colors.primary.main}`} size={64} />
                <p className="text-xl">No categories available</p>
              </div>
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`bg-white border-2 border-${theme.colors.primary.light} rounded-2xl shadow-lg overflow-hidden transform transition-all group`}
                >
                  <div className="relative p-6 text-center h-full flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${theme.colors.primary.light} to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-0`}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {category.imageUrl ? (
                        <motion.img 
                          src={category.imageUrl} 
                          alt={category.name} 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className={`mx-auto h-32 w-32 mb-6 object-contain rounded-full border-4 border-${theme.colors.primary.light} shadow-md group-hover:scale-105 transition-transform`}
                        />
                      ) : (
                        <div className={`h-32 w-32 mx-auto mb-6 bg-${theme.colors.primary.light} rounded-full flex items-center justify-center`}>
                          <BookOpen className={`text-${theme.colors.primary.main}`} size={48} />
                        </div>
                      )}
                      
                      <h3 className={`text-2xl font-bold text-${theme.colors.primary.dark} mb-3 group-hover:text-${theme.colors.primary.hover} transition-colors`}>
                        {category.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {category.description}
                      </p>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-auto"
                      >
                        <Link to={`/allCourse`}>
                          <button className={`w-full bg-${theme.colors.primary.gradient} text-${theme.colors.primary.gradient} font-semibold py-2 rounded-full`}>
                            Explore Category
                          </button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Categories;