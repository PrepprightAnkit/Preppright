import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import c1 from './landingPage/assets/c1.png';
import c2 from './landingPage/assets/c2.png';
import c3 from './landingPage/assets/c3.png';
import { Slide, Fade } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data.data);
                setFilteredCourses(data.data);
            } else {
                console.error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    };

    const handleSelectCourse = (courseId) => {
        navigate(`/courses/${courseId}`);
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
                        <button onClick={() => navigate('/allCat')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
                    </div>

                    <div className="relative w-full md:w-1/4 group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border rounded-full focus:outline-none"
                            placeholder="Search courses..."
                        />
                        {filteredCourses.length > 0 && (
                            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10 opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleSelectCourse(course._id)}
                                    >
                                        {course.name}
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
                        <h2 className="text-5xl font-bold text-blue-700">POPULAR COURSES!</h2>
                        <h2 className="text-2xl ml-2 mt-2 font-light text-gray-800">Explore our Top Courses</h2>
                    </div>
                </Slide>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <Link to={`/courses/${course._id}`} key={course._id} className="group">
                            <div className="bg-white shadow-md rounded-lg border-blue-700 overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <Fade cascade>
                                    <div className="relative">
                                        <img
                                            src={course.image}
                                            alt={course.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-4 bg-blue-50">
                                        <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-1">
                                            {course.name}
                                        </h3>
                                        <p className="text-gray-700 mb-2 line-clamp-3">
                                            {course.description}
                                        </p>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <img src={c1} alt="Book" className="w-6 h-6 mr-2" />
                                                <span className="text-gray-600">{course.numberOfLessons}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <img src={c2} alt="Icon 2" className="w-6 h-6 mr-2" />
                                                <span className="text-gray-600">23</span>
                                            </div>
                                            <div className="flex items-center">
                                                <img src={c3} alt="Icon 3" className="w-6 h-6 mr-2" />
                                                <span className="text-gray-600">{course.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600">No courses available</div>
            )}
        </section>
    );
};

export default AllCourses;
