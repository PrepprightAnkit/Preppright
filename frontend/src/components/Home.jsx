
import { LogOut, Menu, Upload, User, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

// Import components (assuming these exist in the same structure)
import companiesHero from './landingPage/assets/companiesHero.png';
import heroBg from './landingPage/assets/heroBg.png';
import Categories from "./landingPage/Categories";
import Courses from './landingPage/Courses';
import Discuss from './landingPage/Discuss';
import Hero from "./landingPage/Hero";
import Platform from './landingPage/Platform';
// Import logo
import bg from '../assets/PreepPright.png';
import HomeReviews from './HomeReviews';
import SearchComponent from './Search';

const Home = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const filteredCourses = useMemo(() => {
        if (!searchTerm.trim()) return [];
        
        return courses.filter(course => 
            course && 
            course.title && 
            course.description && 
            course.level && 
            (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
             course.level.toLowerCase().includes(searchTerm.toLowerCase()))
        ).slice(0, 5); // Limit to 5 results
    }, [courses, searchTerm]);
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false); // Close mobile menu after selecting
        }
    };


    useEffect(() => {
        const fetchCourses = async () => {
            try {
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

        fetchCourses();
    }, [apiUrl]);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
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
                        className="h-20 w-auto md:ml-10"
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => item === 'Quiz' 
                                    ? navigate('/allQuiz') 
                                    : scrollToSection(item.toLowerCase())}
                                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
            <div className="relative">
                <SearchComponent/>

        </div>
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
                            {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                                <button 
                                    key={item} 
                                    onClick={() => item === 'Quiz' 
                                        ? navigate('/allQuiz') 
                                        : scrollToSection(item.toLowerCase())}
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
                                        >
                                            Upload Content
                                        </Link>
                                    )}
                                    <Link 
                                        to="/userProfile" 
                                        className="block w-full text-center bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
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
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/reg" 
                                        className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Content Sections */}
            <main className="container mx-auto px-4">
                <div id="home" className="pt-6">
                <Hero companiesHero={companiesHero} heroBg={heroBg} />
                </div>
                <div id="categories" className="pt-6">
                    <Categories />
                </div>
                <div id="courses" className="pt-6">
                    <Courses />
                </div>
                <div id="platform" className="pt-6">
                    <Platform />
                </div>
                <div id="reviews" className="pt-6">
                    <HomeReviews/>
                </div>
                <div id="discuss" className="pt-6">
                    <Discuss />
                </div>
            </main>
        </div>
    );
}

export default Home;