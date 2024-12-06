import { LogOut, Menu, Upload, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

// Import logo
import bg from '../assets/PreepPright.png';

// Course icons
import c1 from './landingPage/assets/c1.png';
import c2 from './landingPage/assets/c2.png';
import c3 from './landingPage/assets/c3.png';
import SearchComponent from './Search';

const AllCourses = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/courses`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data.data);
                setFilteredCourses(data.data);
            } else {
                console.error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value !== '') {
            const filtered = courses.filter(course => 
                course.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses(courses);
        }
    };

    const handleSelectCourse = (courseId) => {
        setSearchTerm('');
        navigate(`/courses/${courseId}`);
    };

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-10 w-auto"
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {['Home', 'Categories', 'Courses','Discuss', 'Quiz'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => navigate(item === 'Home' ? '/' : 
                                    item === 'Categories' ? '/allCat' : '/allCourse')}
                                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative hidden md:block w-1/3">
                    <SearchComponent/>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                {user.isAdmin && (
                                    <Link 
                                        to="/uploadContent" 
                                        className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full transition-colors"
                                    >
                                        <Upload size={18} className="mr-2" /> Upload
                                    </Link>
                                )}
                                <Link 
                                    to="/userProfile" 
                                    className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-full transition-colors"
                                >
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <Link 
                                    to="/login" 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/reg" 
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-blue-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white absolute w-full shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {/* Mobile Navigation Links */}
                            {['Home', 'Categories', 'Courses'].map((item) => (
                                <button 
                                    key={item} 
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        navigate(item === 'Home' ? '/' : 
                                            item === 'Categories' ? '/allCat' : '/allCourse');
                                    }}
                                    className="block w-full text-left py-2 text-blue-800 hover:bg-blue-50"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Mobile Search */}
                            <div className="relative w-full mt-2">
                                <SearchComponent/>
                            </div>

                            {/* Mobile Auth Buttons */}
                            {isAuthenticated ? (
                                <div className="space-y-2 mt-2">
                                    {user.isAdmin && (
                                        <Link 
                                            to="/uploadContent" 
                                            className="block w-full text-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Upload Content
                                        </Link>
                                    )}
                                    <Link 
                                        to="/userProfile" 
                                        className="block w-full text-center bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-center bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-full transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 mt-2">
                                    <Link 
                                        to="/login" 
                                        className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/reg" 
                                        className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="w-full mb-8">
                    <Slide>
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-blue-700">POPULAR COURSES!</h2>
                            <h3 className="text-xl md:text-2xl ml-1 mt-2 font-light text-gray-800">Explore our Top Courses</h3>
                        </div>
                    </Slide>
                </div>

                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <Link 
                                to={`/courses/${course._id}`} 
                                key={course._id} 
                                className="group"
                            >
                                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
                                    <Fade cascade>
                                        <div className="relative">
                                            <img
                                                src={course.courseImage}  // Note: uses 'courseImage' property
                                                alt={course.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                        <div className="p-4 bg-blue-50">
                                            <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-1">
                                                {course.name}
                                            </h3>
                                            <p className="text-gray-700 mb-2 line-clamp-3">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center">
                                                    <img src={c1} alt="Book" className="w-6 h-6 mr-2" />
                                                    <span className="text-gray-600">{course.numberOfLessons}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <img src={c2} alt="Icon" className="w-6 h-6 mr-2" />
                                                    <span className="text-gray-600">23</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <img src={c3} alt="Level" className="w-6 h-6 mr-2" />
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
                    <div className="text-center text-gray-600 text-xl py-12">
                        No courses available
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllCourses;