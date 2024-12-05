import {
    ArrowLeft,
    ArrowRight,
    Lock,
    LogIn,
    Mail,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../actions/authActions';

const LoginPageProp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, message, isAuthenticated } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(login(formData));
        if (isAuthenticated) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-white hover:text-gray-200 transition-colors flex items-center"
                        >
                            <ArrowLeft className="mr-2" /> Home
                        </button>
                        {isAuthenticated && (
                            <button 
                                onClick={handleLogout} 
                                className="text-white hover:text-red-300 transition-colors flex items-center"
                            >
                                Logout <ArrowRight className="ml-2" />
                            </button>
                        )}
                    </div>

                    {message && (
                        <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-red-300 text-center">
                            {message}
                        </div>
                    )}

                    {isAuthenticated ? (
                        <div className="text-center space-y-4 text-white">
                            <User className="mx-auto w-16 h-16 text-white/70" />
                            <h2 className="text-2xl font-semibold">Welcome Back</h2>
                            <p className="text-white/80">{user.email}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center">
                                <LogIn className="mr-3" /> Login
                            </h1>

                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/50" />
                                    </div>
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                    <button 
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors"
                                    >
                                        {isPasswordVisible ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                                >
                                    Login <ArrowRight className="ml-2" />
                                </button>

                                <div className="flex justify-between text-white/80 text-sm">
                                    <Link 
                                        to="/loginOtp" 
                                        className="hover:underline flex items-center"
                                    >
                                        Login via OTP
                                    </Link>
                                    <Link 
                                        to="/reg" 
                                        className="hover:underline flex items-center"
                                    >
                                        Register <User className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPageProp;