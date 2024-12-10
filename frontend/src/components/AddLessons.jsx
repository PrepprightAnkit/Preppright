import {
    Book,
    FileText,
    Grid,
    Home,
    LogIn,
    PlusCircle,
    User,
    UserPlus,
    Video
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const AddLessons = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=>state.auth);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/users/courses`);
                const data = await response.json();
                setCourses(data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setResponseMessage('Failed to fetch courses');
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('notes', notes);
        formData.append('courseId', selectedCourseId);
        if (videoFile) {
            formData.append('videos', videoFile);
        }

        try {
            const response = await fetch(`${apiUrl}/api/v1/users/courseLesson`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setResponseMessage(data.message || 'Lesson added successfully');
            
            // Reset form after successful submission
            setSelectedCourseId('');
            setTitle('');
            setNotes('');
            setVideoFile(null);
        } catch (error) {
            console.error('Error adding lesson:', error);
            setResponseMessage('Failed to add lesson');
        }
    };

    const MobileMenu = () => (
        <div className={`fixed inset-0 bg-white z-50 ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-2xl font-bold">Menu</h1>
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <nav className="flex-grow flex flex-col space-y-4 p-4">
                    {isAuthenticated ? (
                        <>
                            {user.isAdmin && (
                                <Link 
                                    to="/uploadContent" 
                                    className="flex items-center space-x-2 text-xl hover:bg-blue-50 p-2 rounded"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <PlusCircle />
                                    <span>Upload Content</span>
                                </Link>
                            )}
                            <Link 
                                to="/userProfile" 
                                className="flex items-center space-x-2 text-xl hover:bg-blue-50 p-2 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User />
                                <span>My Profile</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="flex items-center space-x-2 text-xl hover:bg-blue-50 p-2 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LogIn />
                                <span>Login</span>
                            </Link>
                            <Link 
                                to="/reg" 
                                className="flex items-center space-x-2 text-xl hover:bg-blue-50 p-2 rounded"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <UserPlus />
                                <span>Register</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Menu */}
            <MobileMenu />

            {/* Top Navigation */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-800">EduLearn</h1>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 6h16M4 12h16M4 18h16" 
                            />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4">
                        <button 
                            onClick={() => navigate('/')} 
                            className="flex items-center space-x-1 text-blue-800 hover:text-blue-600"
                        >
                            <Home size={18} />
                            <span>Home</span>
                        </button>
                        <button 
                            onClick={() => navigate('/allCat')} 
                            className="flex items-center space-x-1 text-blue-800 hover:text-blue-600"
                        >
                            <Grid size={18} />
                            <span>Categories</span>
                        </button>
                        <button 
                            onClick={() => navigate('/allCourse')} 
                            className="flex items-center space-x-1 text-blue-800 hover:text-blue-600"
                        >
                            <Book size={18} />
                            <span>Courses</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 flex items-center">
                        <FileText className="mr-2 text-blue-600" />
                        Add Lesson to Course
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label 
                                htmlFor="course" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Select Course
                            </label>
                            <select
                                id="course"
                                value={selectedCourseId}
                                onChange={(e) => setSelectedCourseId(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a Course</option>
                                {courses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label 
                                htmlFor="title" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Lesson Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Enter lesson title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="notes" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Lesson Notes
                            </label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add lesson notes (optional)"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="video" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Upload Video
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    id="video"
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                    className="flex-grow file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {videoFile && (
                                    <span className="text-sm text-green-600">
                                        {videoFile.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Video className="mr-2" />
                            Add Lesson
                        </button>
                    </form>

                    {responseMessage && (
                        <div className={`mt-4 p-4 rounded-md ${
                            responseMessage.includes('successfully') 
                                ? 'bg-green-100 text-green-700 border border-green-400' 
                                : 'bg-red-100 text-red-700 border border-red-400'
                        }`}>
                            {responseMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddLessons;