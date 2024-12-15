import {
    Award,
    Book,
    CheckCircle,
    CheckCircle2,
    ChevronDown,
    ChevronLeft, ChevronRight,
    Code,
    Globe,
    Quote,
    Star,
    Trophy,
    Users,
    XCircle,
    Zap
} from 'lucide-react';
import React, { useState } from 'react';

import {
    Plus // Adding Plus icon
} from 'lucide-react';

const SyllabusAccordion = ({ title, modules, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <Plus className="w-8 h-8 text-blue-600" /> {/* Replace with consistent Plus icon */}
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="p-6 bg-white">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="mb-4 pb-4 border-b last:border-b-0 border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h4 className="text-lg font-medium text-gray-800">{module.name}</h4>
              </div>
              <p className="text-gray-600 ml-11">{module.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Syllabus = () => {
  const syllabusData = [
    {
      title: "Python Fundamentals",
      modules: [
        { 
          name: "Python Basics", 
          description: "Variables, data types, operators, and basic syntax" 
        },
        { 
          name: "Control Structures", 
          description: "Conditional statements, loops, and functions" 
        },
        { 
          name: "Data Structures", 
          description: "Lists, tuples, dictionaries, and set operations" 
        }
      ]
    },
    {
      title: "Machine Learning Foundations",
      modules: [
        { 
          name: "Statistical Concepts", 
          description: "Probability, hypothesis testing, and statistical inference" 
        },
        { 
          name: "ML Algorithms", 
          description: "Regression, classification, and clustering techniques" 
        },
        { 
          name: "Model Evaluation", 
          description: "Performance metrics, cross-validation, and model tuning" 
        }
      ]
    },
    {
      title: "Advanced Data Science",
      modules: [
        { 
          name: "Deep Learning", 
          description: "Neural networks, TensorFlow, and Keras implementation" 
        },
        { 
          name: "Natural Language Processing", 
          description: "Text preprocessing, sentiment analysis, and language models" 
        },
        { 
          name: "Computer Vision", 
          description: "Image recognition, CNN architectures, and practical applications" 
        }
      ]
    },
    {
      title: "Real-World Projects",
      modules: [
        { 
          name: "Property Price Prediction", 
          description: "End-to-end ML project using real estate datasets" 
        },
        { 
          name: "Customer Churn Analysis", 
          description: "Predictive modeling for telecom industry retention" 
        },
        { 
          name: "Healthcare ML Application", 
          description: "Early disease detection using medical imaging" 
        }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Course Syllabus
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive curriculum designed to transform you into a skilled Data Scientist
          </p>
        </div>

        {syllabusData.map((section, index) => (
          <SyllabusAccordion 
            key={index}
            title={section.title}
            modules={section.modules}
          />
        ))}

        <div className="mt-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-center space-x-4">
              <Zap className="w-10 h-10 text-yellow-500" />
              <p className="text-lg text-gray-700">
                Hands-on learning with industry-relevant projects and expert guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCarousel = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Data Scientist at Google",
      text: "This course transformed my career. The practical approach and expert guidance were game-changers in my machine learning journey.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer at Microsoft",
      text: "Incredibly comprehensive curriculum. The hands-on projects gave me real-world skills that directly translated to my professional work.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Emily Rodriguez",
      role: "AI Research Associate",
      text: "The instructors are world-class. Their deep industry knowledge and personalized mentorship made all the difference in my learning.",
      rating: 4,
      image: "/api/placeholder/100/100"
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevious = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-6 h-6 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-[500px] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="relative p-8 md:p-12">
          {/* Quote Icon */}
          <Quote className="absolute top-4 left-4 text-blue-200 w-16 h-16 opacity-50" />
          
          {/* Review Content */}
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <img 
                src={reviews[currentReview].image} 
                alt={reviews[currentReview].name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {reviews[currentReview].name}
            </h3>
            <p className="text-blue-600 mb-4">
              {reviews[currentReview].role}
            </p>
            
            <div className="flex justify-center mb-4">
              {renderStars(reviews[currentReview].rating)}
            </div>
            
            <p className="text-gray-600 italic text-lg mb-6">
              "{reviews[currentReview].text}"
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handlePrevious}
              className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleNext}
              className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {reviews.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentReview 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-blue-200 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const Test = () => {

    const courseFeatures = [
        {
          icon: <Book className="w-10 h-10 text-blue-500" />,
          title: "Learn Concepts",
          description: "Comprehensive training videos covering key machine learning concepts"
        },
        {
          icon: <Zap className="w-10 h-10 text-green-500" />,
          title: "Hands-on Practice",
          description: "Practical assignments and real-world projects to apply your skills"
        },
        {
          icon: <CheckCircle className="w-10 h-10 text-purple-500" />,
          title: "Test Yourself",
          description: "Regular quizzes and module tests to assess your progress"
        },
        {
          icon: <Users className="w-10 h-10 text-orange-500" />,
          title: "Expert Support",
          description: "1:1 doubt solving with industry experts within 24 hours"
        }
      ];

      const courseProjects = [
        {
          icon: <Globe className="w-10 h-10 text-blue-600" />,
          title: "Property Price Prediction",
          description: "Develop predictive models for real estate valuation using advanced ML techniques"
        },
        {
          icon: <Code className="w-10 h-10 text-green-600" />,
          title: "Customer Churn Prediction",
          description: "Build classification models to predict customer retention in telecom industry"
        },
        {
          icon: <Trophy className="w-10 h-10 text-purple-600" />,
          title: "Early Disease Detection",
          description: "Create ML models for early medical diagnosis using patient data"
        }
      ];
return (
<>
<div className="bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Selling
              </span>
              <span className="flex items-center space-x-1 text-yellow-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.8/5 Rating</span>
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Master Machine Learning with Guaranteed Placement
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive 6-month online course covering Python, Machine Learning, and AI with hands-on projects and 100% placement support.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-100 transition transform hover:scale-105 shadow-lg">
                Enroll Now
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition transform hover:scale-105">
                Download Brochure
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-300">6 Months</h3>
                  <p className="text-sm text-blue-100">Course Duration</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-300">₹42,000</h3>
                  <p className="text-sm text-blue-100">Total Course Fee</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-300">3</h3>
                  <p className="text-sm text-blue-100">Major Projects</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-pink-300">100%</h3>
                  <p className="text-sm text-blue-100">Placement Assist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-gray-900">
  {/* Hero Section */}
  <div className="bg-white text-gray-900">
  <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
    <div className="md:w-2/3 space-y-6">
      <h1 className="text-5xl font-bold text-gray-800">
        Master Machine Learning in 6 Weeks
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed">
        Join a revolutionary course that prepares you for the AI-driven future. With a potential 
        <span className="font-bold text-blue-600"> $15.7 trillion </span> 
        contribution to the global economy by 2030, machine learning is your gateway to success.
      </p>
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 shadow-lg">
          Enroll Now
        </button>
        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105">
          Learn More
        </button>
      </div>
    </div>
    <div className="md:w-1/3 hidden md:block px-10">
      <img 
        src="https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2021-12/machine-learning-examples-applications.png" 
        alt="Machine Learning Illustration" 
        className="rounded-xl shadow-md"
      />
    </div>
  </div>
</div>

<div>
  <Syllabus/>
</div>


  {/* Course Features */}
  <div className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Your Learning Journey
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {courseFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Projects Section */}
  <div className="container mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
      Real-World Projects
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {courseProjects.map((project, index) => (
        <div 
          key={index} 
          className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-transform hover:scale-105"
        >
          <div className="flex justify-center mb-6">{project.icon}</div>
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">{project.title}</h3>
          <p className="text-center text-gray-600">{project.description}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Certification Section */}
  <div className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Certification & Recognition
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Award className="w-12 h-12 text-yellow-500" />, title: "Course Completion", description: "Official certificate from Yhills" },
          { icon: <Star className="w-12 h-12 text-blue-600" />, title: "Industry Certificate", description: "Recognized by top companies" },
          { icon: <Trophy className="w-12 h-12 text-green-500" />, title: "Internship Certificate", description: "Post-course internship recognition" }
        ].map((cert, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-transform hover:scale-105"
          >
            <div className="flex justify-center mb-4">{cert.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">{cert.title}</h3>
            <p className="text-gray-600">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
  <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
    Why Learn with PrepRight Trainings?
  </h1>
  <p className="mt-3 text-xl text-gray-600">
    Unlock Your Potential with Industry-Leading Education
  </p>
</div>

{/* Comparison Table */}
<div className="max-w-6xl mx-auto mb-16">
  <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Benefits</th>
            <th className="px-6 py-4 text-center font-semibold bg-blue-700">PrepRight Trainings</th>
            <th className="px-6 py-4 text-center font-semibold">Other Platforms</th>
            <th className="px-6 py-4 text-center font-semibold">YouTube</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Government certified by NSDC",
            "Certified by IIT Madras",
            "Free placement assistance",
            "3x visibility in recruiter searches",
            "Direct interview invites",
            "Industry-ready curriculum & projects",
            "Real-time doubt resolution",
            "Trainer from the MNC's",
            "One-on-one interaction",
            "Live training",
            "100% job assistant"
          ].map((benefit, index) => (
            <tr
              key={benefit}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
            >
              <td className="px-6 py-4 text-gray-800 font-medium">{benefit}</td>
              <td className="px-6 py-4 text-center bg-blue-50 font-semibold">
                <CheckCircle2 className="mx-auto text-green-600 w-6 h-6" />
              </td>
              <td className="px-6 py-4 text-center">
                <XCircle className="mx-auto text-red-600 w-6 h-6" />
              </td>
              <td className="px-6 py-4 text-center">
                <XCircle className="mx-auto text-red-600 w-6 h-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      {/* Instructors Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Your Instructors
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              name: "Mohd Raza",
              role: "Lead Instructor, Data Science",
              bio: "A well-experienced and passionate professional with over 9 years of expertise in Data Science, specializing in Python, SQL, Power BI, Machine Learning (ML), Deep Learning (DL), and Big Data Analytics. As a Microsoft Certified Trainer and ACLP-certified from Singapore, Raza has excelled in curriculum development and delivering high-impact, engaging training.",
              image: "/api/placeholder/400/400"
            },
            {
              name: "Akanksha Roy",
              role: "Instructional Designer",
              bio: "With experience in creating e-learning training programs on various subjects, Akanksha holds a postgraduate qualification in Human Resource and a B.E. degree in Computer Science. She skillfully manages course creation, ensuring a seamless learning experience.",
              image: "/api/placeholder/400/400"
            }
          ].map((instructor) => (
            <div 
              key={instructor.name} 
              className="bg-white rounded-2xl shadow-2xl transform transition-all hover:-translate-y-2 hover:shadow-3xl p-8 flex flex-col items-center"
            >
              <img 
                src={instructor.image} 
                alt={instructor.name} 
                className="w-32 h-32 rounded-full border-4 border-blue-500 mb-6 object-cover"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{instructor.role}</p>
              <div className="h-1 w-16 bg-blue-500 mb-4"></div>
              <p className="text-gray-600 text-center">{instructor.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      <ReviewCarousel/>
    </div>

</>
);
};

export default Test;