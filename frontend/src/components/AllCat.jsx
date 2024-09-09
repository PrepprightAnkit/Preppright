import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, Fade } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';

const AllCat = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/cat');
            if (response.ok) {
                const data = await response.json();
                setCategories(data.data);
                setFilteredCategories(data.data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(category =>
                category.title.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    };

    const handleSelectCategory = (categoryId) => {
        navigate(`/categories/${categoryId}`);
    };

    const handleLogout = () => {
        // Implement logout functionality
    };

    return (
        <section className="bg-gray-100 min-h-screen p-8">
            <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>

                    <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
<<<<<<< HEAD
                        <button onClick={() => navigate('/allCat')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourses')} className="text-blue-800 hover:underline">Courses</button>
=======
                        <button onClick={() => navigate('/categories')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
>>>>>>> 1cb8c2a3b262bdcc985090ead53cf08661763dc5
                    </div>

                    <div className="relative w-full md:w-1/4 group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border rounded-full focus:outline-none"
                            placeholder="Search categories..."
                        />
                        {filteredCategories.length > 0 && (
                            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                                {filteredCategories.map((category) => (
                                    <div
                                        key={category._id}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleSelectCategory(category._id)}
                                    >
                                        {category.title}
                                    </div>
                                ))}
                            </div>
                        )}
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

            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8">
                <Slide>
                    <div className="flex flex-col">
                        <h2 className="text-5xl font-bold text-blue-700">POPULAR CATEGORIES!</h2>
                        <h2 className="text-2xl ml-2 mt-2 font-light text-gray-800">Explore our Top Categories</h2>
                    </div>
                </Slide>
            </div>

            {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCategories.map((category) => (
                        <Link to={`/categories/${category._id}`} key={category._id} className="group">
                            <div className="bg-white shadow-md rounded-lg border-blue-700 overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <Fade cascade>
                                    <div className="relative">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-4 bg-blue-50">
                                        <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-700 mb-2 line-clamp-3">
                                            {category.description}
                                        </p>
                                    </div>
                                </Fade>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600">No categories available</div>
            )}
        </section>
    );
};

export default AllCat;
