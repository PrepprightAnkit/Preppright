import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import c1 from './assets/c1.png';
import c2 from './assets/c2.png';
import c3 from './assets/c3.png';
import { Slide, Fade } from 'react-awesome-reveal';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${apiUrl}/api/v1/users/courses`);
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
      <div className="w-full flex justify-between items-center mb-8">
        <Slide>
          <div className="flex flex-col">
            <h2 className="text-5xl font-bold text-blue-700">POPULAR COURSES!</h2>
            <h2 className="text-2xl ml-2 mt-2 font-light text-gray-800">Explore our Top Courses</h2>
          </div>
          <Link to="/allCourse">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              View All Courses
            </button>
          </Link>
        </Slide>
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link to={`/courses/${course._id}`} key={course._id} className="text-white px-4 py-2 rounded-md">
              <div className="bg-white shadow-md rounded-lg border-blue-700 overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300 group">
                <Fade cascade>
                  <div className="relative">
                    <img
                      src={course.courseImage}
                      alt={course.title}
                      className="w-full h-48 hover:h-auto object-cover"
                    />
                  </div>
                  <div className="p-4 bg-blue-50">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-1 hover:line-clamp-none">
                      {course.title}
                    </h3>
                    <p className="text-gray-700 mb-2 line-clamp-3 hover:line-clamp-none">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img src={c1} alt="Book" className="w-6 h-6 mr-2" />
                        <span className="text-gray-600">{course.lessons.length}</span>
                      </div>
                      <div className="flex items-center">
                        <img src={c2} alt="Icon 2" className="w-6 h-6 mr-2" />
                        <span className="text-gray-600">23</span>
                      </div>
                      <div className="flex items-center">
                        <img src={c3} alt="Icon 3" className="w-6 h-6 mr-2" />
                        <span className="text-gray-600">{course.level}</span>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No courses available</div>
      )}
    </section>
  );
};

export default Courses;
