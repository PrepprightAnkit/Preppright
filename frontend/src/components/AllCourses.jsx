import { ArrowLeft, Award, Clock, Eye, Globe, Handshake, Phone, Send, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = {
  colors: {
    primary: {
      light: '#EEF2FF',
      main: '#4F46E5',
      dark: '#3730A3',
      gradient: 'from-indigo-600 to-indigo-800',
      hover: '#4338CA'
    },
    secondary: {
      light: '#BFDBFE',
      main: '#3B82F6',
      dark: '#1E40AF',
      hover: '#2563EB'
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      600: '#4B5563',
      800: '#1F2937'
    }
  }
};
const ContactFooter = () => {
    const googleFormUrl = "https://forms.gle/DMx8f1irRLF9vZM29";
  
    return (
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl font-bold text-${theme.colors.primary.main} mb-6`}>
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have a question or suggestion? We'd love to hear from you. 
              Fill out our quick contact form and we'll get back to you promptly.
            </p>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <Send className={`h-6 w-6 text-${theme.colors.primary.main}`} />
                <span>support@preppright.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`h-6 w-6 text-${theme.colors.primary.main}`} />
                <span>+91 9456183297</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a 
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center justify-center 
                       px-8 py-4 text-lg font-medium tracking-tighter 
                       text-white bg-gradient-to-r ${theme.colors.primary.gradient}
                       rounded-lg transition duration-300 
                       transform hover:-translate-y-1 hover:shadow-xl 
                       focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.main} 
                       focus:ring-offset-2`}
            >
              <span className="absolute inset-0 bg-indigo-700 opacity-50 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-70"></span>
              <span className="relative flex items-center space-x-3">
                <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                <span>Submit a Query</span>
              </span>
            </a>
          </div>
        </div>

  
          {/* Bottom Footer Line */}
          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Courses</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Success Stories</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Placement program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Cracking Interviews Training</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Engineering Program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Financial Modeling</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                <a href="https://www.youtube.com/@PreppRight" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186c-.273-1.03-1.078-1.836-2.113-2.112C19.585 3.5 12 3.5 12 3.5s-7.585 0-9.385.574c-1.035.276-1.84 1.081-2.113 2.112C.5 7.993.5 12 .5 12s0 4.007.502 5.814c.273 1.03 1.078 1.836 2.113 2.112C4.415 20.5 12 20.5 12 20.5s7.585 0 9.385-.574c1.035-.276 1.84-1.081 2.113-2.112.502-1.807.502-5.814.502-5.814s0-4.007-.502-5.814zM9.749 15.02v-6.04L15.25 12l-5.501 3.02z"/>
                  </svg>
                </a>
                  <a href="#" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/101203728/admin/dashboard/" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/careercrafter360?igsh=MXdvNml1N205M2x3YQ==" className="bg-indigo-100 p-3 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
              <p>© {new Date().getFullYear()} Preppright. All Rights Reserved.</p>
              <p className="mt-2">Designed with ❤️ for aspiring students</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
const AllCourses = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [categoriesData, coursesData] = await Promise.all([
        fetchCategories(),
        fetchAllCourses(),
      ]);
  
      setCategories(categoriesData || []); // Fallback to empty array if undefined
      setAllCourses(coursesData || []);   // Fallback to empty array if undefined
  
      if (categoriesData?.length > 0) {
        const defaultCategoryId = categoriesData[0]._id;
        setSelectedCategory(defaultCategoryId);
        filterCoursesByCategory(defaultCategoryId, coursesData);
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filterCoursesByCategory = (categoryId, courses = []) => {
    if (!courses || courses.length === 0) {
      console.warn("No courses available to filter");
      setFilteredCourses([]);
      return;
    }
    const filtered = courses.filter((course) => course.courseType === categoryId);
    setFilteredCourses(filtered);
  };
  

  const handleCategoryClick = (categoryId) => {
    // Find the selected category to get its title
    const selectedCat = categories.find(cat => cat._id === categoryId);
    
    if (selectedCat) {
      const categoryTitle = selectedCat.title.toLowerCase();
      
      // Special routing for Tech Lab and Job Orientation
      if (categoryTitle === 'tech lab') {
        navigate('/techlab');
        return;
      } else if (categoryTitle === 'job orientation') {
        navigate('/placements');
        return;
      }
    }

    // Default behavior for other categories
    setSelectedCategory(categoryId);
    filterCoursesByCategory(categoryId, allCourses);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`bg-gradient-to-r ${theme.colors.primary.gradient} text-white p-6 shadow-lg`}>
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center bg-opacity-20 bg-white hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded transition-colors`}
          >
            <ArrowLeft className="mr-2" /> Back
          </button>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold mb-2">
              Explore <span className="text-indigo-200">Professional</span> Courses
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl flex-grow flex flex-col md:flex-row gap-6 p-6">
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-6">
          <h2 className={`text-xl font-bold text-${theme.colors.primary.main} mb-4 flex items-center`}>
            Course Categories
          </h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`w-full p-3 rounded-lg transition-all ${
                  selectedCategory === category._id
                    ? `bg-gradient-to-r ${theme.colors.primary.gradient} text-white`
                    : `bg-${theme.colors.primary.light} text-${theme.colors.primary.main} hover:bg-${theme.colors.primary.hover} hover:text-black`
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-grow bg-white rounded-xl shadow-lg p-6">
          <h2 className={`text-xl font-bold text-${theme.colors.primary.main} mb-6`}>
            {loading ? "Loading Courses..." : "Available Courses"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={course.aboutImgUrl || "/api/placeholder/400/250"}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className={`absolute top-2 right-2 bg-${theme.colors.primary.main} text-white px-3 py-1 rounded-full text-sm`}>
                    {course.duration} Months
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className={`text-lg font-semibold text-${theme.colors.primary.main} mb-2`}>
                    {course.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {course.tagline}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/courses/${course._id}`)}
                      className={`flex items-center bg-gradient-to-r ${theme.colors.primary.gradient} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <Eye className="mr-2 w-4 h-4" /> View Course
                    </button>
                    <div className="flex items-center">
                      <span className="font-bold text-yellow-500">{course.rating}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-500">
              No courses available in this category.
            </div>
          )}
        </section>
      </main>
      <LearnerBenefits/>
      <ContactFooter/>
    </div>
  );
};

export default AllCourses;

/** Helper functions for API calls */
export const fetchCategories = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${apiUrl}/api/v1/users/cat`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.data;
};

export const fetchAllCourses = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(`${apiUrl}/api/v1/users/courses`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Courses fetched:", data); // Debug log
    return data|| []; // Return an empty array if `data.data` is undefined
  } catch (error) {
    console.error("Error fetching courses:", error);
    return []; // Return an empty array on failure
  }
};

const LearnerBenefits = () => {
  const benefits = [
    {
      title: "World Class Pedagogy",
      items: [
        "Learn from the World's Best Faculty & Industry Experts",
        "Learn with fun Hands-on Exercises & Assignments",
        "Participate in Hackathons & Group Activities"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-1.png",
      stats: [
        { icon: <Award />, text: "4.8/5 Rating" },
        { icon: <Users />, text: "Gamified Learning" }
      ]
    },
    {
      title: "Personalized Guidance with 24×7 Support",
      items: [
        "Dedicated Learning Managers",
        "24/7 Learning Support",
        "Network with Peers & Interact with Industry Leaders"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-2.png",
      stats: [
        { icon: <Clock />, text: "24 x 7 Support" },
        { icon: <Handshake />, text: "1:1 Mentorship" }
      ]
    },
    {
      title: "Career Assistance",
      items: [
        "Resume Building & Mock Interview Prep",
        "Exclusive access to IntelliPaat Job Portal",
        "400+ Hiring Partners"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-3.png",
      stats: [
        { icon: <TrendingUp />, text: "85,000 Career Transition" },
        { icon: <Globe />, text: "400+ Hiring Partners" }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className={`text-3xl font-bold text-center mb-12 bg-gradient-to-r ${theme.colors.primary.gradient} bg-clip-text text-transparent`}>
          Learner Benefits
        </h2>
        
        <div className="space-y-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="h-full flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-6 shadow-lg">
              <div className="w-full h-full flex justify-center items-center md:w-1/3">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="rounded-lg shadow-lg w-1/2"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className={`text-2xl font-semibold mb-4 text-${theme.colors.primary.main}`}>
                  {benefit.title}
                </h3>
                <ul className="space-y-3 mb-8">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`text-${theme.colors.primary.main} mt-1`}>•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-2 gap-4">
                  {benefit.stats.map((stat, idx) => (
                    <div key={idx} className={`bg-${theme.colors.primary.light} p-4 rounded-lg shadow flex flex-col items-center justify-center text-center`}>
                      <span className={`text-${theme.colors.primary.main} mb-2`}>
                        {stat.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{stat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};