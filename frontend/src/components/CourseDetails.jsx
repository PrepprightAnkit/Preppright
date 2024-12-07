import { BookOpen, DollarSign, Download, Home, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseReviews from './CourseReviews';
const PreviewLessonAccordion = ({ lesson, isExpanded, onToggle }) => {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div 
                onClick={onToggle}
                className="flex justify-between items-center p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
            >
                <span className="text-lg font-semibold text-blue-800">{lesson.title}</span>
                <span className="text-sm text-gray-600">Preview</span>
            </div>
            {isExpanded && (
                <div className="p-4">
                    <div className="relative w-full pt-[56.25%]">
                        <iframe
                            src={lesson.videoLink}
                            title="Lesson Preview"
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        This is a preview. Full lesson content available after purchase.
                    </div>
                </div>
            )}
        </div>
    );
};

const CourseDetails = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [category, setCategory] = useState(null);
    const [expandedLesson, setExpandedLesson] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // Fetch and Setup Functions
    useEffect(() => {
        const fetchData = async () => {
            await fetchCourseDetails();
        };
        fetchData();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/courses/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCourse(data.data);
                await fetchCategoryDetails(data.data.category);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const fetchCategoryDetails = async (categoryId) => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/cat/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                setCategory(data.data);
            }
        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    // Render Loading State
    if (!course || !category) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-blue-600 text-2xl font-semibold animate-pulse">
                    Loading Course Details...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Navigation */}
            <nav className="bg-white shadow-lg sticky top-0 z-50 px-6 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="text-blue-600" />
                        <span className="text-xl font-semibold text-blue-800">{category.title} / {course.title}</span>
                    </div>
                    <Link 
                        to="/" 
                        className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full transition-colors"
                    >
                        <Home className="mr-2" /> Home
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
                {/* Course Overview */}
                <div className="md:col-span-2 space-y-6">
                    {/* Intro Video */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="h-96">
                            <iframe
                                src={course.introVideo}
                                title="Course Intro Video"
                                className="w-full h-full"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl font-semibold text-blue-800 mb-4">{course.title}</h2>
                            <p className="text-gray-600">{course.description}</p>
                        </div>
                    </div>

                    {/* Free Resources */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                            <Video className="mr-3 text-green-600" /> Free Resources
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Free Video</h4>
                                <iframe
                                    src={course.freeVideo.replace("watch?v=", "embed/")}
                                    title="Free Video"
                                    className="w-full rounded-lg"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Free Notes</h4>
                                <a 
                                    href={course.freeNotes} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Download className="mr-2" /> Download Free Notes
                                </a>
                            </div>
                        </div>
                        <CourseReviews />
                    </div>

                    {/* Preview Lessons */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Course Lessons Preview</h3>
                        <div className="space-y-4">
                            {course.lessons.slice(0, 3).map((lesson) => (
                                <PreviewLessonAccordion
                                    key={lesson._id} 
                                    lesson={lesson}
                                    isExpanded={expandedLesson === lesson._id}
                                    onToggle={() => setExpandedLesson(
                                        expandedLesson === lesson._id ? null : lesson._id
                                    )}
                                />
                            ))}
                            {course.lessons.length > 3 && (
                                <div className="text-center text-gray-600 mt-4">
                                    More lessons available after course purchase
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img 
                            src={course.courseImage} 
                            alt={course.title} 
                            className="w-full rounded-lg mb-4"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <DollarSign className="mr-2 text-green-600" />
                                <span className="text-xl font-semibold text-gray-800">${course.price}</span>
                            </div>
                            <button 
                                onClick={() => setShowPaymentForm(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {showPaymentForm && (
                        <PaymentForm 
                            course={course} 
                            onClose={() => setShowPaymentForm(false)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper components for lesson preview and payment form

export default CourseDetails;
