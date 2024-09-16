import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const AllQuizzes = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all quizzes
        fetch(`${apiUrl}/api/v1/quiz/quizzes`)
            .then((response) => response.json())
            .then((data) => setQuizzes(data.data))
            .catch((error) => console.error('Error fetching quizzes:', error));
    }, []);

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

            // Unselect the quiz after 10 seconds
            setTimeout(() => {
                setSelectedQuiz(null);
                setSelectedAnswers({});
                setScore(null);
                setIsSubmitted(false);
            }, 2000); // 10 seconds
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>

                    <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => navigate('/categories')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
                    </div>

                    <div className="relative w-full md:w-1/4 group">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full px-4 py-2 border rounded-full focus:outline-none"
                        />
                        {/* Implement search functionality here */}
                    </div>

                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => {/* Handle logout */}}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full"
                                >
                                    Logout
                                </button>
                                {user.isAdmin && (
                                    <button className="bg-gray-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                        <Link to="/uploadContent">Upload</Link>
                                    </button>
                                )}
                                <button className="bg-blue-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/userProfile">My Profile</Link>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/login">Login</Link>
                                </button>
                                <button className="bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/reg">Register</Link>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold text-center mb-8">All Quizzes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz._id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-300 cursor-pointer hover:border-blue-500"
                            onClick={() => handleSelectQuiz(quiz)}
                        >
                            <h3 className="text-xl font-semibold">{quiz.title}</h3>
                            <p>{quiz.questions.length} Questions</p>
                        </div>
                    ))}
                </div>

                {selectedQuiz && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">{selectedQuiz.title}</h3>
                        {selectedQuiz.questions.map((question) => (
                            <div key={question._id} className="mb-4">
                                <p className="text-lg font-medium">{question.question}</p>
                                {question.options.map((option) => (
                                    <label
                                        key={option._id}
                                        className="block mt-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option._id}
                                            checked={selectedAnswers[question._id] === option._id}
                                            onChange={() => handleAnswerChange(question._id, option._id)}
                                            className="mr-2"
                                        />
                                        {option.text}
                                    </label>
                                ))}
                            </div>
                        ))}
                        {!isSubmitted ? (
                            <button
                                onClick={calculateScore}
                                className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <div className="mt-4">
                                <p className="text-xl font-semibold">
                                    Your Score: {score ? score.toFixed(2) : 0}%
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllQuizzes;
