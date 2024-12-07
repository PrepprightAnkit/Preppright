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
      setCategories(categoriesData);
      setAllCourses(coursesData);

      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0]._id);
        filterCoursesByCategory(categoriesData[0]._id, coursesData);
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCoursesByCategory = (categoryId, courses) => {
    const filtered = courses.filter((course) => course.category === categoryId);
    setFilteredCourses(filtered);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    filterCoursesByCategory(categoryId, allCourses);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">All Courses</h1>
          <p className="text-sm">Browse through our diverse range of courses and pick your favorite.</p>
        </div>
        <div></div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Sidebar - Categories */}
        <div className="w-full md:w-1/4 bg-blue-100 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-blue-800 mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  selectedCategory === category._id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-800 hover:bg-blue-200"
                }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel - Courses */}
        <div className="w-full md:w-3/4 p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            {loading ? "Loading Courses..." : "Courses"}
          </h2>
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow rounded p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCourseClick(course._id)}
                >
                  <img
                    src={course.courseImage}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="text-md font-semibold text-blue-800 mb-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No courses available for this category.</p>
          )}
        </div>
      </div>
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
  console.log("Fetched categories:", data);
  return data.data;
};

export const fetchAllCourses = async () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${apiUrl}/api/v1/users/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await response.json();
  console.log("Fetched courses:", data);
  return data.data;
};