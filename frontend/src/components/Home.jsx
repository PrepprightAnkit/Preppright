import { LogOut, Menu, Upload, User, X, MapPin } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

// All imports remain exactly the same
import companiesHero from './landingPage/assets/companiesHero.png';
import heroBg from './landingPage/assets/heroBg.png';
import Categories from "./landingPage/Categories";
import Courses from './landingPage/Courses';
import Discuss from './landingPage/Discuss';
import Hero from "./landingPage/Hero";
import Platform from './landingPage/Platform';
import bg from '../assets/PreepPright.png';
import HomeReviews from './HomeReviews';
import LeverageEdu from './milestones';
import SearchComponent from './Search';

const Home = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // All logic remains exactly the same
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
        ).slice(0, 5);
    }, [courses, searchTerm]);
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
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

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-20 w-auto md:ml-10"
                    />

                    <div className="hidden md:flex items-center space-x-6">
                        {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => item === 'Quiz' ? navigate('/allQuiz') : scrollToSection(item.toLowerCase())}
                                className="text-indigo-800 hover:text-indigo-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-1/3">
                        <SearchComponent/>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                {user.isAdmin && (
                                    <Link 
                                        to="/uploadContent" 
                                        className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full transition-colors"
                                    >
                                        <Upload size={18} className="mr-2 text-indigo-600" /> Upload
                                    </Link>
                                )}
                                <Link 
                                    to="/userProfile" 
                                    className="flex items-center bg-blue-200 hover:bg-blue-300 px-3 py-2 rounded-full transition-colors"
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center bg-red-200 hover:bg-red-300 text-red-500 px-3 py-2 rounded-full transition-colors"
                                >
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <Link 
                                    to="/login" 
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors"
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

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-indigo-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white absolute w-full shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                                <button 
                                    key={item} 
                                    onClick={() => item === 'Quiz' ? navigate('/allQuiz') : scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left py-2 text-indigo-800 hover:bg-indigo-50"
                                >
                                    {item}
                                </button>
                            ))}

                            <div className="relative w-full mt-2">
                                <SearchComponent/>
                            </div>

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
                                        className="block w-full text-center bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded-full transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-center bg-red-200 hover:bg-red-300 text-red-500 px-4 py-2 rounded-full transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 mt-2">
                                    <Link 
                                        to="/login" 
                                        className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors"
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

            <main className="container mx-auto px-4">
                <div id="home" className="md:-mt-20">
                    <Hero companiesHero={companiesHero} heroBg={heroBg} />
                </div>
                <div id="home" className="md:pt-6">
                    <LeverageEdu/>
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
                <div id="World map" className="pt-6">
                    <WorldMapSection />
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

const WorldMapSection = () => {
    const locations = [
        { id: 1, lat: "35%", long: "25%", label: "North America" },
        { id: 2, lat: "55%", long: "30%", label: "South America" },
        { id: 3, lat: "30%", long: "55%", label: "Europe" },
        { id: 4, lat: "45%", long: "55%", label: "Africa" },
        { id: 5, lat: "45%", long: "68%", label: "India" },
        { id: 6, lat: "35%", long: "70%", label: "Asia" },
        { id: 7, lat: "65%", long: "85%", label: "Australia" },
        { id: 8, lat: "40%", long: "60%", label: "Middle East" },
    ];

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800 mb-4">
                        Students Around the World Choose PreppRight to Upskill
                    </h1>
                    <p className="text-gray-600">
                        We dedicate ourselves to helping every student improve in every place.
                    </p>
                </div>

                <div className="relative w-full">
                    <img 
                        src="https://www.pngarc.com/wp-content/uploads/2023/08/Flat-world-map-with-transparent-background.png" 
                        alt="World Map showing PreppRight students worldwide" 
                        className="w-full h-auto object-contain"
                    />
                    
                    <div className="absolute inset-0">
                        {locations.map((location) => (
                            <div
                                key={location.id}
                                className="absolute animate-pulse transition-transform hover:scale-110 group"
                                style={{
                                    top: location.lat,
                                    left: location.long,
                                }}
                            >
                                <MapPin 
                                    className="text-indigo-600 w-6 h-6 -translate-x-1/2 -translate-y-1/2" 
                                    fill="rgba(79, 70, 229, 0.2)"
                                />
                                <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                                    {location.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;