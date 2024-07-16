import React, { useState, useEffect } from 'react';
import Hero from "./landingPage/Hero"
import Categories from "./landingPage/Categories"
import Discuss from './landingPage/Discuss';
import { Link, useNavigate } from 'react-router-dom';
import Courses from './landingPage/Courses';
const Home = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/courses');
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value !== '') {
            const results = courses.filter(course => course.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredCourses(results);
        } else {
            setFilteredCourses([]);
        }
    };

    const handleSelectCourse = (courseId) => {
        setSearchTerm('');
        setFilteredCourses([]);
        navigate(`/courses/${courseId}`);
    };


    return (
        <div>
            <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>
                    <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => scrollToSection('home')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => scrollToSection('categories')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => scrollToSection('courses')} className="text-blue-800 hover:underline">Courses</button>
                        <button onClick={() => scrollToSection('discuss')} className="text-blue-800 hover:underline">Discuss</button>

                    </div>
                    


                        <div className="relative w-full border-4  md:w-1/4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-4 py-2 border rounded-full focus:outline-none"
                                placeholder="Search courses..."
                            />
                            {filteredCourses.length > 0 && (
                                <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10">
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
                        <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">
                            <Link to="/login">
                                Login
                            </Link></button>
                        <button className="bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                            <Link to="/reg">
                                register
                            </Link></button>
                    </div>
                </div>
            </nav>
            <div id="home" className="pt-4">
                <Hero />
            </div>
            <div id="categories" className="pt-4">
                <Categories />
            </div>
            <div id="courses" className="pt-4">
                <Courses />
            </div>
            <div id="discuss" className="pt-4">
                <Discuss />
            </div>
        </div>
    );
}

export default Home;
