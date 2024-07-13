import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetchCourseDetails();
    }, []);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/courses/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCourse(data.data);
            } else {
                console.error('Failed to fetch course details');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    if (!course) {
        return <div className="text-center text-xl text-white">Loading...</div>;
    }

    return (
        <section className="bg-gradient-to-r from-blue-700 via-green-700 to-blue-700 min-h-screen p-8">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-4">
                <div className="lg:w-3/5 bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-4xl font-bold text-blue-700 mb-4">{course.name}</h2>
                    <img src={course.image} alt={course.name} className="w-full h-64 object-cover mb-4 rounded-lg shadow-lg" />
                    <p className="text-gray-700 text-lg mb-4">{course.description}</p>
                    <p className="text-gray-500 text-base mb-4">{course.detailedDescription}</p>
                    <div className="mb-4">
                        <span className="text-gray-600 text-lg">Price: ${course.price}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-gray-600 text-lg">Number of Lessons: {course.numberOfLessons}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-gray-600 text-lg">Category: {course.category.title}</span>
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
                <div className="lg:w-2/5 bg-white shadow-md rounded-lg p-4 lg:sticky lg:top-8 lg:h-auto">
                    <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">{course.name}</h3>
                    <video controls className="w-full mb-4 rounded-lg shadow-lg">
                        <source src={course.freeVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <p className="text-gray-700 text-lg mb-2">{course.description}</p>
                    <p className="text-gray-600 text-base mb-2">Category: {course.category.title}</p>
                    <p className="text-gray-600 text-base mb-2">Price: ${course.price}</p>
                    <p className="text-gray-600 text-base mb-2">Number of Lessons: {course.numberOfLessons}</p>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
