import React from 'react';
import Hero from './landingPage/Hero';
import Categories from './landingPage/Categories';
import Courses from './landingPage/Courses';
import {Link} from "react-router-dom"
const Home = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>
                    <div className="flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => scrollToSection('home')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => scrollToSection('categories')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => scrollToSection('courses')} className="text-blue-800 hover:underline">Courses</button>
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
        </div>
    );
}

export default Home;
