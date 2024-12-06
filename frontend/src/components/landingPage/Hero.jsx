import { motion } from 'framer-motion';
import {
  Book,
  ChevronRight,
  ClipboardList,
  FileText,
  Menu,
  Upload,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = ({ companiesHero, heroBg }) => {
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    categoriesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const adminLinks = [
    { 
      to: "/Quiz", 
      icon: <ClipboardList className="mr-2" />, 
      label: "Create Quiz" 
    },
    { 
      to: "/uploadCat", 
      icon: <Book className="mr-2" />, 
      label: "Upload Category" 
    },
    { 
      to: "/uploadCourse", 
      icon: <Upload className="mr-2" />, 
      label: "Upload Course" 
    },
    { 
      to: "/approveCourse", 
      icon: <FileText className="mr-2" />, 
      label: "Approve Course" 
    },
    { 
      to: "/certificate", 
      icon: <FileText className="mr-2" />, 
      label: "Certificates" 
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Main Hero Section */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Investing in <span className="text-blue-600">Knowledge</span> 
            <br />and Your Future
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            An inclusive online education platform designed for learners of all backgrounds. 
            Accessible, flexible, and adaptable learning experiences tailored to your unique journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCategories}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
            >
              Get Started
              <ChevronRight className="ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image - Now visible on mobile and desktop */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center"
        >
          <img 
            src={heroBg}
            alt="Learning Journey" 
            className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>

      {/* Companies Section */}
      <div className="container mx-auto px-4 mt-8 flex items-center justify-center">
        <img 
          src={companiesHero} 
          alt="Partnering Companies" 
          className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Mobile Admin Menu Toggle */}
      {user?.isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.button>

          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 bottom-full mb-4 bg-white shadow-2xl rounded-xl overflow-hidden w-64"
            >
              {adminLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="flex items-center p-3 hover:bg-blue-50 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Hero;