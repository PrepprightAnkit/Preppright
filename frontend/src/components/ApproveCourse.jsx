import { Menu, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import bg from '../assets/PreepPright.png';
const ApproveCourse = () => {
  const [approvalRequests, setApprovalRequests] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = localStorage.getItem("user");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    // Fetch the approval requests
    fetch(`${apiUrl}/api/v1/approve/getApproveCourse`)
      .then((response) => response.json())
      .then((data) => setApprovalRequests(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleApprove = (courseId, userId) => {
    // Send the POST request to approve the course
    fetch(`${apiUrl}/api/v1/approve/approveCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseId,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Course approved:', data);
        // Optionally, remove the approved item from the UI
        setApprovalRequests((prev) =>
          prev.filter(
            (request) => request.course._id !== courseId || request.user._id !== userId
          )
        );
      })
      .catch((error) => console.error('Error approving course:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100">
       <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <img 
            src={bg} 
            alt="Preep Logo" 
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {user?.isAdmin && (
                  <Link 
                    to="/uploadContent" 
                    className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full transition-colors"
                  >
                    <Upload size={18} className="mr-2" /> Upload
                  </Link>
                )}
                <Link 
                  to="/userProfile" 
                  className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                >
                  <User size={18} className="mr-2" /> Profile
                </Link>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/reg" 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {/* Mobile Navigation Links */}
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
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-blue-800 hover:bg-blue-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Course Approvals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvalRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{request.user.fullName}</h2>
                <p className="text-sm text-gray-600 mb-4">{request.user.email}</p>
                <img
                  src={request.paymentConfirmationImage}
                  alt="Payment Confirmation"
                  className="mb-4 w-full h-48 object-cover rounded-md"
                />
                <p className="text-sm font-semibold">Transaction ID: {request.transactionId}</p>
              </div>
              <button
                onClick={() => handleApprove(request.course._id, request.user._id)}
                className="mt-4 bg-green-700 text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveCourse;
