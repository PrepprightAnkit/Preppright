import {
    BookOpen,
    Check,
    Film,
    FolderPlus,
    Image,
    List,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/courses`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data.data);
                console.log("Course Data", data.data)
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
                // Reset form
                setShowCourseForm(false);
                setShowCategoryForm(false);
            } else {
                alert('Failed to upload content.');
            }
        } catch (error) {
            console.error('Error uploading content:', error);
            alert('Error uploading content.');
        }
    };

    const FileUploadInput = ({ onChange, multiple = false, accept, children }) => (
        <div className="relative">
            <input
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={onChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        <BookOpen />
                        <span>Home</span>
                    </button>

                    <button
                        onClick={() => {
                            setShowCourseForm(!showCourseForm);
                            setShowCategoryForm(false);
                        }}
                        className="flex items-center justify-center space-x-2 p-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        <Film />
                        <span>New Course</span>
                    </button>

                    <button
                        onClick={() => {
                            setShowCategoryForm(!showCategoryForm);
                            setShowCourseForm(false);
                        }}
                        className="flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                    >
                        <FolderPlus />
                        <span>New Category</span>
                    </button>
                </div>

                {(showCourseForm || showCategoryForm) && (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {showCourseForm ? "Upload New Course" : "Upload New Category"}
                                </h2>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setShowCourseForm(false);
                                        setShowCategoryForm(false);
                                    }}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {showCourseForm && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Course Name</label>
                                            <input
                                                type="text"
                                                value={courseName}
                                                onChange={(e) => setCourseName(e.target.value)}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Rest of the course form fields would follow a similar pattern */}
                                </>
                            )}

                            {showCategoryForm && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Category Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={categoryDescription}
                                            onChange={(e) => setCategoryDescription(e.target.value)}
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">Category Image</label>
                                        <FileUploadInput
                                            onChange={(e) => handleFileChange(e, setImageFile)}
                                            accept="image/*"
                                        >
                                            <Image className="mr-2" />
                                            <span>{imageFile ? imageFile.name : 'Select Image'}</span>
                                        </FileUploadInput>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Check />
                                    <span>Upload</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <List className="mr-2" /> Course List
                        </h3>
                        <ul className="space-y-2">
                            {courses.map((course) => (
                                <li 
                                    key={course._id} 
                                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    {course.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <FolderPlus className="mr-2" /> Category List
                        </h3>
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li 
                                    key={index} 
                                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadContent;