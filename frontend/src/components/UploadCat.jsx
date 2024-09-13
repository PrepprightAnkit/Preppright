// src/components/UploadCat.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const UploadCat = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/cat', {
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
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white p-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>
          <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
            <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
            <button onClick={() => navigate('/allCat')} className="text-blue-800 hover:underline">Categories</button>
            <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
          </div>
          
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <button className="bg-blue-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                  <Link to="/userProfile">My Profile</Link>
                </button>
              </>
            ) : (
              <>
                <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">
                  <Link to="/login">Login</Link>
                </button>
                <button className="bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                  <Link to="/reg">Register</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>


      <div className="flex justify-center items-center py-12">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Upload New Category</h2>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-200"
              disabled={loading} // Disable button during loading
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
