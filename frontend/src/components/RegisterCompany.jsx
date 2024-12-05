import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Mail,
    Phone,
    UserCircle
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Check if the name contains a dot (indicating nested property)
        if (name.includes('.')) {
            // Split the name into parts
            const parts = name.split('.');
            
            // If it's a top-level bulk purchase property
            if (parts.length === 2) {
                setFormData((prevData) => ({
                    ...prevData,
                    bulkPurchases: prevData.bulkPurchases.map((purchase) => ({
                        ...purchase,
                        [parts[1]]: value
                    }))
                }));
            } 
            // If it's a nested contact person property
            else if (parts.length === 3) {
                setFormData((prevData) => ({
                    ...prevData,
                    bulkPurchases: prevData.bulkPurchases.map((purchase) => ({
                        ...purchase,
                        contactPerson: {
                            ...purchase.contactPerson,
                            [parts[2]]: value
                        }
                    }))
                }));
            }
        } 
        // Handle top-level properties (like username)
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const handleStepSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Validation logic for each step
        switch(currentStep) {
            case 1:
                // Add validation for first step if needed
                if (formData.username && formData.bulkPurchases[0].companyName && formData.bulkPurchases[0].manager) {
                    nextStep();
                } else {
                    setMessage("Please fill in all required fields");
                }
                break;
            case 2:
                // Add validation for second step if needed
                if (formData.bulkPurchases[0].companyPhoneNo && 
                    formData.bulkPurchases[0].companyEmailAddress && 
                    formData.bulkPurchases[0].teamSize) {
                    nextStep();
                } else {
                    setMessage("Please fill in all required fields");
                }
                break;
            case 3:
                // Final submit
                handleSubmit(e);
                break;
            default:
                break;
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

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const renderStepContent = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <UserCircle className="mr-2" /> Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <Building2 className="mr-2" /> Company Name
                            </label>
                            <input
                                type="text"
                                name="bulkPurchases.companyName"
                                value={formData.bulkPurchases[0].companyName}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <UserCircle className="mr-2" /> Manager Name
                            </label>
                            <input
                                type="text"
                                name="bulkPurchases.manager"
                                value={formData.bulkPurchases[0].manager}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <Phone className="mr-2" /> Company Phone Number
                            </label>
                            <input
                                type="tel"
                                name="bulkPurchases.companyPhoneNo"
                                value={formData.bulkPurchases[0].companyPhoneNo}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <Mail className="mr-2" /> Company Email Address
                            </label>
                            <input
                                type="email"
                                name="bulkPurchases.companyEmailAddress"
                                value={formData.bulkPurchases[0].companyEmailAddress}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2">Team Size</label>
                            <input
                                type="number"
                                name="bulkPurchases.teamSize"
                                value={formData.bulkPurchases[0].teamSize}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <UserCircle className="mr-2" /> Contact Person Name
                            </label>
                            <input
                                type="text"
                                name="bulkPurchases.contactPerson.name"
                                value={formData.bulkPurchases[0].contactPerson.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <Phone className="mr-2" /> Contact Person Phone Number
                            </label>
                            <input
                                type="tel"
                                name="bulkPurchases.contactPerson.phoneNo"
                                value={formData.bulkPurchases[0].contactPerson.phoneNo}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white mb-2 flex items-center">
                                <Mail className="mr-2" /> Contact Person Email Address
                            </label>
                            <input
                                type="email"
                                name="bulkPurchases.contactPerson.emailAddress"
                                value={formData.bulkPurchases[0].contactPerson.emailAddress}
                                onChange={handleChange}
                                className="w-full p-3 rounded border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => navigate('/reg')} 
                            className="text-white hover:text-gray-200 transition-colors flex items-center"
                        >
                            <ArrowLeft className="mr-2" /> Back
                        </button>
                    </div>

                    {/* Stepper Indicator */}
                    <div className="flex justify-between items-center mb-6">
                        {[1, 2, 3].map((step) => (
                            <div 
                                key={step} 
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                                    ${currentStep === step 
                                        ? 'bg-purple-600 text-white' 
                                        : currentStep > step 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-white/20 text-white/50'
                                    }`}
                            >
                                {currentStep > step ? <CheckCircle2 /> : step}
                            </div>
                        ))}
                    </div>

                    {message && (
                        <div className={`
                            p-3 rounded-lg text-center 
                            ${message.includes('successfully') 
                                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                                : 'bg-red-500/20 border border-red-500/30 text-red-300'
                            }
                        `}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleStepSubmit} className="space-y-6">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Company Registration
                        </h1>

                        {renderStepContent()}

                        <div className="flex justify-between space-x-4">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-full py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center"
                                >
                                    <ArrowLeft className="mr-2" /> Previous
                                </button>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                            >
                                {currentStep === 3 ? 'Register' : 'Next'} 
                                {currentStep !== 3 && <ArrowRight className="ml-2" />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCompany;