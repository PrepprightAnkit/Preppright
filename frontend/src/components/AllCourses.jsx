import { ArrowLeft, Eye, Send } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ContactFooter = () => {
    const googleFormUrl = "https://forms.gle/DMx8f1irRLF9vZM29";
  
    return (
      <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have a question, suggestion, or just want to say hello? 
                We'd love to hear from you. Fill out our quick contact form 
                and we'll get back to you as soon as possible.
              </p>
              
              {/* Contact Details */}
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@preppright.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>+91 9456183297</span>
                </div>
              </div>
            </div>
  
            {/* Contact Button */}
            <div className="flex justify-center">
              <a 
                href={googleFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center 
                           px-8 py-4 text-lg font-medium tracking-tighter 
                           text-white bg-blue-600 rounded-lg 
                           hover:bg-blue-700 transition duration-300 
                           transform hover:-translate-y-1 hover:shadow-xl 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2"
              >
                <span className="absolute inset-0 bg-blue-700 opacity-50 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-70"></span>
                <span className="relative flex items-center space-x-3">
                  <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                  <span>Submit a Query</span>
                </span>
              </a>
            </div>
          </div>
  
          {/* Bottom Footer Line */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
            © {new Date().getFullYear()} Preppright. All Rights Reserved.
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
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0 transition-colors"
          >
            <ArrowLeft className="mr-2" /> Back
          </button>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold mb-2">
              Explore <span className="text-yellow-300">Professional</span> Courses
            </h1>
            <p className="text-sm opacity-90">
              Unlock your potential with our comprehensive IT and tech training programs
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl flex flex-grow flex-col md:flex-row mt-8 space-x-0 md:space-x-6">
        {/* Sidebar - Categories */}
        <aside className="className=w-full md:w-64 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <span className="mr-2">📂</span> Course Categories
          </h2>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedCategory === category._id
                    ? "bg-blue-500 text-white border-transparent shadow-md"
                    : "bg-gray-100 text-blue-800 hover:bg-blue-100 hover:shadow-sm"
                }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Courses List */}
        <section className="flex-grow bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
            <span className="mr-2">🎓</span> 
            {loading ? "Loading Courses..." : "Available Courses"}
          </h2>
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={course.aboutImgUrl || "/api/placeholder/400/250"}
                      alt={course.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      {course.duration} Months
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-blue-800 mb-2 truncate">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {course.tagline}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        className="flex items-center text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded transition-colors"
                        onClick={() => handleCourseClick(course._id)}
                      >
                        <Eye className="mr-2 w-4 h-4" /> View Course
                      </button>
                      <div className="flex items-center text-blue-500">
                        <span className="font-bold mr-1">{course.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No courses available in this category.</p>
            </div>
          )}
        </section>
      </main>
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
