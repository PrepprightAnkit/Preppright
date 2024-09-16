import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import bg from '../assets/PreepPright.png'
const UploadCourse = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [introVideo, setIntroVideo] = useState('');
  const [freeVideo, setFreeVideo] = useState('');
  const [freeNotes, setFreeNotes] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonNotes, setLessonNotes] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (e) => {
    if (e.target.name === 'image') {
      setImageFile(e.target.files[0]);
    } else if (e.target.name === 'videos') {
      setVideos(e.target.files);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('detailedDescription', detailedDescription);
    formData.append('level', level);
    formData.append('category', category);
    formData.append('introVideo', introVideo);
    formData.append('freeVideo', freeVideo);
    formData.append('freeNotes', freeNotes);
    formData.append('lessonTitle', lessonTitle);
    formData.append('lessonNotes', lessonNotes);
    formData.append('lessonVideo', lessonVideo);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (videos) {
      Array.from(videos).forEach((file) => formData.append('videos', file));
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/users/courses`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Course uploaded successfully!');
        // Reset form fields
        setTitle('');
        setPrice('');
        setDescription('');
        setDetailedDescription('');
        setLevel('');
        setCategory('');
        setIntroVideo('');
        setFreeVideo('');
        setFreeNotes('');
        setLessonTitle('');
        setLessonNotes('');
        setLessonVideo('');
        setImageFile(null);
        setVideos(null);
      } else {
        alert('Failed to upload course.');
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Error uploading course.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white p-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1> */}
          <img src={bg}
            className='h-12 w-auto mb-2 md:mb-0' />
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

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Upload New Course</h2>

          {/* Course Title */}
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

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Short Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Detailed Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Detailed Description</label>
            <textarea
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Level */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Select Level</option>
              {levels.map((levelOption) => (
                <option key={levelOption} value={levelOption}>{levelOption}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Intro Video */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Intro Video URL</label>
            <input
              type="text"
              value={introVideo}
              onChange={(e) => setIntroVideo(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Free Video */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Free Video URL</label>
            <input
              type="text"
              value={freeVideo}
              onChange={(e) => setFreeVideo(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Free Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Free Notes URL</label>
            <input
              type="text"
              value={freeNotes}
              onChange={(e) => setFreeNotes(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Lesson Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Lesson Title</label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Lesson Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Lesson Notes URL</label>
            <input
              type="text"
              value={lessonNotes}
              onChange={(e) => setLessonNotes(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Lesson Video */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Lesson Video URL</label>
            <input
              type="text"
              value={lessonVideo}
              onChange={(e) => setLessonVideo(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Upload Course Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Videos Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Upload Lesson Videos</label>
            <input
              type="file"
              name="videos"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
              multiple
            />
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Uploading...' : 'Upload Course'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCourse;
