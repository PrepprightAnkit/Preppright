import {
    Award,
    BarChart,
    BookOpen,
    Bot,
    Brain,
    ClipboardCheck,
    FileCheck,
    FileText,
    Globe,
    Layout,
    MessageSquare,
    UserCheck,
    Users,
    Video
} from 'lucide-react';
import React from 'react';

const PricingCard = ({ title, price, icon: Icon, features, isPrimary }) => (
  <div className={`rounded-3xl p-6 ${isPrimary ? 'bg-violet-600 text-white' : 'bg-white'} 
                   shadow-lg flex flex-col h-full`}>
    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 mb-4">
      <Icon className={`w-6 h-6 ${isPrimary ? 'text-violet-600' : 'text-violet-600'}`} />
    </div>
    
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <div className="flex items-baseline mb-6">
      <span className="text-3xl font-bold">₹{price}</span>
      <span className="text-sm ml-1">/Course</span>
    </div>
    
    <h3 className="font-medium mb-4">You'll Get Access to:</h3>
    <ul className="space-y-3 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <feature.icon className="w-5 h-5 mr-3 flex-shrink-0" />
          <span className="text-sm">{feature.text}</span>
        </li>
      ))}
    </ul>
    
    <button className={`mt-6 py-3 px-6 rounded-full text-center font-medium
                      ${isPrimary 
                        ? 'bg-white text-violet-600 hover:bg-gray-100' 
                        : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
      Start Learning
    </button>
  </div>
);

const CoursePrices = ({course}) => {
  const plans = [
    {
      title: "Self-Paced Program",
      price: "3,000",
      icon: BookOpen,
      features: [
        { icon: Video, text: "Recorded Video Lectures" },
        { icon: ClipboardCheck, text: "Quiz & Assessments" },
        { icon: FileCheck, text: "Industry based Projects" },
        { icon: Globe, text: "Course Completion Certificate" },
        { icon: Layout, text: "Personal Dashboard" }
      ]
    },
    {
      title: "Mentor-Led Program",
      price: "6,000",
      icon: Users,
      features: [
        { icon: Users, text: "Live Mentorship" },
        { icon: FileCheck, text: "Project-Based Learning" },
        { icon: Video, text: "Recorded Video Lectures" },
        { icon: MessageSquare, text: "Doubt Clearing Sessions" },
        { icon: BarChart, text: "Industry graded Certificates" },
        { icon: ClipboardCheck, text: "Quiz & Assessments" },
        { icon: Layout, text: "Personal Dashboard" }
      ]
    },
    {
      title: "Professional Program",
      price: "9,000",
      icon: Award,
      features: [
        { icon: Brain, text: "Aptitude Grooming" },
        { icon: FileText, text: "Specific Resume Building" },
        { icon: UserCheck, text: "Personality Development" },
        { icon: Users, text: "Group Discussion Session" },
        { icon: Award, text: "Placement Assistance" },
        { icon: Globe, text: "LinkedIn Optimization Session" },
        { icon: Layout, text: "Access to Career Portal" },
        { icon: Bot, text: "AI Mock Interview Portal" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {course.title} Course
        </h1>
        <p className="text-gray-600 text-lg">
          Quality learning, simplified and budget-friendly – just for you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            icon={plan.icon}
            features={plan.features}
            isPrimary={index === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePrices;