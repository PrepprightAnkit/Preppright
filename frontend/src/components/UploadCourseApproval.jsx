import { AlertTriangle, CheckCircle, FileText, Menu, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/PreepPright.png';
const UploadCourseApproval = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentConfirmationImage, setPaymentConfirmationImage] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleUpload = async () => {
    // Validate inputs
    if (!courseId || !userId) {
      setMessage('Course ID and User ID are required');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('userId', userId);
    
    if (transactionId) {
      formData.append('transactionId', transactionId);
    }
    
    if (paymentConfirmationImage) {
      formData.append('paymentConfirmationImage', paymentConfirmationImage);
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/course-approval/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Course approval registered successfully');
        setMessageType('success');
      } else {
        setMessage(data.message || 'Something went wrong');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setMessageType('error');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (optional)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size should be less than 5MB');
        setMessageType('error');
        return;
      }
      setPaymentConfirmationImage(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <img 
            src={bg}
            alt="Preepright Logo" 
            className="h-10 w-auto"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  if (item === 'Quiz') {
                    navigate('/allQuiz');
                  } else if (item === 'Home') {
                    navigate('/');
                  } else if (item === 'Categories') {
                    navigate('/allCat');
                  } else {
                    navigate('/');
                  }
                }}
                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Upload className="mr-3 text-blue-600" size={24} />
            Course Approval Upload
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course ID
              </label>
              <input
                type="text"
                placeholder="Enter Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Confirmation
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md cursor-pointer hover:bg-blue-200 transition-colors"
                >
                  <FileText className="mr-2" size={20} />
                  {paymentConfirmationImage ? paymentConfirmationImage.name : 'Choose File'}
                </label>
              </div>
            </div>

            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Upload className="mr-2" size={20} />
              Upload Approval
            </button>

            {message && (
              <div className={`mt-4 p-3 rounded-md flex items-center ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="mr-2" size={20} />
                ) : (
                  <AlertTriangle className="mr-2" size={20} />
                )}
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCourseApproval;