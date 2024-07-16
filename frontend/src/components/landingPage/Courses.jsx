import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/courses');
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Courses</h2>
        {/* You can add a link to all courses here if needed */}
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map(course => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-lg border border-blue-700 overflow-hidden"
            >
              <div className="relative p-3 border-xl rounded-2xl border-3 border-blue-700">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-700 text-white px-2 py-1 m-2 rounded-md">
                  {course.level}
                </div>
              </div>
              <div className="p-4 bg-blue-50">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {course.name}
                </h3>
                <p className="text-gray-700 mb-2">{course.description}</p>
                {/* <p className="text-gray-500 mb-4">{course.detailedDescription}</p> */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-gray-600">Price: ${course.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      Number of Lessons: {course.numberOfLessons}
                    </span>
                  </div>
                </div>
                <Link to={`/courses/${course._id}`} className="bg-blue-700 text-white px-4 py-2 rounded-md">
                  View More
                </Link>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No courses available</div>
      )}
    </section>
  );
};

export default Courses;