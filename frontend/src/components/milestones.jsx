import { GraduationCapIcon, HandshakeIcon, LaptopIcon, TrophyIcon } from 'lucide-react';
import React from 'react';
import theme from './theme';
const LeverageEdu = () => {
  return (
    <div className={`w-full bg-gradient-to-br ${theme.colors.primary.gradient} ${theme.spacing.section}`}>
      <div className={theme.spacing.container}>
        <div className="text-center text-white mb-12">
          <h1 className={theme.typography.hero}>
            Your Gateway to Global Education
          </h1>
          <p className={`${theme.typography.subheading} max-w-3xl mx-auto text-gray-100 opacity-90`}>
            Empowering students to achieve their dream education with personalized guidance and unparalleled support.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: HandshakeIcon,
              title: "850+ University Partners",
              description: "Global network of top-tier institutions",
              gradient: "from-indigo-500 to-indigo-600"
            },
            {
              icon: TrophyIcon,
              title: "45,000+ Success Stories",
              description: "Transforming dreams into achievements",
              gradient: "from-green-400 to-green-600"
            },
            {
              icon: GraduationCapIcon,
              title: "Scholarship up to 50%*",
              description: "Unlock your academic potential",
              gradient: "from-yellow-400 to-yellow-600"
            },
            {
              icon: LaptopIcon,
              title: "Courses starting at ₹8 Lakhs*",
              description: "Affordable world-class education",
              gradient: "from-indigo-500 to-indigo-600"
            }
          ].map((item, index) => (
            <div key={index} className={`${theme.components.card.base} ${theme.components.card.hover} ${theme.components.card.padding} backdrop-blur-sm relative overflow-hidden text-center`}>
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.gradient}`}></div>
              <div className="mb-4 flex justify-center">
                <item.icon className={`${theme.components.icon.size} ${theme.components.icon.color}`} />
              </div>
              <h3 className={`${theme.typography.subheading} mb-3 text-gray-800`}>{item.title}</h3>
              <p className={theme.typography.body}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeverageEdu;