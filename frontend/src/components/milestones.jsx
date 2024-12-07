import { GraduationCapIcon, HandshakeIcon, LaptopIcon, TrophyIcon } from 'lucide-react';
import React from 'react';

const LeverageEdu = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-600 to-purple-700 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Your Gateway to Global Education
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 opacity-90">
            Empowering students to achieve their dream education with personalized guidance and unparalleled support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* University Partners */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl
                         group relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="mb-4 flex justify-center">
              <HandshakeIcon className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">850+ University Partners</h3>
            <p className="text-gray-600">Global network of top-tier institutions</p>
          </div>

          {/* Success Stories */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl
                         group relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-green-400 to-teal-500"></div>
            <div className="mb-4 flex justify-center">
              <TrophyIcon className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">45,000+ Success Stories</h3>
            <p className="text-gray-600">Transforming dreams into achievements</p>
          </div>

          {/* Scholarship */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl
                         group relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
            <div className="mb-4 flex justify-center">
              <GraduationCapIcon className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Scholarship up to 50%*</h3>
            <p className="text-gray-600">Unlock your academic potential</p>
          </div>

          {/* Courses */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl
                         group relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 to-pink-500"></div>
            <div className="mb-4 flex justify-center">
              <LaptopIcon className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Courses starting at ₹8 Lakhs*</h3>
            <p className="text-gray-600">Affordable world-class education</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeverageEdu;