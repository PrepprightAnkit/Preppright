import React from "react";
import theme from '../theme';
import earn from "../../../public/earn.png";

const ReferAndWin = () => {
  const handleButtonClick = () => {
    window.open("https://forms.gle/XgCLQqcb1B8RZaax8", "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-primary-light to-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden relative">
          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 items-center">
            {/* Desktop Image - Hidden on mobile */}
            <div className="hidden md:block relative w-full">
              <img 
                src={earn} 
                alt="Refer and Win" 
                className="w-full h-auto md:h-full object-cover transform transition-transform duration-500 md:hover:scale-105"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-primary-main/10 md:hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Content - Full width on mobile, adjusted on desktop */}
            <div className="p-6 md:p-12 space-y-4 md:space-y-6 text-center md:text-left md:-ml-36">
              <h2 className={`
                text-2xl md:text-4xl 
                font-extrabold 
                ${theme.typography.gradient} 
                mb-4 
                leading-tight
                break-words
                px-4 md:px-0
              `}>
                Refer & Win 
                <br />
                Amazing Rewards
              </h2>
              
              <p className={`
                text-base md:text-xl 
                text-gray-700 
                mb-6 md:mb-8 
                leading-relaxed
                px-4 md:px-0
              `}>
                Unlock exclusive rewards by inviting friends! 
                From MacBooks to iPhones, Apple Watches, AirPods, 
                and exciting cash prizes – the more you refer, 
                the more incredible rewards you can win!
              </p>
              
              <div className="flex justify-center md:justify-start px-4 md:px-0">
                <button
                  onClick={handleButtonClick}
                  className={`
                    ${theme.components.button.base} 
                    ${theme.components.button.primary} 
                    bg-primary-main 
                    text-white 
                    font-bold 
                    py-3 md:py-4 
                    px-6 md:px-8 
                    rounded-xl 
                    text-base md:text-lg 
                    shadow-xl 
                    hover:shadow-2xl 
                    transition-all 
                    transform 
                    hover:-translate-y-1 
                    hover:scale-105 
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-primary-light
                    w-full md:w-auto
                    max-w-xs
                  `}
                >
                  Start Referring Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndWin;