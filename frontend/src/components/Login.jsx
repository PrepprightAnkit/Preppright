import React from 'react';
import loginBg from "../assets/login.jpg"
const Login = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={loginBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-white" htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-white" htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-white" htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
