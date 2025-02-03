import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ClipboardList,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Upload,
  User,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';

// Import your logo and any creative background images
import logo from '../assets/PreepPright.png';// A creative background image for the header

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

  const calculateScore = () => {
    if (selectedQuiz) {
      const total = selectedQuiz.questions.length;
      let correct = 0;
      selectedQuiz.questions.forEach((question) => {
        const selectedId = selectedAnswers[question._id];
        const correctOption = question.options.find((option) => option.isCorrect);
        if (correctOption && correctOption._id === selectedId) {
          correct++;
        }
      });
      const calculatedScore = (correct / total) * 100;
      setScore(calculatedScore);
      setIsSubmitted(true);

      // Update backend score
      fetch(`${apiUrl}/api/v1/users/updateQuiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          quizId: selectedQuiz._id,
          score: calculatedScore.toFixed(2)
        })
      })
        .then((res) => res.json())
        .then((data) => console.log('Score updated:', data))
        .catch((err) => console.error('Error updating score:', err));

      // Auto close quiz modal after 2 seconds
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
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-orange-500 hover:text-orange-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className="hidden md:flex items-center space-x-6">
              {['Home', 'Explore', 'Courses', 'Forum', 'Quiz'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    item === 'Quiz'
                      ? navigate('/allQuiz')
                      : navigate(`/${item.toLowerCase()}`)
                  }
                  className="text-orange-600 font-semibold hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block w-1/3">
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
            {filteredQuizzes.length > 0 && (
              <div className="absolute w-full bg-white shadow rounded-lg mt-2 max-h-60 overflow-y-auto">
                {filteredQuizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
                    onClick={() => {
                      handleSelectQuiz(quiz);
                      setSearchTerm('');
                      setFilteredQuizzes([]);
                    }}
                  >
                    {quiz.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/uploadContent"
                    className="flex items-center bg-orange-100 hover:bg-orange-200 px-3 py-2 rounded-full transition-colors"
                  >
                    <Upload size={18} className="mr-2" /> Upload
                  </Link>
                )}
                <Link
                  to="/userProfile"
                  className="flex items-center bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-full transition-colors"
                >
                  <User size={18} className="mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-red-100 hover:bg-red-200 px-3 py-2 rounded-full transition-colors"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/reg"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'Explore', 'Courses', 'Quiz'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    item === 'Quiz'
                      ? navigate('/allQuiz')
                      : navigate(`/${item.toLowerCase()}`);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-orange-600 hover:bg-orange-50"
                >
                  {item}
                </button>
              ))}
              <div className="relative mt-2">
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
              <div className="mt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    {user.isAdmin && (
                      <Link
                        to="/uploadContent"
                        className="block w-full text-center bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-full"
                      >
                        Upload
                      </Link>
                    )}
                    <Link
                      to="/userProfile"
                      className="block w-full text-center bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center bg-red-100 hover:bg-red-200 px-4 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full"
                    >
                      Login
                    </Link>
                    <Link
                      to="/reg"
                      className="block w-full text-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
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
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Quiz
          </h1>
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
                    onClick={calculateScore}
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
