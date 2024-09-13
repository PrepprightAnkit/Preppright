import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AddLessons = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=>state.auth);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        // Fetch courses from the API
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/courses');
                const data = await response.json();
                setCourses(data.data); // Assuming API returns an array of courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseChange = (e) => {
        setSelectedCourseId(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('notes', notes);
        formData.append('courseId', selectedCourseId);
        if (videoFile) {
            formData.append('videos', videoFile);
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/courseLesson', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setResponseMessage(data.message || 'Lesson added successfully');
        } catch (error) {
            console.error('Error adding lesson:', error);
            setResponseMessage('Failed to add lesson');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <nav className="bg-white p-4">
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

            <h1 className="text-2xl font-bold mb-4">Add Lesson to Course</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                        Select Course
                    </label>
                    <select
                        id="course"
                        value={selectedCourseId}
                        onChange={handleCourseChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Lesson Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Lesson Notes
                    </label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={handleNotesChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                        Upload Video
                    </label>
                    <input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Lesson
                    </button>
                </div>
            </form>

            {responseMessage && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-md">
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default AddLessons;
