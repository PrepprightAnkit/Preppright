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
        <div className="min-h-screen flex flex-col items-start justify-start md:bg-cover bg-center bg-loginBg">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-8 mt-4  hover:bg-blue-600"
            >
                Go to Home
            </button>
            <div className="scale-105 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-10 w-full md:w-1/4 shadow-lg ml-10 md:mt-10">
                <h2 className="font-bold text-3xl text-white mb-12">{user ? 'Welcome' : 'Login Page'}</h2>
                {message && <p className="text-red-600 mb-4">{message}</p>}
                {isAuthenticated ? (
                    <div>
                        <p className="text-white">Logged in as: {user.email}</p>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-4 bg-red-700 text-white font-bold rounded hover:bg-red-800"
                        >
                            Logout
                        </button>
                        {/* User details display here */}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-wrap scale-105 text-2xl">
                            <div className="w-full px-4">
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
                                <div className='text-center w-full text-white m-1 mb-3'>
                                    <Link to="/loginOtp">Click here to Login Via OTP</Link>
                                </div>
                                <div className='text-center w-full text-white m-1 mb-3'>
                                    <Link to="/reg">Click here to Register</Link>
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
