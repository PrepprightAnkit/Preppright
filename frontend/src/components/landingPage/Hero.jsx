import React from 'react';
import heroBg from "./assets/heroBg.png";
import companiesHero from "./assets/companiesHero.png";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
const Hero = () => {
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
                        <div className="w-full lg:w-1/2 h-1/2 lg:h-full order-1 flex flex-col justify-center p-8">
                            <Fade>
                                <div className="flex flex-col justify-center items-center h-full gap-4">
                                    <h2 className="text-4xl lg:text-8xl font-bold mx-4 lg:mx-20">
                                        Investing in Knowledge and <span className="text-blue-800">Your Future</span>
                                    </h2>
                                    <p className="text-lg mx-4 lg:mx-20">
                                        Welcome to an inclusive online education platform that caters to learners of all backgrounds, levels, and aspirations.
                                        Our platform is designed to be accessible, flexible, and adaptable, making it the perfect choice for everyone, regardless
                                        of age or prior educational experience.
                                    </p>
                                    <button
                                        onClick={scrollToCategories}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </Fade>
                        </div>
                        <div className="w-full lg:w-1/2 h-1/2 lg:h-full order-2 flex justify-center lg:justify-end items-center">

                            <img
                                src={heroBg}
                                alt="Hero Image"
                                className="object-cover h-full w-full lg:w-auto"
                            />
                        </div>
                    </section>
                </Zoom>

                <div id='companies' className='flex flex-col items-center justify-center w-full'>
                    <Slide>
                        <img src={companiesHero} alt="Your companies" className='mx-11 object-contain w-10/12' />
                    </Slide>
                </div>
            </div>
        </>
    );
}

export default Hero;
