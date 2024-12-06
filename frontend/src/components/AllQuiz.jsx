import {
    BookOpen,
    ClipboardList,
    LogOut,
    Menu,
    Search,
    Upload,
    User,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

// Import your logo
import bg from '../assets/PreepPright.png';

const AllQuizzes = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

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
        if (value !== '') {
            const results = quizzes.filter(quiz => 
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
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    const calculateScore = () => {
        if (selectedQuiz) {
            const totalQuestions = selectedQuiz.questions.length;
            let correctAnswers = 0;

            selectedQuiz.questions.forEach((question) => {
                const selectedOptionId = selectedAnswers[question._id];
                const correctOption = question.options.find((option) => option.isCorrect);

                if (correctOption && correctOption._id === selectedOptionId) {
                    correctAnswers += 1;
                }
            });

            const calculatedScore = (correctAnswers / totalQuestions) * 100;
            setScore(calculatedScore);
            setIsSubmitted(true);

            // Update score in the backend
            fetch(`${apiUrl}/api/v1/users/updateQuiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    quizId: selectedQuiz._id,
                    score: calculatedScore.toFixed(2),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Score updated successfully:', data);
                })
                .catch((error) => console.error('Error updating score:', error));

            // Unselect the quiz after 2 seconds
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
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <img 
                        src={bg} 
                        alt="Preep Logo" 
                        className="h-10 w-auto cursor-pointer"
                        onClick={() => navigate('/')}
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {['Home', 'Categories', 'Courses','Discuss', 'Quiz'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => item === 'Quiz' 
                                    ? navigate('/allQuiz') 
                                    : navigate(`/`)}
                                className="text-blue-800 hover:text-blue-600 transition-colors font-semibold"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative hidden md:block w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search quizzes..."
                            />
                            <Search 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                        </div>
                        {filteredQuizzes.length > 0 && (
                            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
                                {filteredQuizzes.map((quiz) => (
                                    <div
                                        key={quiz._id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                                <Link 
                                    to="/userProfile" 
                                    className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-full transition-colors"
                                >
                                    <User size={18} className="mr-2" /> Profile
                                </Link>
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
                            {['Home', 'Categories', 'Courses', 'Quiz'].map((item) => (
                                <button 
                                    key={item} 
                                    onClick={() => {
                                        item === 'Quiz' 
                                            ? navigate('/allQuiz') 
                                            : navigate(`/${item.toLowerCase()}`);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-blue-800 hover:bg-blue-50"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Mobile Search */}
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search quizzes..."
                                />
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    size={20} 
                                />
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-blue-800 flex items-center">
                        <ClipboardList className="mr-3" size={32} /> All Quizzes
                    </h2>
                    <div className="md:hidden relative w-1/2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search quizzes..."
                        />
                        <Search 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            size={20} 
                        />
                    </div>
                </div>

                {/* Quizzes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(searchTerm ? filteredQuizzes : quizzes).map((quiz) => (
                        <div
                            key={quiz._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden transform hover:-translate-y-2"
                            onClick={() => handleSelectQuiz(quiz)}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-blue-800">{quiz.title}</h3>
                                    <BookOpen size={24} className="text-blue-500" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">
                                        {quiz.questions.length} Questions
                                    </span>
                                    <span className="text-sm text-blue-600 font-bold">
                                        Start Quiz
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quiz Modal */}
                {selectedQuiz && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                            <button 
                                onClick={() => setSelectedQuiz(null)} 
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-blue-800 mb-6">{selectedQuiz.title}</h3>
                                
                                {selectedQuiz.questions.map((question, index) => (
                                    <div key={question._id} className="mb-6 bg-gray-50 p-4 rounded-lg">
                                        <p className="text-lg font-semibold mb-4">
                                            {index + 1}. {question.question}
                                        </p>
                                        <div className="space-y-3">
                                            {question.options.map((option) => (
                                                <label
                                                    key={option._id}
                                                    className={`block p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                                                        isSubmitted && option.isCorrect 
                                                            ? 'bg-green-100 border-2 border-green-500'
                                                            : selectedAnswers[question._id] === option._id
                                                            ? 'bg-blue-100 border-2 border-blue-500'
                                                            : 'bg-white hover:bg-blue-50 border border-gray-200'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={question._id}
                                                        value={option._id}
                                                        checked={selectedAnswers[question._id] === option._id}
                                                        onChange={() => !isSubmitted && handleAnswerChange(question._id, option._id)}
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
                                        className={`w-full py-3 rounded-full transition-all duration-300 ${
                                            Object.keys(selectedAnswers).length === selectedQuiz.questions.length
                                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        Submit Quiz
                                    </button>
                                ) : (
                                    <div className="text-center">
                                        <p className={`text-2xl font-bold mb-4 ${
                                            score >= 70 
                                                ? 'text-green-600' 
                                                : score >= 50 
                                                ? 'text-yellow-600' 
                                                : 'text-red-600'
                                        }`}>
                                            Your Score: {score ? score.toFixed(2) : 0}%
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {score >= 70 
                                                ? 'Excellent work!' 
                                                : score >= 50 
                                                ? 'Good effort. Keep practicing!' 
                                                : 'Keep learning and try again!'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Scroll to Top Button */}
            <button 
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-40"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
};

export default AllQuizzes;