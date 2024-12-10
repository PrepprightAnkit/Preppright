import { Award, CheckCircle, File, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/PreepPright.png';

const Certificate = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersResponse, coursesResponse] = await Promise.all([
                    fetch(`${apiUrl}/api/v1/users/getAllUsers`),
                    fetch(`${apiUrl}/api/v1/users/courses`)
                ]);

                const usersData = await usersResponse.json();
                const coursesData = await coursesResponse.json();

                const filteredCertificates = processCertificates(
                    usersData.data, 
                    coursesData.data
                );

                setUsers(usersData.data);
                setCourses(coursesData.data);
                setCertificates(filteredCertificates);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load certificates');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const processCertificates = (users, courses) => {
        const certificates = [];

        users.forEach(user => {
            user.coursesTaken.forEach(course => {
                if (course.progress === 100) {
                    const courseDetail = courses.find(c => c._id === course.course);
                    if (courseDetail) {
                        certificates.push({
                            userName: user.fullName,
                            email: user.email,
                            courseName: courseDetail.title,
                            id: `${user._id}-${course._id}`
                        });
                    }
                }
            });
        });

        return certificates;
    };

    const handleGenerateCertificate = (userName, email, courseName) => {
        // Placeholder for certificate generation
        alert(`Generating certificate for ${userName} (${email}) - Course: ${courseName}`);
    };

    const filteredCertificates = certificates.filter(cert => 
        cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
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
                                    switch(item) {
                                        case 'Home': navigate('/'); break;
                                        case 'Categories': navigate('/allCat'); break;
                                        case 'Courses': navigate('/allCourse'); break;
                                        case 'Quiz': navigate('/allQuiz'); break;
                                        default: navigate('/');
                                    }
                                }}
                                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    to="/userProfile" 
                                    className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <User size={18} className="mr-2" />
                                    Profile
                                </Link>
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
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-700 flex items-center">
                        <Award className="mr-3 text-green-600" size={36} />
                        Certificates
                    </h1>
                    
                    {/* Search Input */}
                    <div className="relative w-full max-w-md">
                        <input 
                            type="text"
                            placeholder="Search certificates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full pl-10 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                ) : filteredCertificates.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <File className="mx-auto mb-4 text-gray-400" size={48} />
                        <p className="text-xl text-gray-600">
                            No certificates found
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCertificates.map((cert) => (
                            <div 
                                key={cert.id} 
                                className="bg-white shadow-lg rounded-xl overflow-hidden 
                                    transform transition-all duration-300 hover:scale-105 
                                    hover:shadow-2xl border-l-4 border-green-500"
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <CheckCircle className="mr-3 text-green-500" size={24} />
                                        <h2 className="text-xl font-bold text-green-700">
                                            Course Completion
                                        </h2>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Name:</span> {cert.userName}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Email:</span> {cert.email}
                                        </p>
                                        <p className="text-blue-600 font-medium">
                                            Course: {cert.courseName}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <button 
                                            onClick={() => handleGenerateCertificate(cert.userName, cert.email, cert.courseName)}
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full 
                                            transition-colors flex items-center justify-center"
                                        >
                                            <File className="mr-2" size={18} />
                                            Generate Certificate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificate;