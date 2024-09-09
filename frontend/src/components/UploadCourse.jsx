import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, Fade } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
const UploadCourse = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseData, setCourseData] = useState({
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
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [lessonFile, setLessonFile] = useState(null);

  // Fetch courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/courses');
        const data = await response.json();
        if (response.ok) {
          setCourses(data.data || []);
        } else {
          console.error('Error fetching courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    loadCourses();
  }, []);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'courseImage') {
      setImageFile(files[0]);
    } else if (name === 'videos') {
      setVideoFiles(Array.from(files));
    } else if (name === 'lessonFile') {
      setLessonFile(files[0]);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('price', courseData.price);
      formData.append('description', courseData.description);
      formData.append('detailedDescription', courseData.detailedDescription);
      formData.append('level', courseData.level);
      formData.append('category', courseData.category);
      formData.append('introVideo', courseData.introVideo);
      formData.append('freeVideo', courseData.freeVideo);
      formData.append('freeNotes', courseData.freeNotes);

      if (imageFile) formData.append('courseImage', imageFile);
      videoFiles.forEach((file, index) => formData.append(`videos[${index}]`, file));

      const response = await fetch('http://localhost:8000/api/v1/users/courses', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Course uploaded successfully:', result.data);
      } else {
        console.error('Error uploading course:', result.message);
      }
    } catch (error) {
      console.error('Error uploading course:', error);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', courseData.lessonTitle);
      formData.append('notes', courseData.lessonNotes);
      formData.append('courseId', selectedCourse);

      if (lessonFile) formData.append('videos[0]', lessonFile);

      const response = await fetch('http://localhost:8000/api/v1/users/courses/add-lesson', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Lesson added successfully:', result.data);
      } else {
        console.error('Error adding lesson:', result.message);
      }
    } catch (error) {
      console.error('Error adding lesson:', error);
    }
  };

  return (

    <div className="container mx-auto p-6 bg-white text-black">
      <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>

                    <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => navigate('/allCat')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourses')} className="text-blue-800 hover:underline">Courses</button>
                    </div>

                  

                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full"
                                >
                                    Logout
                                </button>
                                {user.isAdmin ? (
                                    <button className="bg-gray-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                        <Link to="/uploadContent">Upload</Link>
                                    </button>
                                ) : null}
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

      <h1 className="text-2xl font-bold text-blue-600 mb-4">Upload Course</h1>
      <form onSubmit={handleCourseSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="detailedDescription">Detailed Description</label>
          <textarea
            id="detailedDescription"
            name="detailedDescription"
            value={courseData.detailedDescription}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="level">Level</label>
          <input
            type="text"
            id="level"
            name="level"
            value={courseData.level}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={courseData.category}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="introVideo">Intro Video URL</label>
          <input
            type="text"
            id="introVideo"
            name="introVideo"
            value={courseData.introVideo}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="freeVideo">Free Video URL</label>
          <input
            type="text"
            id="freeVideo"
            name="freeVideo"
            value={courseData.freeVideo}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="freeNotes">Free Notes URL</label>
          <input
            type="text"
            id="freeNotes"
            name="freeNotes"
            value={courseData.freeNotes}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="courseImage">Course Image</label>
          <input
            type="file"
            id="courseImage"
            name="courseImage"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="videos">Video Files</label>
          <input
            type="file"
            id="videos"
            name="videos"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload Course
        </button>
      </form>

      <h2 className="text-xl font-bold text-blue-600 mb-4">Add Lesson</h2>
      <form onSubmit={handleAddLesson}>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="selectedCourse">Select Course</label>
          <select
            id="selectedCourse"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="lessonTitle">Lesson Title</label>
          <input
            type="text"
            id="lessonTitle"
            name="lessonTitle"
            value={courseData.lessonTitle}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="lessonNotes">Lesson Notes URL</label>
          <input
            type="text"
            id="lessonNotes"
            name="lessonNotes"
            value={courseData.lessonNotes}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="lessonFile">Lesson Video File</label>
          <input
            type="file"
            id="lessonFile"
            name="lessonFile"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default UploadCourse;
