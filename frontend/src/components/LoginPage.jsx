import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    MessageCircle,
    Phone
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [verificationId, setVerificationId] = useState("");
    const [message, setMessage] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const otpInputRefs = useRef([]);

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response);
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
                setIsOtpSent(true);
                otpInputRefs.current[0].focus();
            }).catch((error) => {
                console.error(error);
                setMessage("Failed to send OTP. Try again.");
            });
    };

    const onSubmitOtp = (e) => {
        e.preventDefault();
        const code = otp.join('');
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(code).then((result) => {
            console.log(result);
            alert('User signed in successfully');
            navigate('/reg');
        }).catch((error) => {
            alert('User couldn\'t sign in (bad verification code?)');
        });
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            otpInputRefs.current[index + 1].focus();
        }

        // Auto focus previous input if current is deleted
        if (!value && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
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
                            <ArrowLeft className="mr-2" /> Back
                        </button>
                    </div>

                    {message && (
                        <div className={`
                            p-3 rounded-lg text-center 
                            ${message.includes('sent') 
                                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                                : 'bg-red-500/20 border border-red-500/30 text-red-300'
                            }
                        `}>
                            {message}
                        </div>
                    )}

                    {!isOtpSent ? (
                        <form onSubmit={onSignInSubmit} className="space-y-6">
                            <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center">
                                <Phone className="mr-3" /> Phone Login
                            </h1>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="w-5 h-5 text-white/50" />
                                </div>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+1 (123) 456-7890"
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                            >
                                Send OTP <MessageCircle className="ml-2" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={onSubmitOtp} className="space-y-6">
                            <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center">
                                <Lock className="mr-3" /> Verify OTP
                            </h1>

                            <div className="flex justify-center space-x-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={el => otpInputRefs.current[index] = el}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        className="w-12 h-12 text-center text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                            >
                                Verify OTP <ArrowRight className="ml-2" />
                            </button>

                            <div className="text-center text-white/70">
                                <button 
                                    type="button"
                                    onClick={() => setIsOtpSent(false)}
                                    className="underline hover:text-white transition-colors"
                                >
                                    Change Phone Number
                                </button>
                            </div>
                        </form>
                    )}
                    
                    <div id="recaptcha-container" className="hidden"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;