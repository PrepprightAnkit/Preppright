// src/components/UploadCat.js
import React, { useState } from 'react';

const UploadCat = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      } else {
        alert('Failed to upload category.');
      }
    } catch (error) {
      console.error('Error uploading category:', error);
      alert('Error uploading category.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-green-700 to-blue-700 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Upload New Category</h2>
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
          <label className="block text-gray-700 font-semibold mb-2">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition duration-200">
          Upload Category
        </button>
      </form>
    </div>
  );
};

export default UploadCat;
