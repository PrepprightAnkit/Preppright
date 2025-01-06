import { ArrowRight, Lock, LogIn, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logoutUser } from '../actions/authActions';

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
        try {
            await dispatch(login(formData));
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-green-400 p-4 sm:p-6">
            <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200/20 flex flex-wrap md:flex-nowrap overflow-hidden">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 space-y-6 bg-white/20 backdrop-blur-md">
                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 text-center flex items-center justify-center">
                            <LogIn className="mr-2 sm:mr-3" /> Login
                        </h1>

                        <div className="space-y-4 sm:space-y-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                </div>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {isPasswordVisible ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3 sm:space-y-4">
                            <button
                                type="submit"
                                className="w-full py-2 sm:py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center"
                            >
                                Login <ArrowRight className="ml-2" />
                            </button>

                            <div className="flex justify-between text-gray-500 text-sm">
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
                                    Register <User className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 space-y-6 bg-white/20 backdrop-blur-md">
                    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-md">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Customer Testimonial</h2>
                        <p className="text-gray-700 mb-3 sm:mb-4">
                            "This platform has truly surpassed all my expectations! Its user-friendly design makes navigation effortless, and the features are well thought out and seamlessly integrated. The attention to detail is evident in every corner, from the intuitive interface to the smooth functionality. Highly recommended for anyone seeking reliability, innovation, and quality in one platform!"
                        </p>
                        <p className="text-gray-700 font-semibold text-right">- Kavin, CEO of Electech</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                        <img src="https://cdn.worldvectorlogo.com/logos/walmart.svg" alt="Walmart Logo" className="w-16 sm:w-3/4 mx-auto object-contain" />
                        <img src="https://cdn.worldvectorlogo.com/logos/logo-amazon.svg" alt="Amazon Logo" className="w-16 sm:w-3/4 mx-auto object-contain" />
                        <img src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" alt="Paypal Logo" className="w-16 sm:w-3/4 mx-auto object-contain" />
                        <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" alt="Stripe Logo" className="w-16 sm:w-3/4 mx-auto object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPageProp;