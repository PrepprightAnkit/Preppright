import {
    BookOpen,
    CheckCircle,
    DollarSign,
    Download,
    Home,
    Video
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const CourseDetails = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [category, setCategory] = useState(null);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [purchased, setPurchased] = useState(false);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [expandedLesson, setExpandedLesson] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // Authentication and Course Purchase Logic
    let userHasCourse = isAuthenticated && user.coursesTaken.some(
        courseTaken => courseTaken.course === course?._id
    );

    // Fetch and Setup Functions
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                await fetchCourseDetails();
            }
        };
        fetchData();
    }, [isAuthenticated, id]);

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
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-2xl text-center space-y-6 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">Please log in to view course details</p>
                    <Link 
                        to="/login" 
                        className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                        Login to Continue
                    </Link>
                </div>
            </div>
        );
    }

    if (!course || !category) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="text-blue-600 text-2xl font-semibold animate-pulse">
                    Loading Course Details...
                </div>
            </div>
        );
    }

    // Progress Calculation
    const getProgressPercentage = () => {
        return Math.round((completedLessons.length / course.lessons.length) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Navigation */}
            <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="text-blue-600" />
                        <span className="text-xl font-bold text-blue-800">{category.title} / {course.title}</span>
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
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
                {/* Course Overview */}
                <div className="md:col-span-2 space-y-6">
                    {/* Intro Video */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="h-96">
                            <iframe
                                src={course.introVideo}
                                title="Course Intro Video"
                                className="w-full h-full"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">{course.title}</h2>
                            <p className="text-gray-600">{course.description}</p>
                        </div>
                    </div>

                    {/* Free Resources */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
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
                    </div>

                    {/* Lessons */}
                    {userHasCourse && (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-2xl font-bold text-blue-800 mb-4">Course Lessons</h3>
                            <div className="space-y-4">
                                {course.lessons.map((lesson) => (
                                    <LessonAccordion 
                                        key={lesson._id} 
                                        lesson={lesson}
                                        isExpanded={expandedLesson === lesson._id}
                                        onToggle={() => setExpandedLesson(
                                            expandedLesson === lesson._id ? null : lesson._id
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <img 
                            src={course.courseImage} 
                            alt={course.title} 
                            className="w-full rounded-lg mb-4"
                        />
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <DollarSign className="mr-2 text-green-600" />
                                <span className="text-xl font-bold text-gray-800">${course.price}</span>
                            </div>
                            {!userHasCourse && (
                                <button 
                                    onClick={() => setShowPaymentForm(true)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
                                >
                                    Buy Now
                                </button>
                            )}
                        </div>
                    </div>

                    {showPaymentForm && !userHasCourse && (
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

const LessonAccordion = ({ lesson, isExpanded, onToggle }) => {
    const [isCompleted, setIsCompleted] = useState(false);

    return (
        <div className="border rounded-lg overflow-hidden">
            <div 
                onClick={onToggle}
                className="flex justify-between items-center p-4 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors"
            >
                <span className="text-lg font-semibold text-blue-800">{lesson.title}</span>
                <CheckCircle 
                    className={`w-6 h-6 ${isCompleted ? 'text-green-600' : 'text-gray-400'}`} 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCompleted(!isCompleted);
                    }}
                />
            </div>
            {isExpanded && (
                <div className="p-4">
                    <video controls className="w-full rounded-lg">
                        <source src={lesson.videoLink} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <a 
                        href={lesson.notes} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-600 hover:underline flex items-center"
                    >
                        <Download className="mr-2" /> Download Lesson Notes
                    </a>
                </div>
            )}
        </div>
    );
};

const PaymentForm = ({ course, onClose }) => {
    const [transactionId, setTransactionId] = useState('');
    const [paymentConfirmationImage, setPaymentConfirmationImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Payment submission logic here
        onClose();
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Complete Your Purchase</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2 text-gray-700">Transaction ID</label>
                    <input 
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-gray-700">Payment Confirmation</label>
                    <input 
                        type="file"
                        onChange={(e) => setPaymentConfirmationImage(e.target.files[0])}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="flex justify-between">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
                    >
                        Confirm Payment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseDetails;