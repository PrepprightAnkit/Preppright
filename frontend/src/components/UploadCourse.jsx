import React, { useState } from 'react';

const UploadCourse = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [numberOfLessons, setNumberOfLessons] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [fileFiles, setFileFiles] = useState([]);
  const [freeVideoFile, setFreeVideoFile] = useState(null);
  const [freeNotesFile, setFreeNotesFile] = useState(null);
  const [courseIntroVideoFile, setCourseIntroVideoFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoFiles(e.target.files);
  };

  const handleFileChange = (e) => {
    setFileFiles(e.target.files);
  };

  const handleFreeVideoChange = (e) => {
    setFreeVideoFile(e.target.files[0]);
  };

  const handleFreeNotesChange = (e) => {
    setFreeNotesFile(e.target.files[0]);
  };

  const handleCourseIntroVideoChange = (e) => {
    setCourseIntroVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('detailedDescription', detailedDescription);
    formData.append('numberOfLessons', numberOfLessons);
    formData.append('level', level);
    formData.append('category', category);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    for (let file of videoFiles) {
      formData.append('videos', file);
    }

    for (let file of fileFiles) {
      formData.append('files', file);
    }

    if (freeVideoFile) {
      formData.append('freeVideo', freeVideoFile);
    }

    if (freeNotesFile) {
      formData.append('freeNotes', freeNotesFile);
    }

    if (courseIntroVideoFile) {
      formData.append('courseIntroVideo', courseIntroVideoFile);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/courses', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Course uploaded successfully!');
      } else {
        alert('Failed to upload course.');
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Error uploading course.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-green-700 to-blue-700 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Upload New Course</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Detailed Description</label>
          <textarea
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Number of Lessons</label>
          <input
            type="text"
            value={numberOfLessons}
            onChange={(e) => setNumberOfLessons(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Level</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Videos</label>
          <input
            type="file"
            multiple
            onChange={handleVideoChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Free Video</label>
          <input
            type="file"
            onChange={handleFreeVideoChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Free Notes</label>
          <input
            type="file"
            onChange={handleFreeNotesChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Course Intro Video</label>
          <input
            type="file"
            onChange={handleCourseIntroVideoChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-200">
          Upload Course
        </button>
      </form>
    </div>
  );
};

export default UploadCourse;
