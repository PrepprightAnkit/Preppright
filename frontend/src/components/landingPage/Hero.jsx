import { motion } from 'framer-motion';
import { Book, ChevronLeft, ChevronRight, ClipboardList, FileText, Menu, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme';

const slides = [
  {
    title: "Unlock unlimited live classes",
    subtitle: "for your workforce",
    heading: "Explore PreppRight ",
    stats: [
      { number: "700+", text: "Live classes monthly" },
      { number: "550+", text: "Learning solutions" },
      { number: "100+", text: "Hands-on projects with labs" }
    ],
    buttonText: "Learn More",
    images: ["https://img.freepik.com/free-photo/young-woman-studying-library-using-laptop_23-2149215402.jpg"]
  },
  {
    title: "All our top programs include",
    subtitle: "Generative AI Components",
    heading: "Be a leader in your field",
    subheading: "Change, Adapt and Build with AI",
    buttonText: "Explore Programs",
    icons: true,
    images: ["https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg"]
  },
  {
    title: "Get Certified. Get Ahead",
    subtitle: "Of the Industry",
    heading: "Grow with PreppRight",
    stats: [
      { number: "5,000,000", text: "Careers advanced" },
      { number: "1,500", text: "Live classes every month" },
      { number: "85%", text: "Report career benefits" }
    ],
    buttonText: "Explore Programs",
    images: ["https://img.freepik.com/free-photo/man-studying-library_23-2149215397.jpg"]
  }
];

const adminLinks = [
  { to: "/Quiz", icon: <ClipboardList className="mr-2" />, label: "Create Quiz" },
  { to: "/uploadCat", icon: <Book className="mr-2" />, label: "Upload Category" },
  { to: "/uploadCourse", icon: <Upload className="mr-2" />, label: "Upload Course" },
  { to: "/approveCourse", icon: <FileText className="mr-2" />, label: "Approve Course" },
  { to: "/certificate", icon: <FileText className="mr-2" />, label: "Certificates" }
];

const CarouselIndicator = ({ active, onClick }) => (
  <button
    className={`h-2 rounded-full mx-1 transition-all duration-300 ${
      active ? `bg-${theme.colors.primary.main} w-4` : 'bg-gray-300 w-2'
    }`}
    onClick={onClick}
  />
);

const CarouselButton = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 -mx-20 ${theme.components.card.base} p-2 hover:bg-white transition-all duration-300`}
      style={{ [direction]: '1rem' }}
    >
      <Icon size={24} className={`text-${theme.colors.primary.main}`} />
    </button>
  );
};

const Hero = ({ companiesHero }) => {
  const { user } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const slide = slides[currentSlide];

  return (
    <div className={`relative h-screen bg-gradient-to-b ${theme.colors.gray[50]} overflow-hidden`}>
      <div 
        className="relative max-w-7xl mx-auto h-auto flex items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="w-full md:h-screen px-8 md:px-16 flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
            <div className="space-y-2">
              <h1 className={`${theme.typography.hero} ${theme.typography.gradient}`}>
                {slide.title}
              </h1>
              {slide.subtitle && (
                <h2 className={theme.typography.heading}>
                  {slide.subtitle}
                </h2>
              )}
            </div>

            {slide.heading && (
              <h3 className={theme.typography.subheading}>
                {slide.heading}
              </h3>
            )}

            {slide.stats && (
              <div className="space-y-4">
                {slide.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className={`text-xl font-bold text-${theme.colors.primary.main}`}>
                      {stat.number}
                    </span>
                    <span className={theme.typography.body}>{stat.text}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={()=>{navigate("/allCourses")}} className={`${theme.components.button.base} ${theme.components.button.primary}`}>
              {slide.buttonText}
            </button>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {slide.images.map((img, index) => (
              <div key={index} className={`rounded-lg overflow-hidden ${index === 0 ? 'col-span-2' : ''}`}>
                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <CarouselButton direction="left" onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)} />
        <CarouselButton direction="right" onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)} />

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

      <div className={`${theme.spacing.container} mt-8 flex items-center justify-center`}>
        <img 
          src={companiesHero} 
          alt="Partnering Companies" 
          className="max-w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>

      {user?.isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`${theme.components.button.base} ${theme.components.button.primary} p-4 rounded-full`}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.button>

          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute right-0 bottom-full mb-4 ${theme.components.card.base} w-64`}
            >
              {adminLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className={`flex items-center p-3 hover:bg-${theme.colors.primary.light} transition-colors`}
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