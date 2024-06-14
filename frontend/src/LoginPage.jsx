// LoginPage.js
import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
      }
    }, auth);
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setMessage("OTP sent to your phone.");
      }).catch((error) => {
        console.error(error);
        setMessage("Failed to send OTP. Try again.");
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const code = otp;
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    auth.signInWithCredential(credential).then((result) => {
      setMessage("Phone number verified!");
    }).catch((error) => {
      console.error(error);
      setMessage("Failed to verify OTP. Try again.");
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4">
        <img className="w-full h-full object-cover" src="your-image-url.jpg" alt="Login" />
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center p-8">
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
  );
};

export default LoginPage;
