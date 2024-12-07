import {
  GraduationCapIcon,
  HandshakeIcon,
  LaptopIcon,
  TrophyIcon
} from 'lucide-react';
import React from 'react';

const LeverageEdu = () => {
  const features = [
    {
      icon: HandshakeIcon,
      title: "850+ University Partners",
      description: "Global network of top-tier institutions",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: TrophyIcon,
      title: "45,000+ Success Stories",
      description: "Transforming dreams into achievements",
      gradient: "from-green-400 to-teal-500"
    },
    {
      icon: GraduationCapIcon,
      title: "Scholarship up to 50%*",
      description: "Unlock your academic potential",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: LaptopIcon,
      title: "Courses starting at ₹8 Lakhs*",
      description: "Affordable world-class education",
      gradient: "from-indigo-500 to-pink-500"
    }
  ];

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
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl 
                         group relative overflow-hidden text-center"
            >
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${feature.gradient}`}></div>
              <feature.icon 
                className={`h-12 w-12 mx-auto mb-4 z-10 relative text-transparent bg-clip-text 
                            bg-gradient-to-br ${feature.gradient}`} 
              />
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeverageEdu;