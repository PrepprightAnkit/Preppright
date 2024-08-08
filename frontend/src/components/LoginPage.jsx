import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase'; // Adjust import based on your Firebase initialization
import loginPa from '../assets/loginBg.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState(""); // Use local state for phone number
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                log(response);
            }
        });
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setVerificationId(confirmationResult.verificationId);
                setMessage("OTP sent to your phone.");
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.error(error);
                setMessage("Failed to send OTP. Try again.");
            });
    };

    const onSubmitOtp = (e) => {
        e.preventDefault();
        const code = otp;
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(code).then((result) => {
            console.log(result);
            alert('User signed in successfully');
            navigate('/reg'); // Navigate to Home page
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            alert('User couldn\'t sign in (bad verification code?)');
        });
    };

    return (
        <div className="min-h-screen bg-loginBg flex items-start justify-start bg-cover bg-center">
            <div className="scale-105 m-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-10 w-1/4 shadow-lg ml-10 md:mt-48">
                <h2 className="font-bold text-3xl text-white mb-12">Login Page</h2>
                {message && <p className="text-red-600 mb-4">{message}</p>}
                <form onSubmit={onSignInSubmit} className="space-y-4">
                    <div className="flex flex-wrap scale-105 text-2xl">
                        <div className="w-full px-4">
                            <div className="mb-4">
                                <label className="block text-white">Phone number</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800"
                            >
                                Send OTP
                            </button>
                        </div>
                    </div>
                </form>
                <form onSubmit={onSubmitOtp} className="space-y-4 mt-4">
                    <div className="flex flex-wrap scale-105 text-2xl">
                        <div className="w-full px-4">
                            <div className="mb-4">
                                <label className="block text-white">Enter OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </form>
                <div id="recaptcha-container" className="mt-4"></div>
            </div>
        </div>
    );
};

export default LoginPage;
