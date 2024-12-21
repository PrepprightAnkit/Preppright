import {
  BookOpen as Book,
  BookOpen,
  Calculator,
  Cloud,
  Code,
  Cpu,
  DollarSign,
  FileCode,
  Globe,
  Laptop,
  Lightbulb,
  Link2,
  LogOut,
  MessageSquare,
  Network,
  Target,
  TrendingUp,Menu,Send
} from 'lucide-react';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import bg from '../assets/PreepPright.png';
import SearchComponent from './Search';
import { useNavigate } from 'react-router-dom';

const LabCard = ({ icon: Icon, title }) => (
<div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl flex items-center gap-4 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100">
  <div className="p-3 bg-indigo-50 rounded-lg">
    <Icon className="w-6 h-6 text-indigo-600" />
  </div>
  <span className="font-semibold text-gray-800">{title}</span>
</div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
<div className="flex flex-col gap-4 p-6 bg-white rounded-xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
  <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center">
    <Icon className="w-7 h-7 text-indigo-600" />
  </div>
  <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  <p className="text-gray-600 leading-relaxed">{description}</p>
</div>
);

const StatCard = ({ value, label }) => (
<div className="space-y-2">
  <span className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
    {value}
  </span>
  <p className="text-gray-300 font-medium">{label}</p>
</div>
);

const Techlab = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const handleLogout = async () => {
      await dispatch(logoutUser());
      navigate('/');
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform";

return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
    {/* Hero Section */}
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Why Must You Choose uCertify As
          <br />Your Training Partner?
        </h1>
        <p className="text-center text-gray-600 text-lg mb-20 max-w-3xl mx-auto">
          We're your one-stop shop for building in-demand IT skills and achieving real-world job readiness.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: TrendingUp,
              title: "Practical Application",
              description: "We immerse you in realistic, scenario-based simulations that mirror real-world IT tasks for targeted practice and rapid skill development."
            },
            {
              icon: Target,
              title: "Improved Accessibility",
              description: "Our unique approach centers on outcome-based scenarios, all accessible through a basic web browser or our mobile app."
            },
            {
              icon: DollarSign,
              title: "Cost-Effective Solution",
              description: "No more budget blowouts! Our virtual hands-on labs are a cost-effective alternative to expensive physical labs."
            }
          ].map((item, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-indigo-50 p-6 rounded-2xl inline-block mb-6 group-hover:bg-indigo-100 transition-colors">
                <item.icon className="w-14 h-14 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Hands-On Live Training
              <br />with the Most Trusted
              <br />Lab Provider
            </h2>
          </div>
          <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white p-10 rounded-2xl shadow-lg">
            <div className="space-y-8">
              <StatCard value="1000+" label="Hands-On Courses" />
              <StatCard value="3M+" label="Happy Customers" />
              <StatCard value="50+" label="Countries" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Lesson Plan Section */}
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img 
            src="https://img.freepik.com/free-vector/partners-holding-big-jigsaw-puzzle-pieces_74855-5278.jpg" 
            alt="Team collaboration" 
            className="rounded-2xl shadow-2xl"
          />
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Adaptable to Any{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                Lesson Plan
              </span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              uCertify LABS can be mapped to any course, textbook, or training program to provide a "hands-on" learning experience. The objective of these simulated environments is to improve comprehension and retention by adding a practical element.
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Find Lab-Rich Courses
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Labs Section */}
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">
          Types of{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            uCertify Labs
          </span>{' '}
          You Can Benefit From
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
          Recognize and correct your mistakes with our uCertify Labs to reduce errors reoccurring while on the job.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <LabCard icon={Lightbulb} title="LiveLAB" />
          <LabCard icon={Cloud} title="CloudLAB" />
          <LabCard icon={Globe} title="CyberRange" />
          <LabCard icon={Code} title="CodeLAB" />
          <LabCard icon={Cpu} title="HardwareSIM" />
          <LabCard icon={Network} title="SoftwareSIM" />
          <LabCard icon={FileCode} title="ScenarioSIM" />
          <LabCard icon={Calculator} title="MathsLAB" />
          <LabCard icon={MessageSquare} title="SmartChat" />
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">
          Safe Place to{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            Build Strong IT
          </span>{' '}
          Skills
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
          Get ready for real-world challenges with our hands-on labs that simulate actual job tasks.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Laptop}
            title="Real-World Simulations"
            description="Flexibility to explore and train in a live, non-production environment that mimics real-world scenarios."
          />
          <FeatureCard
            icon={Cloud}
            title="No Installations Required"
            description="Experiment with software/hardware without spending money on product licenses, maintenance, and configuration."
          />
          <FeatureCard
            icon={Book}
            title="Guided Learning"
            description="Achieve each lab's target with a step-by-step guided experience that is aligned perfectly with your lesson objectives."
          />
          <FeatureCard
            icon={Link2}
            title="Easy Integration"
            description="A cloud-based, device-enabled solution that can easily be integrated with an LMS and is accessible through a single sign-on (SSO)."
          />
          <FeatureCard
            icon={Network}
            title="Deep Linking"
            description="Go directly from your LMS to the exact section you need within an educational resource, like assessment, video, or lab."
          />
          <FeatureCard
            icon={BookOpen}
            title="Gradebook Syncing"
            description="Save valuable time by automating grade transfer into your LMS for a consolidated view—no more fragmented reports."
          />
        </div>
      </div>
    </section>
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Have a question, suggestion, or just want to say hello? 
                We'd love to hear from you. Fill out our quick contact form 
                and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6 text-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg">support@preppright.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <span className="text-lg">+91 9456183297</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a 
                href={googleFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium tracking-tight text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-0 bg-blue-700 opacity-50 rounded-full blur-lg transition-all duration-300 group-hover:opacity-70"></span>
                <span className="relative flex items-center space-x-3">
                  <Send className="w-6 h-6 transition-transform group-hover:rotate-6" />
                  <span>Submit a Query</span>
                </span>
              </a></div>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Courses</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Success Stories</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Programs</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FMVA Program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">CFA Training</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FRM Program</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Financial Modeling</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-100 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
              <p>© {new Date().getFullYear()} Preppright. All Rights Reserved.</p>
              <p className="mt-2">Designed with ❤️ for aspiring finance professionals</p>
            </div>
          </div>
        </div>
      </footer>
  </div>
);
};

export default Techlab;