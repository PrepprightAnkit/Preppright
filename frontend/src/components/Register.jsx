import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    FileText,
    Lock,
    Mail,
    Phone,
    University,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [message, setMessage] = useState('');

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

    const validatePersonalInfo = () => {
        if (!formData.fullName) {
            setMessage('Full Name is required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage('Invalid email format');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return false;
        }
        if (formData.password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    const validateInstitutionInfo = () => {
        if (!formData.institution) {
            setMessage('Institution name is required');
            return false;
        }
        if (!formData.yearOrRole) {
            setMessage('Year of Study/Professional Role is required');
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        setMessage('');
        if (currentStep === 1 && validatePersonalInfo()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateInstitutionInfo()) {
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (key === 'courseCategories') {
                formData[key].forEach((category) => data.append(key, category));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch(`${apiUrl}/api/v1/users/register`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully!!');
                navigate('/login');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const renderStepIndicator = (step) => {
        return (
            <div className="flex items-center space-x-2 mb-6">
                {[1, 2, 3].map((s) => (
                    <div 
                        key={s}
                        className={`
                            w-10 h-1 rounded-full transition-all duration-300
                            ${currentStep >= s ? 'bg-purple-600' : 'bg-white/30'}
                        `}
                    />
                ))}
            </div>
        );
    };

    const renderPersonalInfoStep = () => (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number (Optional)"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>
        </div>
    );

    const renderInstitutionInfoStep = () => (
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <University className="w-5 h-5 text-white/50" />
                </div>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                >
                    <option className="text-black bg-white" value="College Student">College Student</option>
                    <option className="text-black bg-white" value="Corporate Employee">Corporate Employee</option>
                    <option className="text-black bg-white" value="Other">Other</option>
                </select>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <University className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="text"
                    name="institution"
                    placeholder="University/College/Organization"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="w-5 h-5 text-white/50" />
                </div>
                <input
                    type="text"
                    name="yearOrRole"
                    placeholder="Year of Study/Professional Role"
                    value={formData.yearOrRole}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    required
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="w-5 h-5 text-white/50" />
                </div>
                <select
                    name="preferredLearningMode"
                    value={formData.preferredLearningMode}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                >
                    <option className="text-black bg-white" value="Live Classes">Live Classes</option>
    <option className="text-black bg-white" value="Recorded Sessions">Recorded Sessions</option>
    <option className="text-black bg-white" value="Both">Both</option>
                </select>
            </div>
        </div>
    );

    const renderPreferencesStep = () => (
        <div className="space-y-4">
            <div className="mb-4">
                <label className="block text-white mb-2">Interested Course Categories</label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        'Science and Technology', 
                        'Business and Management', 
                        'Arts and Humanities', 
                        'Social Sciences', 
                        'Health and Medicine', 
                        'Languages', 
                        'Personal Development'
                    ].map((category) => (
                        <label key={category} className="flex items-center text-white space-x-2">
                            <input
                                type="checkbox"
                                name="courseCategories"
                                value={category}
                                checked={formData.courseCategories.includes(category)}
                                onChange={handleChange}
                                className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="relative">
                <label className="block text-white mb-2">Profile Picture</label>
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:rounded-md file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-white hover:file:bg-purple-600"
                />
            </div>

            <div className="relative">
                <label className="block text-white mb-2">Preferred Contact Method</label>
                <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Both">Both</option>
                </select>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-white hover:text-gray-200 transition-colors flex items-center"
                        >
                            <ArrowLeft className="mr-2" /> Home
                        </button>
                        <button 
                            onClick={() => navigate('/company-register')} 
                            className="text-white hover:text-green-200 transition-colors flex items-center"
                        >
                            Company Registration <ChevronRight className="ml-2" />
                        </button>
                    </div>

                    {renderStepIndicator()}

                    {message && (
                            <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg text-red-300 text-center">
                                {message}
                            </div>
                        )}

                        <h2 className="text-3xl font-bold text-white text-center mb-4">
                            {currentStep === 1 
                                ? 'Personal Information' 
                                : currentStep === 2 
                                ? 'Institution Details' 
                                : 'Preferences'}
                        </h2>

                        {currentStep === 1 && renderPersonalInfoStep()}
                        {currentStep === 2 && renderInstitutionInfoStep()}
                        {currentStep === 3 && renderPreferencesStep()}

                        <div className="flex justify-between mt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="mr-2" /> Previous
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="ml-auto flex items-center text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Next <ArrowRight className="ml-2" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full flex items-center justify-center text-white bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors"
                                >
                                    <CheckCircle2 className="mr-2" /> Complete Registration
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default Register;