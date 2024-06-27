import React, { useState } from 'react';

const Step2Professional = ({ nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    profilePicture: '',
    yearsOfExperience: '',
    phoneNumber: '',
    graduationYear: '',
    collegeName: '',
    currentCompany: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      profilePicture: formData.profilePicture,
      yearsOfExperience: formData.yearsOfExperience,
      phoneNumber: formData.phoneNumber,
      graduationYear: formData.graduationYear,
      collegeName: formData.collegeName,
      currentCompany: formData.currentCompany
    };

    fetch('http://localhost:8000/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      nextStep();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" >
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Professional Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="number"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            value={formData.graduationYear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="currentCompany"
            placeholder="Current Company"
            value={formData.currentCompany}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <div className="flex justify-between">
            <button type="button" onClick={prevStep} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2Professional;
