import { Menu, Upload, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../assets/PreepPright.png';

const UploadCourse = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    detailedDescription: '',
    level: '',
    category: '',
    introVideo: '',
    freeVideo: '',
    freeNotes: '',
    lessonTitle: '',
    lessonNotes: '',
    lessonVideo: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [videos, setVideos] = useState(null);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'image') {
      setImageFile(e.target.files[0]);
    } else if (e.target.name === 'videos') {
      setVideos(e.target.files);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    if (imageFile) {
      formDataToSubmit.append('image', imageFile);
    }
    if (videos) {
      Array.from(videos).forEach((file) => formDataToSubmit.append('videos', file));
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/courses`, {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert('Course uploaded successfully!');
        // Reset form
        setFormData({
          title: '', price: '', description: '', detailedDescription: '',
          level: '', category: '', introVideo: '', freeVideo: '',
          freeNotes: '', lessonTitle: '', lessonNotes: '', lessonVideo: ''
        });
        setImageFile(null);
        setVideos(null);
      } else {
        alert('Failed to upload course.');
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Error uploading course.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, name, type = 'text', required = true) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
          required={required}
        >
          <option value="">Select {label}</option>
          {name === 'level' 
            ? levels.map((levelOption) => (
                <option key={levelOption} value={levelOption}>{levelOption}</option>
              ))
            : null}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
          required={required}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
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

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <form 
          onSubmit={handleSubmit} 
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
            Upload New Course
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {renderInput('Title', 'title')}
            {renderInput('Price', 'price', 'number')}
          </div>

          {renderInput('Short Description', 'description', 'textarea')}
          {renderInput('Detailed Description', 'detailedDescription', 'textarea')}

          <div className="grid md:grid-cols-2 gap-4">
            {renderInput('Level', 'level', 'select')}
            {renderInput('Category', 'category')}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {renderInput('Intro Video URL', 'introVideo')}
            {renderInput('Free Video URL', 'freeVideo')}
          </div>

          {renderInput('Free Notes URL', 'freeNotes')}

          <div className="grid md:grid-cols-2 gap-4">
            {renderInput('Lesson Title', 'lessonTitle')}
            {renderInput('Lesson Video URL', 'lessonVideo')}
          </div>

          {renderInput('Lesson Notes URL', 'lessonNotes')}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Course Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Lesson Videos
              </label>
              <input
                type="file"
                name="videos"
                onChange={handleFileChange}
                multiple
                className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          {loading && (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg 
              transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
              focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCourse;