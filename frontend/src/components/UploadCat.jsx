import { LogOut, Menu, Upload, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/PreepPright.png';

const UploadCat = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/cat`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Category uploaded successfully!');
        setTitle('');
        setDescription('');
        setImageFile(null);
      } else {
        alert('Failed to upload category.');
      }
    } catch (error) {
      console.error('Error uploading category:', error);
      alert('Error uploading category.');
    } finally {
      setLoading(false);
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
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user.isAdmin && (
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
                <button 
                  onClick={handleLogout}
                  className="flex items-center bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-full transition-colors"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
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

              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <div className="space-y-2 mt-2">
                  {user.isAdmin && (
                    <Link 
                      to="/uploadContent" 
                      className="block w-full text-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition-colors"
                    >
                      Upload Content
                    </Link>
                  )}
                  <Link 
                    to="/userProfile" 
                    className="block w-full text-center bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-center bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-full transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <Link 
                    to="/login" 
                    className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/reg" 
                    className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Upload Category Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Upload New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter category title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Describe the category"
                rows="4"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                accept="image/*"
              />
            </div>

            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCat;