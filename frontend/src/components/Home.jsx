
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
import { Award, Clock, Globe, Handshake, MapPin, TrendingUp, Users } from 'lucide-react';
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
                <div id="home" className="pt-6">
                <LeverageEdu/>
                </div>
                <div id="categories" className="pt-6">
                    <Categories />
                </div>
                <div id="courses" className="pt-6">
                    <Courses />
                </div>
                <div id="learner benefits" className="pt-6">
                    <LearnerBenefits/>
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

const LearnerBenefits = () => {
  const benefits = [
    {
      title: "World Class Pedagogy",
      items: [
        "Learn from the World's Best Faculty & Industry Experts",
        "Learn with fun Hands-on Exercises & Assignments",
        "Participate in Hackathons & Group Activities"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-1.png",
      stats: [
        { icon: <Award />, text: "4.8/5 Rating" },
        { icon: <Users />, text: "Gamified Learning" }
      ]
    },
    {
      title: "Personalized Guidance with 24×7 Support",
      items: [
        "Dedicated Learning Managers",
        "24/7 Learning Support",
        "Network with Peers & Interact with Industry Leaders"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-2.png",
      stats: [
        { icon: <Clock />, text: "24 x 7 Support" },
        { icon: <Handshake />, text: "1:1 Mentorship" }
      ]
    },
    {
      title: "Career Assistance",
      items: [
        "Resume Building & Mock Interview Prep",
        "Exclusive access to IntelliPaat Job Portal",
        "400+ Hiring Partners"
      ],
      image: "https://intellipaat.com/course-image/2021/10/learner-pic-3.png",
      stats: [
        { icon: <TrendingUp />, text: "85,000 Career Transition" },
        { icon: <Globe />, text: "400+ Hiring Partners" }
      ]
    }
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Learner Benefits</h2>
      
      <div className="max-w-6xl mx-auto space-y-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="rounded-lg shadow-lg w-1/2"
              />
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
              <ul className="space-y-3 mb-8">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="grid grid-cols-2 gap-4">
                {benefit.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center text-center">
                    <span className="text-orange-500 mb-2">
                      {stat.icon}
                    </span>
                    <span className="text-sm font-medium">{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const WorldMapSection = () => {
  // Strategic locations around the world
  const locations = [
    { id: 1, lat: "35%", long: "25%", label: "North America" },    // USA
    { id: 2, lat: "55%", long: "30%", label: "South America" },    // Brazil
    { id: 3, lat: "30%", long: "55%", label: "Europe" },          // UK
    { id: 4, lat: "45%", long: "55%", label: "Africa" },          // Central Africa
    { id: 5, lat: "45%", long: "68%", label: "India" },           // India
    { id: 6, lat: "35%", long: "70%", label: "Asia" },            // China
    { id: 7, lat: "65%", long: "85%", label: "Australia" },       // Australia
    { id: 8, lat: "40%", long: "60%", label: "Middle East" },    // Southeast Asia
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Students Around the World Choose PreppRight to Upskill
          </h1>
          <p className="text-lg text-gray-600">
            We dedicate ourselves to helping every student improve in every place.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full">
          {/* Map Image */}
          <img 
            src="https://www.pngarc.com/wp-content/uploads/2023/08/Flat-world-map-with-transparent-background.png" 
            alt="World Map showing PreppRight students worldwide" 
            className="w-full h-auto object-contain"
          />
          
          {/* Location Markers */}
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
                  className="text-blue-600 w-6 h-6 -translate-x-1/2 -translate-y-1/2" 
                  fill="rgba(37, 99, 235, 0.2)"
                />
                <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
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