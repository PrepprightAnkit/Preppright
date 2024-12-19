
import {
  Award,
  Book,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code,
  Globe,
  Layout,
  Link,
  LogOut,
  Menu,
  Plus,
  Send,
  Server,
  Star,
  Trophy,
  Users,
  XCircle,
  Zap
} from 'lucide-react';
import { default as React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bg from '../assets/PreepPright.png';
import { courseService } from './courseApiService';
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
const Syllabus = ({syllabusData}) => {
  

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-auto py-16 px-4">
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
const CourseDetails = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate('/');
    };
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await courseService.getCourseById(id);
        setCourse(courseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Icon mapping function
  const getFeatureIcon = (title) => {
    const iconMap = {
      'Learn Concepts': <Book className="w-10 h-10 text-blue-500" />,
      'Hands-on Practice': <Zap className="w-10 h-10 text-green-500" />,
      'Test Yourself': <CheckCircle className="w-10 h-10 text-purple-500" />,
      'Expert Support': <Users className="w-10 h-10 text-orange-500" />
    };
    return iconMap[title] || <Zap className="w-10 h-10 text-blue-500" />;
  };

  const getProjectIcon = (title) => {
    const iconMap = {
      'Property Price Prediction': <Globe className="w-10 h-10 text-blue-600" />,
      'Customer Churn Prediction': <Code className="w-10 h-10 text-green-600" />,
      'Early Disease Detection': <Trophy className="w-10 h-10 text-purple-600" />
    };
    return iconMap[title] || <Trophy className="w-10 h-10 text-purple-600" />;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course details</div>;
  if (!course) return <div>No course found</div>;
  

  const icons = [
    <Code className="h-10 w-10 text-blue-500" />, // Blue for coding
    <Layout className="h-10 w-10 text-green-500" />, // Green for layout/design
    <Server className="h-10 w-10 text-purple-500" />, // Purple for backend/server
  ];
  
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

  return (
    <>
    {/* Hero Section */}
    <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-20 w-auto md:ml-10"
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                            <button
                             className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
    key={item}
    onClick={() => {
      switch (item) {
        case 'Home':
          navigate('/');
          break;
        case 'Categories':
          navigate('/allCat');
          break;
        case 'Courses':
          navigate('/allCourses');
          break;
        case 'Quiz':
          navigate('/allQuiz');
          break;
        default:
          scrollToSection(item.toLowerCase());
      }
    }}
  >
    {item}
  </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
            <div className="relative">
                <SearchComponent/>

        </div>
        </div>


                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                {user.isAdmin && (
                                    <Link
                                        to="/uploadContent" 
                                        className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full transition-colors"
                                    >
                                        <Upload size={18} className="mr-2" /> Upload
                                    </Link>
                                )}
                               {/* <Link 
                                    to="/userProfile" 
                                    className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </Link> */}
                                <button 
                                    onClick={(e) => {navigate("/userProfile")}}
                                    className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <LogOut size={18} className="mr-2" /> Profile
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-full transition-colors"
                                >
                                    <LogOut size={18} className="mr-2" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <Link 
                                    to="/login" 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/reg" 
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-blue-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white absolute w-full shadow-lg">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {/* Mobile Navigation Links */}
                            {['Home', 'Categories', 'Courses', 'Discuss', 'Quiz'].map((item) => (
                                <button 
                                    key={item} 
                                    onClick={() => item === 'Quiz' 
                                        ? navigate('/allQuiz') 
                                        : scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left py-2 text-blue-800 hover:bg-blue-50"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Mobile Search */}
                            <div className="relative w-full mt-2">
                                <SearchComponent/>
                            </div>

                            {/* Mobile Auth Buttons */}
                            {isAuthenticated ? (
                                <div className="space-y-2 mt-2">
                                    {user.isAdmin && (
                                        <Link 
                                            to="/uploadContent" 
                                            className="block w-full text-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full transition-colors"
                                        >
                                            Upload Content
                                        </Link>
                                    )}
                                    <Link 
                                        to="/userProfile" 
                                        className="block w-full text-center bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
                                    >
                                        My Profile
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-center bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-full transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 mt-2">
                                    <Link 
                                        to="/login" 
                                        className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/reg" 
                                        className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
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
                <span>{course.rating}/5 Rating</span>
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            {course.title}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
            {course.tagline}            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-100 transition transform hover:scale-105 shadow-lg">
                Enroll Now
              </button>
              <button
  className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition transform hover:scale-105"
  onClick={() => document.getElementById('course-prices-section').scrollIntoView({ behavior: 'smooth' })}
>
  View Brochure
</button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-300">{course.duration} Months</h3>
                  <p className="text-sm text-blue-100">Course Duration</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-300">{course.totalCourseFee}</h3>
                  <p className="text-sm text-blue-100">Total Course Fee</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-300">{course.projectCount}</h3>
                  <p className="text-sm text-blue-100">Major Projects</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-300">
  {course.placementAssistance ? "100%" : course.placementAssistance}
</h3>
                  <p className="text-sm text-blue-100">Placement Assist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
  <div className="bg-white text-gray-900">
  <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
    <div className="md:w-2/3 space-y-6">
      <h1 className="text-5xl font-bold text-gray-800">
        {course.aboutTitle}
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed">
       {course.aboutDescription} </p>
      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 shadow-lg">
          Enroll Now
        </button>
        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105"
        onClick={() => document.getElementById('course-about-section').scrollIntoView({ behavior: 'smooth' })}>
          Learn More
        </button>
      </div>
    </div>
    <div className="md:w-1/3 hidden md:block px-10">
      <img 
        src={course.aboutImgUrl}
        alt={course.aboutTitle}
        className="rounded-xl shadow-md"
      />
    </div>
  </div>
</div>
      {/* Syllabus Component */}
<div id="course-about-section">
  <Syllabus syllabusData={course.syllabus}/>
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
      {/* Key changes are in these classes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {/* Center the grid items within their columns */}
        <div className="col-span-full md:col-span-3 flex flex-wrap justify-center gap-8">
          {course.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-transform hover:scale-105 w-full md:w-80"
            >
              <div className="flex justify-center mb-6">
                {icons[index % icons.length]}
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">
                {project.name}
              </h3>
              <p className="text-center text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
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
  <div id="course-prices-section">
  <CoursePrices course={course} />
</div>
{/* table section */}
<div className="max-w-7xl mx-auto text-center mb-12">
  <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
    Why Learn with PrepRight Trainings?
  </h1>
  <p className="mt-3 text-xl text-gray-600">
    Unlock Your Potential with Industry-Leading Education
  </p>
</div>
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Your Instructors
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {course.instructors.map((instructor) => (
            <div 
              key={instructor.name} 
              className="bg-white rounded-2xl shadow-2xl transform transition-all hover:-translate-y-2 hover:shadow-3xl p-8 flex flex-col items-center"
            >
              <img 
                src={instructor.image || "/api/placeholder/400/400"} 
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

      {/* Reviews Section */}
      <ReviewCarousel reviews={course.reviews} />
      <ContactFooter/>
    </>
  );
};

export default CourseDetails;

const ContactFooter = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform";

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have a question, suggestion, or just want to say hello? 
              We'd love to hear from you. Fill out our quick contact form 
              and we'll get back to you as soon as possible.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@preppright.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>+91 9456183297</span>
              </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="flex justify-center">
            <a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center 
                         px-8 py-4 text-lg font-medium tracking-tighter 
                         text-white bg-blue-600 rounded-lg 
                         hover:bg-blue-700 transition duration-300 
                         transform hover:-translate-y-1 hover:shadow-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2"
            >
              <span className="absolute inset-0 bg-blue-700 opacity-50 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-70"></span>
              <span className="relative flex items-center space-x-3">
                <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                <span>Submit a Query</span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Footer Line */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          © {new Date().getFullYear()} Preppright. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
  
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import CoursePrices from './Courseprices';
import SearchComponent from './Search';

const ReviewCarousel = ({ reviews }) => {
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
        className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`} 
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentReview}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.img 
                src={reviews[currentReview].image || "/api/placeholder/100/100"} 
                alt={reviews[currentReview].name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-white"
              />
            </div>
            
            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
              {reviews[currentReview].name}
            </h3>
            <p className="text-indigo-600 text-lg mb-4">
              {reviews[currentReview].role}
            </p>
            
            <div className="flex justify-center mb-4">
              {renderStars(reviews[currentReview].rating)}
            </div>
            
            <p className="text-gray-600 text-xl italic max-w-2xl mx-auto mb-8">
              "{reviews[currentReview].text}"
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
          <motion.button 
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/50 hover:bg-white/75 backdrop-blur-sm p-3 rounded-full shadow-md"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </motion.button>
          <motion.button 
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/50 hover:bg-white/75 backdrop-blur-sm p-3 rounded-full shadow-md"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </motion.button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {reviews.map((_, index) => (
            <motion.button 
              key={index}
              onClick={() => setCurrentReview(index)}
              animate={{ 
                scale: index === currentReview ? 1.2 : 1,
                backgroundColor: index === currentReview ? '#4f46e5' : '#cbd5e1'
              }}
              className="w-3 h-3 rounded-full transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};