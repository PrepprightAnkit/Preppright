import { ArrowLeft, ArrowRight, ArrowLeft as BackIcon, BookMarked, CheckCircle2, ClipboardList } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const TakeQuiz = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForLater, setMarkedForLater] = useState(new Set());
  const [message, setMessage] = useState('');

  // Fetch all quizzes
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuizzes(data.data || []);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  // Fetch questions for the selected quiz
  useEffect(() => {
    if (selectedQuiz) {
      fetch(`${apiUrl}/api/v1/quiz/quizzes/getallquestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: selectedQuiz }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setQuestions(data.data || []);
          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => console.error('Error fetching questions:', error));
    }
  }, [selectedQuiz]);

  // Handle option change
  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  // Handle mark for later
  const handleMarkForLater = () => {
    setMarkedForLater((prev) => {
      const newSet = new Set(prev);
      newSet.add(questions[currentQuestionIndex]._id);
      return newSet;
    });
  };

  // Handle navigation between questions
  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    fetch(`${apiUrl}/api/v1/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: selectedQuiz,
        answers: answers,
        userId: user._id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(`Your score: ${data.score}`);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error submitting quiz:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with Back Button */}
        <div className="bg-blue-600 text-white p-4 flex items-center">
          <Link 
            to="/allQuiz" 
            className="mr-4 hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <BackIcon className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold flex-grow flex items-center">
            <ClipboardList className="mr-3 h-6 w-6" />
            Take a Quiz
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Main Content Area */}
          <div className="w-full md:w-3/4 p-6">
            {/* Quiz Selection */}
            {!selectedQuiz ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Quiz:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quizzes.map((quiz) => (
                    <button
                      key={quiz._id}
                      className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-between"
                      onClick={() => setSelectedQuiz(quiz._id)}
                    >
                      <span>{quiz.title}</span>
                      <ArrowRight className="ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* Display Questions */}
                {questions.length > 0 && (
                  <div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Question {currentQuestionIndex + 1}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {questions[currentQuestionIndex].question}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {questions[currentQuestionIndex].options.map((option) => (
                        <label 
                          key={option._id} 
                          className={`block p-3 border rounded-lg cursor-pointer transition-colors ${
                            answers[questions[currentQuestionIndex]._id] === option._id
                              ? 'bg-blue-100 border-blue-500'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${questions[currentQuestionIndex]._id}`}
                            value={option._id}
                            checked={answers[questions[currentQuestionIndex]._id] === option._id}
                            onChange={() => handleOptionChange(questions[currentQuestionIndex]._id, option._id)}
                            className="mr-3 sr-only"
                          />
                          <span className="flex items-center">
                            <span className={`mr-3 h-5 w-5 rounded-full border-2 ${
                              answers[questions[currentQuestionIndex]._id] === option._id
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-gray-300'
                            }`}></span>
                            {option.text}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center bg-gray-300 text-gray-700 p-2 rounded-lg disabled:opacity-50"
                      >
                        <ArrowLeft className="mr-2" /> Previous
                      </button>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleMarkForLater}
                          className="flex items-center bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                        >
                          <BookMarked className="mr-2" /> Mark for Later
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={currentQuestionIndex === questions.length - 1}
                          className="flex items-center bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 hover:bg-blue-600"
                        >
                          Next <ArrowRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle2 className="mr-3" /> Submit Quiz
                  </button>
                </div>
              </div>
            )}

            {/* Display message */}
            {message && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                {message}
              </div>
            )}
          </div>

          {/* Sidebar for question navigation */}
          {selectedQuiz && (
            <div className="w-full md:w-1/4 bg-gray-100 p-4 border-l">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Questions:</h2>
              <div className="space-y-2">
                {questions.map((question, index) => (
                  <button
                    key={question._id}
                    className={`w-full text-left p-2 rounded-lg flex items-center ${
                      markedForLater.has(question._id) 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-200 text-gray-700'
                    } ${
                      currentQuestionIndex === index 
                        ? 'ring-2 ring-blue-500 font-bold' 
                        : 'hover:bg-gray-300'
                    }`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    <span className="mr-3 font-bold">{index + 1}</span>
                    <span className="truncate">{question.question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;