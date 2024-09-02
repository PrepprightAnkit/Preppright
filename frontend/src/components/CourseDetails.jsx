import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [category, setCategory] = useState(null);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCourseDetails();
        }
    }, [isAuthenticated, id]);

    useEffect(() => {
        if (course) {
            const savedProgress = JSON.parse(localStorage.getItem(`progress-${course._id}`)) || [];
            setCompletedLessons(savedProgress);
        }
    }, [course]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/courses/${id}`);
            if (response.ok) {
                const data = await response.json();
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

    const toggleLessonCompletion = async (lessonId) => {
        let updatedLessons = [];
        if (completedLessons.includes(lessonId)) {
            updatedLessons = completedLessons.filter(id => id !== lessonId);
        } else {
            updatedLessons = [...completedLessons, lessonId];
        }
        setCompletedLessons(updatedLessons);
        localStorage.setItem(`progress-${course._id}`, JSON.stringify(updatedLessons));

        // Post the progress update to the backend
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Include JWT token if required
                },
                body: JSON.stringify({
                    userId: user._id,
                    courseId: course._id,
                    lessonId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update progress');
            }

            const data = await response.json();
            console.log('Progress updated:', data);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const getProgressPercentage = () => {
        return Math.round((completedLessons.length / course.lessons.length) * 100);
    };

    const [expandedLesson, setExpandedLesson] = useState(null);

    const toggleLesson = (lessonId) => {
        setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 border-2 border-gray-300 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login to View Course Details</h2>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (!course || !category) {
        return <div className="text-center text-xl text-white">Loading...</div>;
    }

    return (
        <section className="bg-gradient-to-r from-blue-300 to-blue-700 p-8 min-h-screen">
            {/* Progress Bar */}
            <div className="bg-white p-2 mb-6 rounded-lg shadow-lg">
                <div className="relative w-full h-6 bg-gray-200 rounded-full">
                    <div
                        className="absolute top-0 left-0 h-6 bg-green-600 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                </div>
                <p className="text-center text-sm font-semibold mt-2 text-green-700">
                    {getProgressPercentage()}% of Lessons Completed
                </p>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">{category.title} / {course.title}</h1>
                </div>
                <div>
                    <Link to="/" className="bg-white text-blue-700 font-bold py-2 px-4 rounded-lg shadow-lg">
                        Home
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-9/12 bg-white shadow-md rounded-lg p-8 flex flex-col items-center">
                    <div className="bg-blue-700 h-96 w-full flex justify-center items-center py-8">
                        {/* Intro Video in Iframe */}
                        <div className="relative h-full w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                            <iframe
                                src={course.introVideo}
                                title="Course Intro Video"
                                className="w-full h-full rounded-lg shadow-lg"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="bg-white w-full py-4 px-8">
                        <h2 className="text-4xl font-bold text-blue-700 mb-4">{course.title}</h2>
                        <p className="text-gray-700 text-lg mb-4">{course.description}</p>
                        <p className="text-gray-500 text-base mb-4">{course.detailedDescription}</p>
                    </div>
                </div>

                <div className="w-full lg:w-3/12">
                    <div className="bg-white shadow-md rounded-lg p-4 sticky top-8">
                        <img src={course.courseImage} alt={course.title} className="w-full h-auto mb-4 rounded-lg shadow-lg" />
                        <div className="mb-4 text-center">
                            <span className="text-gray-600 text-lg">Price: ${course.price}</span>
                        </div>
                        <div className="text-center mt-4">
                            <button className="bg-green-700 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-lg">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                        <h3 className="text-3xl font-semibold text-green-700 mb-4">Free Video and Notes</h3>
                        <div className="mb-8">
                            <h4 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Free Video</h4>
                            <div className="bg-blue-700 w-full h-full flex justify-center items-center py-8">
                                {/* Free Video in Iframe */}
                                <div className="h-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                                    <iframe
                                        src={course.freeVideo.replace("watch?v=", "embed/")}
                                        title="Free Video"
                                        className="w-full h-full rounded-lg shadow-lg"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
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

            <div className="bg-white shadow-md rounded-lg p-8 mt-8">
                <h3 className="text-3xl font-bold text-blue-700 mb-4">Course Lessons</h3>
                <div className="space-y-4">
                    {course.lessons.map((lesson) => (
                        <div key={lesson._id} className="border-b pb-4">
                            <div
                                className="bg-blue-100 p-4 rounded-lg cursor-pointer flex justify-between items-center"
                                onClick={() => toggleLesson(lesson._id)}
                            >
                                <h4 className="text-xl font-semibold text-blue-700">{lesson.title}</h4>
                                <input
                                    type="checkbox"
                                    checked={completedLessons.includes(lesson._id)}
                                    onChange={() => toggleLessonCompletion(lesson._id)}
                                    className="form-checkbox h-5 w-5 text-green-600"
                                />
                            </div>
                            {expandedLesson === lesson._id && (
                                <div className="mt-4">
                                    <video controls className="w-full rounded-lg shadow-lg">
                                        <source src={lesson.videoLink} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="mt-2">
                                        <a href={lesson.notes} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
                                            Download Lesson Notes
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
