import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'College Student',
        institution: '',
        yearOrRole: '',
        fieldOrDepartment: '',
        preferredLearningMode: 'Live Classes',
        courseCategories: [],
        profilePicture: null,
        preferredContactMethod: 'Email'
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                courseCategories: checked
                    ? [...prevData.courseCategories, value]
                    : prevData.courseCategories.filter((category) => category !== value)
            }));
        } else if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        return /^\d{10}$/.test(phoneNumber);
    };

    const validatePassword = (password) => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setMessage('Invalid email format.');
            return;
        }

        if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
            setMessage('Phone number must be 10 digits.');
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (key === 'courseCategories') {
                formData[key].forEach((category) => data.append(key, category));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/register', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully!!      ');
                navigate('/login')
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (

        <>
            <div className=' flex flex-col '>




                <div className="min-h-screen bg-loginBg flex items-start justify-start bg-cover bg-center">

                    <div className="scale-105 m-16 bg-white mt-12 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-10 w-full max-w-4xl shadow-lg ml-10">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4 mt-2 mb-4 hover:bg-blue-600"
                        >
                            Go to Home
                        </button>
                        <button
                            onClick={() => navigate('/company-register')}
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded ml-4 mt-2 mb-4 hover:bg-green-600"
                        >
                            Register as Company
                        </button>

                        <h2 className=" font-bold text-3xl text-white mb-2 ml-4">Register Page</h2>
                        {message && <p className="text-red-600 mb-4">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-wrap text-xl font-semibold">
                                <div className="w-full md:w-1/2 px-4">
                                    <div className="mb-4">
                                        <label className="block text-white">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1  rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        />
                                    </div>
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
                                        <label className="block text-white">Phone Number (Optional)</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Create a Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Role</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        >
                                            <option value="College Student">College Student</option>
                                            <option value="Corporate Employee">Corporate Employee</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="mb-4">
                                            <label className="block text-white">University/College/Organization Name</label>
                                            <input
                                                type="text"
                                                name="institution"
                                                value={formData.institution}
                                                onChange={handleChange}
                                                className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-4">

                                    <div className="mb-4">
                                        <label className="block text-white">Year of Study/Professional Role</label>
                                        <input
                                            type="text"
                                            name="yearOrRole"
                                            value={formData.yearOrRole}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Major/Field of Study or Department</label>
                                        <input
                                            type="text"
                                            name="fieldOrDepartment"
                                            value={formData.fieldOrDepartment}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Preferred Learning Mode</label>
                                        <select
                                            name="preferredLearningMode"
                                            value={formData.preferredLearningMode}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        >
                                            <option value="Live Classes">Live Classes</option>
                                            <option value="Recorded Sessions">Recorded Sessions</option>
                                            <option value="Both">Both</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Interested Course Categories</label>
                                        <div className="flex flex-wrap space-x-2">
                                            {['Science and Technology', 'Business and Management', 'Arts and Humanities', 'Social Sciences', 'Health and Medicine', 'Languages', 'Personal Development'].map((category) => (
                                                <label key={category} className="flex items-center text-white">
                                                    <input
                                                        type="checkbox"
                                                        name="courseCategories"
                                                        value={category}
                                                        checked={formData.courseCategories.includes(category)}
                                                        onChange={handleChange}
                                                        className="mr-2"
                                                    />
                                                    {category}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Upload Profile Picture</label>
                                        <input
                                            type="file"
                                            name="profilePicture"
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Preferred Contact Method</label>
                                        <select
                                            name="preferredContactMethod"
                                            value={formData.preferredContactMethod}
                                            onChange={handleChange}
                                            className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                            required
                                        >
                                            <option value="Email">Email</option>
                                            <option value="Phone">Phone</option>
                                            <option value="Both">Both</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
