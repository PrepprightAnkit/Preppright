import { ArrowLeft, Eye } from 'lucide-react';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <aside className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
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
