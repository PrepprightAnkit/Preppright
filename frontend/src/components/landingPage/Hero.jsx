import { motion } from 'framer-motion';
import {
  Book,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Menu,
  Upload,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
      <LearningCarousel/>

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


const slides = [
  {
    title: "Unlock unlimited live classes",
    subtitle: "for your workforce",
    heading: "Explore Simplilearn Learning Hub+",
    stats: [
      { number: "700+", text: "Live classes monthly" },
      { number: "550+", text: "Learning solutions" },
      { number: "100+", text: "Hands-on projects with labs" }
    ],
    buttonText: "Learn More",
    images: [
      "https://img.freepik.com/free-photo/young-woman-studying-library-using-laptop_23-2149215402.jpg",
    ]
  },
  {
    title: "All our top programs include",
    subtitle: "Generative AI Components",
    heading: "Be a leader in your field",
    subheading: "Change, Adapt and Build with AI",
    buttonText: "Explore Programs",
    icons: true,
    images: [
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg",
      
    ]
  },
  {
    title: "Get Certified.",
    subtitle: "Get Ahead.",
    stats: [
      { number: "5,000,000", text: "Careers advanced" },
      { number: "1,500", text: "Live classes every month" },
      { number: "85%", text: "Report career benefits including promotions or a new job" }
    ],
    buttonText: "Explore Programs",
    images: [
      // "https://img.freepik.com/free-photo/woman-working-laptop_23-2149225634.jpg",
      "https://img.freepik.com/free-photo/man-studying-library_23-2149215397.jpg",
      // "https://img.freepik.com/free-photo/focused-woman-working-laptop_23-2149225636.jpg"
    ]
  }
];

const CarouselIndicator = ({ active, onClick }) => (
  <button
    className={`h-2 w-2 rounded-full mx-1 transition-all duration-300 ${
      active ? 'bg-blue-500 w-4' : 'bg-gray-300'
    }`}
    onClick={onClick}
  />
);

const CarouselButton = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 -mx-20 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300"
      style={{ [direction]: '1rem' }}
    >
      <Icon size={24} className="text-gray-600" />
    </button>
  );
};

const LearningCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = slides[currentSlide];

  return (
    <div 
      className="relative max-w-7xl mx-auto h-auto flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {slide.subtitle}
              </h2>
            )}
          </div>

          {slide.heading && (
            <h3 className="text-2xl font-semibold text-gray-700">
              {slide.heading}
            </h3>
          )}

          {slide.subheading && (
            <p className="text-xl text-blue-600 font-medium">
              {slide.subheading}
            </p>
          )}

          {slide.stats && (
            <div className="space-y-4">
              {slide.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xl font-bold">{stat.number}</span>
                  <span className="text-gray-600">{stat.text}</span>
                </div>
              ))}
            </div>
          )}

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
            {slide.buttonText}
          </button>
        </div>

        {/* Right Content - Images Grid */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          {slide.images.map((img, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden ${
                index === 0 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={img}
                alt={`Slide ${currentSlide + 1} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
        </div>
      </div>

      {/* Navigation */}
      <CarouselButton direction="left" onClick={prevSlide} />
      <CarouselButton direction="right" onClick={nextSlide} />

      {/* Indicators */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <CarouselIndicator
            key={index}
            active={currentSlide === index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

