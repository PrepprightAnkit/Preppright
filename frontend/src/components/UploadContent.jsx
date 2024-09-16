import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const UploadContent = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [title, setTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [courseName, setCourseName] = useState('');
    const [price, setPrice] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
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
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);
    const navigate = useNavigate();


    const fetchCourses = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/courses`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data.data);
            } else {
                console.error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/cat`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                const mappedCategories = data.data.map(category => ({
                    imageUrl: category.image,
                    name: category.title,
                    description: category.description,
                }));
                setCategories(mappedCategories);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFileChange = (e, setter) => {
        setter(e.target.files[0]);
    };

    const handleMultipleFileChange = (e, setter) => {
        setter(e.target.files);
    };

    const validateDescription = (desc, maxWords) => {
        const words = desc.trim().split(/\s+/);
        return words.length <= maxWords;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateDescription(courseDescription, 50)) {
            alert('Description should not exceed 50 words.');
            return;
        }

        if (!validateDescription(detailedDescription, 250)) {
            alert('Detailed description should not exceed 250 words.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('categoryDescription', categoryDescription);
        formData.append('name', courseName);
        formData.append('price', price);
        formData.append('description', courseDescription);
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
            const response = await fetch(`${apiUrl}/api/v1/users/courses`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Content uploaded successfully!');
                fetchCourses();
                fetchCategories();
            } else {
                alert('Failed to upload content.');
            }
        } catch (error) {
            console.error('Error uploading content:', error);
            alert('Error uploading content.');
        }
    };

    const handleCourseFormToggle = () => {
        setShowCourseForm(!showCourseForm);
        if (showCategoryForm) {
            setShowCategoryForm(false);
        }
    };

    const handleCategoryFormToggle = () => {
        setShowCategoryForm(!showCategoryForm);
        if (showCourseForm) {
            setShowCourseForm(false);
        }
    };


    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mb-6 flex flex-col items-center justify-center w-full ">
                <button
                    onClick={() => navigate('/')}
                    className="w-1/4 p-4 bg-blue-700 text-white font-black text-3xl rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 mb-4"
                >
                    Go to Home
                </button>
                <button
                    onClick={handleCourseFormToggle}
                    className="w-1/4 p-4 bg-blue-700 text-white font-black text-3xl rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 mb-4                    "
                >
                    Upload New Course
                </button>


                <button
                    onClick={handleCategoryFormToggle}
                    className="w-1/4 p-4 bg-blue-700 text-white font-black text-3xl rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 mb-4"
                >
                    Upload New Category
                </button>
            </div>

            {showCourseForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700">Upload New Course</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
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
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
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
                            onChange={(e) => handleFileChange(e, setImageFile)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Videos</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleMultipleFileChange(e, setVideoFiles)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Files</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleMultipleFileChange(e, setFileFiles)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Free Video</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setFreeVideoFile)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Free Notes</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setFreeNotesFile)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Course Intro Video</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setCourseIntroVideoFile)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                            required
                        />
                    </div>
                    <div className="text-left">
                        <button
                            type="submit"
                            className="w-full p-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        >
                            Upload Content
                        </button>
                    </div>
                </form>
            )}

            {showCategoryForm && (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-6 text-blue-700">Upload New Category</h2>
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
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Image</label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setImageFile)}
                            className="w-full p-3 border rounded-lg focus:outline-none ring-2 ring-black focus:ring-2 focus:ring-blue-700"
                        />
                    </div>
                    <div className="text-left">
                        <button
                            type="submit"
                            className="w-full p-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                        >
                            Upload Category
                        </button>
                    </div>
                </form>
            )}

            <h3 className="text-3xl  mb-4 text-blue-700 font-black">Course List</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course._id} className="mb-4 font-bold text-xl">
                        {course.name}
                    </li>
                ))}
            </ul>

            <h3 className="text-3xl  mb-4 text-blue-700 font-black">Category List</h3>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="mb-4 font-bold text-xl">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadContent;
