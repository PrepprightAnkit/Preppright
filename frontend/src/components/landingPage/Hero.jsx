import React from 'react';
import heroBg from "./assets/heroBg.png";
import companiesHero from "./assets/companiesHero.png";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hero = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const scrollToCategories = () => {
        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className='mt-24 md:mt-0'>
                <Zoom cascade>
                    <section className="bg-white h-screen flex flex-col lg:flex-row items-center">
                        <div className="w-full lg:w-1/2 h-1/2 lg:h-full order-1 flex flex-col justify-center p-6 lg:p-8">
                            <Fade>
                                <div className="flex flex-col justify-center items-center h-full gap-4">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold mx-4 lg:mx-20 text-center">
                                        Investing in Knowledge and <span className="text-blue-800">Your Future</span>
                                    </h2>
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mx-4 lg:mx-20 text-center">
                                        Welcome to an inclusive online education platform that caters to learners of all backgrounds, levels, and aspirations.
                                        Our platform is designed to be accessible, flexible, and adaptable, making it the perfect choice for everyone, regardless
                                        of age or prior educational experience.
                                    </p>
                                    <button
                                        onClick={scrollToCategories}
                                        className="hidden md:block md:bg-blue-500 md:text-white md:py-2 md:px-4 md:rounded md:hover:bg-blue-700 md:mt-4"
                                    >
                                        Get Started
                                    </button>

                                    {user && user.isAdmin && (
                                        <div className='flex flex-row items-center justify-center w-full gap-2 mb-5'>
                                            <div className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                                <Link to="/Quiz">
                                                    Create a Quiz
                                                </Link>
                                            </div>
                                            <div className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                                <Link to="/uploadCat">
                                                    Upload Category
                                                </Link>
                                            </div>
                                            <div className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                                <Link to="/uploadCourse">
                                                    Upload Course
                                                </Link>
                                            </div>
                                            <div className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                                <Link to="/approveCourse">
                                                    Approve Course
                                                </Link>
                                            </div>
                                            <div className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
                                                <Link to="/uploadCourseApproval">
                                                    Upload Course Approval
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Fade>
                        </div>
                        <div className="w-full lg:w-1/2 h-1/2 lg:h-full order-2 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
                            <img
                                src={heroBg}
                                alt="Hero Image"
                                className="object-cover h-full w-full lg:w-auto"
                            />
                        </div>
                    </section>
                </Zoom>

                <div id='companies' className='flex flex-col items-center justify-center w-full mt-8'>
                    <Slide>
                        <img src={companiesHero} alt="Your companies" className='mx-4 sm:mx-8 lg:mx-11 object-contain w-11/12 lg:w-10/12' />
                    </Slide>
                </div>
            </div>
        </>
    );
}

export default Hero;
