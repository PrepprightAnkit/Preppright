import React, { useState } from 'react';

const Step2Student = ({ nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    currentCollege: '',
    degreeName: '',
    expectedYearOfGraduation: '',
    profilePicture: '',
    courseEnrolled: ''
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
    const data = { ...formData };

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
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
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
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="currentCollege"
            placeholder="Current College"
            value={formData.currentCollege}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="degreeName"
            placeholder="Degree Name"
            value={formData.degreeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="number"
            name="expectedYearOfGraduation"
            placeholder="Expected Year of Graduation"
            value={formData.expectedYearOfGraduation}
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
            type="text"
            name="courseEnrolled"
            placeholder="Course Enrolled"
            value={formData.courseEnrolled}
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

export default Step2Student;
