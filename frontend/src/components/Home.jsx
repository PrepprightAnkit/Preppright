import { LogOut, Menu, Upload, User, X, MapPin } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import theme from './theme';
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
import ReferAndWin from './landingPage/refer';
import MentorSupport from './landingPage/mentor';
const companies = [
    { name: 'Acuity', logo: 'https://cdn.worldvectorlogo.com/logos/acuity-1.svg' },
    { name: 'KPMG', logo: 'https://cdn.worldvectorlogo.com/logos/kpmg-1.svg' },
    { name: 'Kotak', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu_TCLGc2BzudlwAZauhhMWslcLloI1LkxQ&s' },
    { name: 'Knight Frank', logo: 'https://cdn.worldvectorlogo.com/logos/knight.svg' },
    { name: 'Aditya Birla', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJDh-ATuQXGsnDMQkNYXEo1n5ysaTstJJPg&s' },
    { name: 'Verizon', logo: 'data:image/png;base64,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' },
    { name: 'Angel One', logo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/13/full/1689270035-3662.png?im=FeatureCrop,size=(1200,900)' },
    { name: 'Verity', logo: 'https://cdn.worldvectorlogo.com/logos/verity.svg' },
    { name: 'TresVista', logo: 'data:image/png;base64,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' },
    { name: 'Sutherland', logo: 'https://cdn.worldvectorlogo.com/logos/sutherlands.svg' }
  ];
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
                <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-center ${theme.typography.hero} ${theme.typography.gradient}`}>Where Our Students Work</h2>
          <p className="text-xl text-gray-600 text-center mb-12">The top choice for ambitious students, professionals, and leading organizations.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center h-24 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-48 h-16 relative">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
                <div id="platform" className="pt-6">
                    <MentorSupport/>
                </div>
                <div id="World map" className="pt-6">
                    <WorldMapSection />
                </div>
                <div id="reviews" className="pt-6">
                    <HomeReviews/>
                </div>
                <div id="reviews" className="pt-6">
                    <ReferAndWin/>
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
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className={`text-3xl md:text-5xl font-extrabold overflow-visible ${theme.typography.hero} ${theme.typography.gradient} mb-2 tracking-tight`}>
                        Students Around the World Choose PreppRight to Upskill
                    </h1>
                    <p className="text-xl text-gray-600 flex items-center justify-center">
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