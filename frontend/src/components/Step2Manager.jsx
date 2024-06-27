import React, { useState } from 'react';

const Step2Mangager = ({ nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    phoneNo: '',
    emailAddress: '',
    teamSize: '',
    manager: '',
    companyName: '',
    companyPhoneNo: '',
    companyEmailAddress: '',
    contactPersonName: '',
    contactPersonPhoneNo: '',
    contactPersonEmailAddress: ''
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
      name: formData.name,
      phoneNo: formData.phoneNo,
      emailAddress: formData.emailAddress,
      teamSize: formData.teamSize,
      manager: formData.manager,
      companyName: formData.companyName,
      companyPhoneNo: formData.companyPhoneNo,
      companyEmailAddress: formData.companyEmailAddress,
      contactPerson: {
        name: formData.contactPersonName,
        phoneNo: formData.contactPersonPhoneNo,
        emailAddress: formData.contactPersonEmailAddress
      }
    };

    fetch('http://localhost:8000/api/v1/users/registerCompany', {
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-5 text-blue-700">Company Registration</h2>
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
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="manager"
            placeholder="Manager"
            value={formData.manager}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="companyPhoneNo"
            placeholder="Company Phone Number"
            value={formData.companyPhoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="email"
            name="companyEmailAddress"
            placeholder="Company Email Address"
            value={formData.companyEmailAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="contactPersonName"
            placeholder="Contact Person Name"
            value={formData.contactPersonName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="text"
            name="contactPersonPhoneNo"
            placeholder="Contact Person Phone Number"
            value={formData.contactPersonPhoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-700"
          />
          <input
            type="email"
            name="contactPersonEmailAddress"
            placeholder="Contact Person Email Address"
            value={formData.contactPersonEmailAddress}
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

export default Step2Mangager;
