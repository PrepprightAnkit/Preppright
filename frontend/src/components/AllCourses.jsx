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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0"
          >
            Back
          </button>
          <h1 className="text-3xl font-extrabold text-center md:text-left md:ml-10">
            Explore <span className="text-yellow-300">Our Best</span> IT and Computer Science Courses
          </h1>
          <p className="text-sm text-center md:text-left opacity-90 mt-2 md:mt-0 md:ml-5">
            Whether you're looking to land your first IT job, advance your career, or explore a new tech domain, our best sellers are a great place to start.
          </p>
        </div>
      </header>

      <main className="container mx-auto flex flex-grow flex-col md:flex-row mt-8">
        {/* Sidebar - Categories */}
        <aside className="w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:mr-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Categories</h2>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                  selectedCategory === category._id
                    ? "bg-blue-500 text-white border-transparent"
                    : "bg-gray-100 text-blue-800 hover:bg-blue-100"
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
          <h2 className="text-xl font-bold text-blue-800 mb-6">
            {loading ? "Loading Courses..." : "Courses"}
          </h2>
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-50 border rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                >
                  <img
                    src={course.courseImage}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold text-blue-800 mb-2 truncate">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
                        onClick={() => handleCourseClick(course._id)}
                      >
                        View Course
                      </button>
                      <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4">
                        Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No courses available for this category.</p>
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
  const response = await fetch(`${apiUrl}/api/v1/users/courses`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await response.json();
  return data.data;
};