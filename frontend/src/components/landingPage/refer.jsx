import React from "react";
import { Gift, Smartphone, Laptop, Watch, DollarSign } from "lucide-react";
import theme from '../theme';
import earn from "../../../public/earn.png";

const ReferAndWin = () => {
  const handleButtonClick = () => {
    window.open("https://forms.gle/XgCLQqcb1B8RZaax8", "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-primary-light to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden relative">
          {/* Decorative Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-light/30 to-transparent opacity-50 pointer-events-none z-0"></div>
          
          {/* Main Content Container */}
          <div className="relative z-10 grid md:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div className="hidden md:block relative">
              <img 
                src={earn} 
                alt="Refer and Win" 
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-primary-main/10 hover:bg-transparent transition-colors duration-500"></div>
            </div>
            
            {/* Right Side - Content */}
            <div className="pl-0 -ml-36 p-12 space-y-6 text-center md:text-left">
              <h2 className={`text-4xl font-extrabold ${theme.typography.gradient} mb-4 leading-tight`}>
                Refer & Win 
                <br />
                Amazing Rewards
              </h2>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Unlock exclusive rewards by inviting friends! 
                From MacBooks to iPhones, Apple Watches, AirPods, 
                and exciting cash prizes – the more you refer, 
                the more incredible rewards you can win!
              </p>
              
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleButtonClick}
                  className={`
                    ${theme.components.button.base} 
                    ${theme.components.button.primary} 
                    bg-primary-main 
                    text-white 
                    font-bold 
                    py-4 px-8 
                    rounded-xl 
                    text-lg 
                    shadow-xl 
                    hover:shadow-2xl 
                    transition-all 
                    transform 
                    hover:-translate-y-1 
                    hover:scale-105 
                    focus:outline-none 
                    focus:ring-4 
                    focus:ring-primary-light
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