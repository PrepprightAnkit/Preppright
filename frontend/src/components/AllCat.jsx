import { LogOut, Menu, Search, Upload, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/PreepPright.png'; // Import your logo

const AllCat = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/cat`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data.data);
                setFilteredCategories(data.data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value !== '') {
            const results = categories.filter(category => 
                category.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCategories(results);
        } else {
            setFilteredCategories(categories);
        }
    };

    const handleSelectCategory = (categoryId) => {
        navigate(`/categories/${categoryId}`);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
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
                        {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => {
                                    if (item === 'Quiz') {
                                        navigate('/allQuiz');
                                    } else if (item === 'Home') {
                                        navigate('/');
                                    } else if (item === 'Categories') {
                                        navigate('/allCat');
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative hidden md:block w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search categories..."
                            />
                            <Search 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                        </div>
                        {filteredCategories.length > 0 && searchTerm && (
                            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
                                {filteredCategories.map((category) => (
                                    <div
                                        key={category._id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectCategory(category._id)}
                                    >
                                        {category.title}
                                    </div>
                                ))}
                            </div>
                        )}
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
                                        : item === 'Home'
                                        ? navigate('/')
                                        : item === 'Categories'
                                        ? navigate('/allCat')
                                        : scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left py-2 text-blue-800 hover:bg-blue-50"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Mobile Search */}
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search categories..."
                                />
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    size={20} 
                                />
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

            {/* Categories Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
                        Explore Categories
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover courses across various domains
                    </p>
                </div>

                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCategories.map((category) => (
                            <Link 
                                to={`/categories/${category._id}`} 
                                key={category._id} 
                                className="group"
                            >
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                    <div className="relative h-48 w-full">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 bg-blue-50">
                                        <h3 className="text-xl font-semibold text-blue-800 mb-2 line-clamp-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-2xl text-gray-500">
                            No categories found
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllCat;