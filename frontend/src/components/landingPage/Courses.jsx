import React from 'react';
import { Link } from 'react-router-dom';
import courseImage from './assets/course.png.jpg'; // Import your course image

const courses = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  title: `Course ${index + 1}`,
  description: 'This is a brief description of the course.',
  price: `$${(index + 1) * 10}.00`,
}));

const Courses = () => {
  return (
    <section className="bg-white min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Courses</h2>
        <Link to="/courses">
          <button className="bg-blue-700 text-white py-2 px-4 rounded">
            All Courses
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={courseImage}
              alt={course.title}
              className="h-3/5 w-full object-cover"
            />
            <div className="flex flex-col justify-between h-2/5 p-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-700">{course.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-700 text-white py-1 px-2 rounded">
                  Explore Course
                </button>
                <span className="text-black font-bold">{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
