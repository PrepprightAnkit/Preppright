import React, { useState, useEffect } from 'react';



import {  useSelector } from 'react-redux';

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
    fetch('http://localhost:8000/api/v1/quiz/quizzes')
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
      fetch('http://localhost:8000/api/v1/quiz/quizzes/getallquestions', {
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
    fetch('http://localhost:8000/api/v1/quiz/submit', {
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
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 lg:pr-4 mb-4 lg:mb-0">
        <h1 className="text-2xl font-bold mb-4">Take a Quiz</h1>

        {/* Quiz Selection */}
        {!selectedQuiz ? (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Select a Quiz:</h2>
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz._id} className="mb-2">
                  <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => setSelectedQuiz(quiz._id)}
                  >
                    {quiz.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {/* Display Questions */}
            {questions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {questions[currentQuestionIndex].question}
                </h2>
                {questions[currentQuestionIndex].options.map((option) => (
                  <div key={option._id} className="mb-2">
                    <label>
                      <input
                        type="radio"
                        name={`question-${questions[currentQuestionIndex]._id}`}
                        value={option._id}
                        checked={answers[questions[currentQuestionIndex]._id] === option._id}
                        onChange={() => handleOptionChange(questions[currentQuestionIndex]._id, option._id)}
                        className="mr-2"
                      />
                      {option.text}
                    </label>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="p-2 bg-gray-500 text-white rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Next
                  </button>
                </div>
                <button
                  onClick={handleMarkForLater}
                  className="mt-4 p-2 bg-yellow-500 text-white rounded"
                >
                  Mark for Later
                </button>
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="p-2 bg-green-500 text-white rounded"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}

        {/* Display message */}
        {message && (
          <div className="mt-4 p-2 border border-gray-300 rounded">
            {message}
          </div>
        )}
      </div>

      {/* Sidebar for question navigation */}
      <div className="w-full lg:w-1/4">
        <h2 className="text-xl font-semibold mb-2">Questions:</h2>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li key={question._id} className="flex items-center">
              <button
                className={`p-2 rounded ${markedForLater.has(question._id) ? 'bg-yellow-500' : 'bg-gray-300'} ${
                  currentQuestionIndex === index ? 'text-blue-500 font-bold' : 'text-black'
                }`}
                onClick={() => handleQuestionClick(index)}
              >
                {index + 1}
              </button>
              <span className="ml-2">{question.question}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TakeQuiz;
