import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/courses/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCourse(data.data);
                fetchCategoryDetails(data.data.category);
            } else {
                console.error('Failed to fetch course details');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const fetchCategoryDetails = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/cat/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                setCategory(data.data);
            } else {
                console.error('Failed to fetch category details');
            }
        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    if (!course || !category) {
        return <div className="text-center text-xl text-white">Loading...</div>;
    }

    return (
        <section className="bg-gradient-to-r from-blue-300 to-blue-700 p-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">{category.title} / {course.name}</h1>
                </div>
                <div>
                    <Link to="/" className="bg-white text-blue-700 font-bold py-2 px-4 rounded-lg shadow-lg">
                        Home
                    </Link>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-8/12 bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-4xl font-bold text-blue-700 mb-4">{course.name}</h2>
                    <div className='flex flex-col items-center justify-center w-full '>
                        <img src={course.image} alt={course.name} className=" w-1/2 h-auto  mb-4 rounded-lg shadow-lg" />
                    </div>
                    <p className="text-gray-700 text-lg mb-4">{course.description}</p>
                    <p className="text-gray-500 text-base mb-4">{course.detailedDescription}</p>
                    <div className="mb-4">
                        <span className="text-gray-600 text-lg">Number of Lessons: {course.numberOfLessons}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-gray-600 text-lg">Category: {category.title}</span>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-3xl font-semibold text-green-700 mb-4">Free Video and Notes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-2xl font-semibold text-blue-700 mb-2">Free Video</h4>
                                <video controls className="w-full rounded-lg shadow-lg">
                                    <source src={course.freeVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div>
                                <h4 className="text-2xl font-semibold text-blue-700 mb-2">Free Notes</h4>
                                <a href={course.freeNotes} target="_blank" rel="noopener noreferrer" className="text-green-700 underline text-lg">
                                    Download Free Notes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12">
                    <div className="bg-white shadow-md rounded-lg p-4 lg:sticky lg:top-8">
                        <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">{course.name}</h3>
                        <video controls className="w-full mb-4 rounded-lg shadow-lg">
                            <source src={course.introVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="mb-4 text-center">
                            <span className="text-gray-600 text-lg">Price: ${course.price}</span>
                        </div>
                        <div className="mb-4 text-center">
                            <span className="text-gray-600 text-lg">Level: {course.level}</span>
                        </div>
                        <div className="text-center mt-4">
                            <button className="bg-green-700 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-lg">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
