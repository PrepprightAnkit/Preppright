import {
    BookmarkIcon,
    BookOpen,
    Briefcase,
    GraduationCap,
    Home,
    LogOut,
    Mail,
    Phone
} from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';
import bg from '../assets/PreepPright.png';
const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-2xl text-center space-y-6 max-w-md w-full">
                    <h2 className="text-3xl font-bold text-blue-800 mb-4">Access Restricted</h2>
                    <p className="text-gray-600 mb-6">Please log in to view your profile</p>
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

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-blue-600 text-2xl font-semibold animate-pulse">Loading Profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Modern Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-800 flex items-center">
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-10 w-auto"
                    />

                    
                    </div>
                    
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-blue-700 hover:text-blue-900 transition-colors flex items-center"
                        >
                            <Home className="mr-2" /> Home
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center transition-all"
                        >
                            <LogOut className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
                        <img 
                            src={user.profilePicture} 
                            alt="Profile" 
                            className="w-40 h-40 rounded-full border-4 border-white mx-auto mb-4 object-cover shadow-lg"
                        />
                        <h1 className="text-4xl font-bold text-white">{user.fullName}</h1>
                        <p className="text-blue-200 mt-2">{user.email}</p>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 p-8">
                        <div className="space-y-4">
                            <ProfileDetailCard 
                                icon={<Mail className="text-blue-600" />} 
                                label="Email" 
                                value={user.email} 
                            />
                            <ProfileDetailCard 
                                icon={<Phone className="text-green-600" />} 
                                label="Phone Number" 
                                value={user.phoneNumber} 
                            />
                            <ProfileDetailCard 
                                icon={<Briefcase className="text-purple-600" />} 
                                label="Role" 
                                value={user.role} 
                            />
                        </div>

                        <div className="space-y-4">
                            <ProfileDetailCard 
                                icon={<BookOpen className="text-indigo-600" />} 
                                label="Institution" 
                                value={user.institution} 
                            />
                            <ProfileDetailCard 
                                icon={<GraduationCap className="text-teal-600" />} 
                                label="Year/Role" 
                                value={user.yearOrRole} 
                            />
                            <div className="bg-gray-100 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <BookmarkIcon className="mr-2 text-orange-600" />
                                    <h3 className="font-semibold text-gray-800">Course Categories</h3>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {user.courseCategories.map((category, index) => (
                                        <li key={index} className="text-sm">{category}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileDetailCard = ({ icon, label, value }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center shadow-md hover:shadow-lg transition-all">
        <div className="mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default ProfilePage;