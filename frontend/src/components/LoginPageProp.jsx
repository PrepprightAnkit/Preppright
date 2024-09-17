// src/components/LoginPageProp.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';

const LoginPageProp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            }, 2000);  // 2000 milliseconds = 2 seconds
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center md:items-start md:justify-start bg-loginBg bg-cover bg-center p-4 md:p-0">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-6 hover:bg-blue-600 md:ml-8 md:mt-4"
            >
                Go to Home
            </button>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-10 w-full max-w-md shadow-lg">
                <h2 className="font-bold text-3xl text-white text-center md:text-left mb-8">
                    {user ? 'Welcome' : 'Login Page'}
                </h2>
                {message && <p className="text-red-600 mb-4 text-center md:text-left">{message}</p>}
                {isAuthenticated ? (
                    <div>
                        <p className="text-white text-center md:text-left mb-4">Logged in as: {user.email}</p>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-red-700 text-white font-bold rounded hover:bg-red-800"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col">
                            <div className="w-full">
                                <div className="mb-4">
                                    <label className="block text-white">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className='text-center md:text-left text-white mb-4'>
                                    <Link to="/loginOtp" className="underline">Click here to Login Via OTP</Link>
                                </div>
                                <div className='text-center md:text-left text-white mb-4'>
                                    <Link to="/reg" className="underline">Click here to Register</Link>
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPageProp;
