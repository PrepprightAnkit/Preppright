import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
        }));
        setCategories(mappedCategories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">
              Top Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore Learning Paths Tailored to Your Goals
            </p>
          </div>
          
          <Link to="/allCat">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
              View All Categories
              <ChevronRight className="ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="bg-gray-200 rounded-xl h-64 w-full"
              />
            ))}
          </div>
        )}

        {/* Categories Grid */}
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
                <BookOpen className="mx-auto mb-4 text-blue-400" size={64} />
                <p className="text-xl">No categories available</p>
              </div>
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white border-2 border-blue-100 rounded-xl shadow-lg overflow-hidden transform transition-all"
                >
                  <div className="p-6 text-center">
                    {category.imageUrl && (
                      <img 
                        src={category.imageUrl} 
                        alt={category.name} 
                        className="mx-auto h-24 w-24 mb-4 object-contain"
                      />
                    )}
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {category.description}
                    </p>
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