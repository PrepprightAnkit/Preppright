import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        username: '',
        bulkPurchases: [
            {
                teamSize: '',
                manager: '',
                companyName: '',
                companyPhoneNo: '',
                companyEmailAddress: '',
                contactPerson: {
                    name: '',
                    phoneNo: '',
                    emailAddress: ''
                }
            }
        ]
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.');
        if (subField) {
            setFormData((prevData) => ({
                ...prevData,
                bulkPurchases: prevData.bulkPurchases.map((purchase) => ({
                    ...purchase,
                    [field]: {
                        ...purchase[field],
                        [subField]: value
                    }
                }))
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/api/v1/companies/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Company registered successfully!');
                navigate('/login');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="min-h-screen bg-loginBg flex items-start justify-start bg-cover bg-center">
                <div className="scale-105 m-16 bg-white mt-12 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-10 w-full max-w-4xl shadow-lg ml-10">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-4 mt-2 mb-4 hover:bg-blue-600"
                    >
                        Go to Home
                    </button>
                    <h2 className="font-bold text-3xl text-white mb-2 ml-4">Company Register Page</h2>
                    {message && <p className="text-red-600 mb-4">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-wrap text-xl font-semibold">
                            <div className="w-full md:w-1/2 px-4">
                                <div className="mb-4">
                                    <label className="block text-white">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Team Size</label>
                                    <input
                                        type="number"
                                        name="bulkPurchases.teamSize"
                                        value={formData.bulkPurchases[0].teamSize}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Manager</label>
                                    <input
                                        type="text"
                                        name="bulkPurchases.manager"
                                        value={formData.bulkPurchases[0].manager}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Company Name</label>
                                    <input
                                        type="text"
                                        name="bulkPurchases.companyName"
                                        value={formData.bulkPurchases[0].companyName}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-4">
                                <div className="mb-4">
                                    <label className="block text-white">Company Phone Number</label>
                                    <input
                                        type="text"
                                        name="bulkPurchases.companyPhoneNo"
                                        value={formData.bulkPurchases[0].companyPhoneNo}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Company Email Address</label>
                                    <input
                                        type="email"
                                        name="bulkPurchases.companyEmailAddress"
                                        value={formData.bulkPurchases[0].companyEmailAddress}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Contact Person Name</label>
                                    <input
                                        type="text"
                                        name="bulkPurchases.contactPerson.name"
                                        value={formData.bulkPurchases[0].contactPerson.name}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Contact Person Phone Number</label>
                                    <input
                                        type="text"
                                        name="bulkPurchases.contactPerson.phoneNo"
                                        value={formData.bulkPurchases[0].contactPerson.phoneNo}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white">Contact Person Email Address</label>
                                    <input
                                        type="email"
                                        name="bulkPurchases.contactPerson.emailAddress"
                                        value={formData.bulkPurchases[0].contactPerson.emailAddress}
                                        onChange={handleChange}
                                        className="w-full p-2 mt-1 rounded border border-gray-300 bg-transparent text-white"
                                        required
                                    />
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
    );
};

export default RegisterCompany;
