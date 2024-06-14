// Assuming you're using functional components with hooks (e.g., React 16.8+)
import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase'; // Adjust import based on your Firebase initialization
import loginPa from '../assets/loginBg.jpg'
import { Fade, Flip } from 'react-awesome-reveal';
const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);


    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                log(response)
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
            setDone(true);
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            alert('User couldn\'t sign in (bad verification code?)');
        });

    };

    return (
        <div className='  bg-gradient-to-r from-blue-500 to-purple-100 '>
            <div className="flex h-screen" >
                <div id="recaptcha-container"></div>
                <div className="w-3/4">
                    <div className="w-5/6 h-5/6 object-cover m-2">
                        <Fade>
                            <img src={loginPa} className='w-3/4 h-3/4 ml-20' alt="Login" />
                        </Fade>
                    </div>
                </div>
                <div className="w-1/4 h-auto flex flex-col justify-center items-center gap-3  ">
                    <div className='border-lg scale-150 border-2 border-orange-500 p-12 gap-4   '>
                        <h2 className="text-2xl mb-4">Login</h2>
                        <form onSubmit={onSignInSubmit} className="w-full flex flex-col">
                            <input
                                type="text"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mb-2 p-2 border rounded"
                            />
                            <div id="recaptcha-container"></div>
                            <button type="submit" className="mb-4 p-2 bg-blue-500 text-white rounded">Send OTP</button>
                        </form>
                        <form onSubmit={onSubmitOtp} className="w-full flex flex-col">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mb-2 p-2 border rounded"
                            />
                            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Verify OTP</button>
                        </form>
                        <p className="mt-4 text-red-500">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
