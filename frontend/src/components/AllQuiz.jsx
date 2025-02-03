import {
    BookOpen,
    ClipboardList,
    LogOut,
    Menu,
    PlusCircle,
    Search,
    Upload,
    X
} from 'lucide-react';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import { default as bg, default as logo } from '../assets/PreepPright.png';
import SearchComponent from './Search';


const OasisQuiz = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/quiz/quizzes`);
      const data = await response.json();
      setQuizzes(data.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
      const results = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredQuizzes(results);
    } else {
      setFilteredQuizzes([]);
    }
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedAnswers({});
    setScore(null);
    setIsSubmitted(false);
  };

  const handleAnswerChange = (questionId, optionId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    }
  };

  // New function to submit quiz answers to backend
  const handleSubmitQuiz = async () => {
    if (selectedQuiz) {
      // Build answers array from the selectedAnswers state
      const answers = selectedQuiz.questions.map((question) => ({
        questionId: question._id,
        selectedOptionId: selectedAnswers[question._id] || null
      }));

      try {
        console.log(selectedQuiz,user)
        const response = await fetch(`${apiUrl}/api/v1/quiz/quizzes/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quizId: selectedQuiz._id,
            userId: user._id,
            answers
          })
        });
        const data = await response.json();
        if (data.success) {
          setScore(data.score);
          setIsSubmitted(true);
        } else {
          console.error("Submission error:", data.message);
        }
      } catch (err) {
        console.error('Error submitting quiz:', err);
      }

      // Auto close quiz modal after 2 seconds (optional)
      setTimeout(() => {
        setSelectedQuiz(null);
        setSelectedAnswers({});
        setScore(null);
        setIsSubmitted(false);
      }, 2000);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-16 sm:h-10 md:h-20 w-auto md:ml-10"
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

      {/* Header with Oasis Vibe */}
      <header
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(https://i.pinimg.com/736x/d6/70/99/d670990fa86f31233a53a22d7bb2f4bc.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-300 to-red-400 opacity-75"></div>
        <div className="relative z-10 text-center text-white">
          <img
            src={logo}
            alt="Logo"
            className="w-20 mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          />
          <h1 className="text-4xl font-bold drop-shadow-lg">Quiz</h1>
          <p className="mt-2 text-lg font-medium">
            Discover Your Hidden Knowledge Treasure!
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-orange-600 flex items-center">
            <ClipboardList className="mr-3" size={32} />
            All Quizzes
          </h2>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative w-64 md:block hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search quizzes..."
                className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500"
              />
            </div>
            <Link
              to="/createQuiz"
              className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-105"
            >
              <PlusCircle className="mr-2" size={20} /> Create Quiz
            </Link>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(searchTerm ? filteredQuizzes : quizzes).map((quiz) => (
            <div
              key={quiz._id}
              onClick={() => handleSelectQuiz(quiz)}
              className="cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-orange-200 rounded-xl overflow-hidden bg-white"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-orange-600">{quiz.title}</h3>
                  <BookOpen size={24} className="text-orange-500" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {quiz.questions.length} Questions
                  </span>
                  <span className="text-sm text-green-600 font-bold">
                    Begin Journey
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiz Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 animate-fadeIn relative">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
              >
                <X size={28} />
              </button>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                  {selectedQuiz.title}
                </h3>
                {selectedQuiz.questions.map((question, index) => (
                  <div key={question._id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <p className="text-lg font-semibold mb-4">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option._id}
                          className={`block p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                            isSubmitted && option.isCorrect
                              ? 'bg-green-100 border-green-500'
                              : selectedAnswers[question._id] === option._id
                              ? 'bg-blue-100 border-blue-500'
                              : 'bg-white hover:bg-blue-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name={question._id}
                            value={option._id}
                            checked={selectedAnswers[question._id] === option._id}
                            onChange={() => handleAnswerChange(question._id, option._id)}
                            className="mr-3"
                            disabled={isSubmitted}
                          />
                          {option.text}
                          {isSubmitted && option.isCorrect && (
                            <span className="ml-2 text-green-600 font-bold">(Correct)</span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length !== selectedQuiz.questions.length}
                    className={`w-full py-3 rounded-full transition-colors ${
                      Object.keys(selectedAnswers).length === selectedQuiz.questions.length
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="text-center mt-6">
                    <p
                      className={`text-2xl font-bold mb-4 ${
                        score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}
                    >
                      Your Score: {score ? score.toFixed(2) : 0}%
                    </p>
                    <p className="text-sm text-gray-600">
                      {score >= 70
                        ? 'Outstanding! You found the oasis of knowledge.'
                        : score >= 50
                        ? 'Not bad! Keep exploring and practicing.'
                        : 'Don’t worry – every desert has an oasis. Try again!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300 z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default OasisQuiz;
