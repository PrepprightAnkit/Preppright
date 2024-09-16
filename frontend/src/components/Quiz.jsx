import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [quizId, setQuizId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [question, setQuestion] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [image, setImage] = useState('');
  const [optionText, setOptionText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all quizzes from the backend
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes`)
      .then((response) => response.json())
      .then((data) => setQuizzes(data.data || []))
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  // Fetch all questions for the selected quiz
  const fetchQuestions = (id) => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes/getallquestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuestions(data.data);
          setMessage('Questions fetched successfully');
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error fetching questions:', error));
  };

  // Create a new quiz
  const createQuiz = () => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuizzes([...quizzes, data.data]);
          setMessage('Quiz created successfully');
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error creating quiz:', error));
  };

  // Delete a quiz
  const deleteQuiz = (id) => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
          setMessage('Quiz deleted successfully');
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error deleting quiz:', error));
  };

  // Create a new question for a quiz
  const createQuestion = () => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, identifier, question, image }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage('Question added successfully');
          fetchQuestions(quizId); // Refresh questions list
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error adding question:', error));
  };

  // Add an option to a question
  const addOption = () => {
    fetch(`${apiUrl}/api/v1/quiz/quizzes/options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, questionId, text: optionText, isCorrect }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage('Option added successfully');
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => console.error('Error adding option:', error));
  };

  return (
    <div className="p-8 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Quiz Management</h1>

      <div className="mb-6">
        <input
          type="text"
          className="border border-blue-500 p-2 mb-2 w-full md:w-1/2 lg:w-1/3"
          placeholder="Enter quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createQuiz}
          className="bg-green-700 text-white px-4 py-2 mt-2 rounded shadow hover:bg-green-800 transition"
        >
          Create Quiz
        </button>
      </div>

      {/* <div className="mb-6">
      <h2 className="flex flex-col items-center justify-center w-full text-2xl font-bold text-blue-700 mb-4">Select a Quiz</h2>
      <ul className="flex flex-col items-center justify-center w-full space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <div
              className={`bg-white p-4 flex flex-col items-center justify-center w-64 border ${quizId === quiz._id ? 'border-blue-700' : 'border-blue-500'} rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition`}
              onClick={() => {
                setQuizId(quiz._id);
                fetchQuestions(quiz._id);
              }}
            >
              <h3 className="text-xl font-bold text-green-700">{quiz.title}</h3>
              <button
                onClick={() => deleteQuiz(quiz._id)}
                className="bg-red-600 text-white px-2 py-1 mt-2 rounded shadow hover:bg-red-700 transition"
              >
                Delete Quiz
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div> */}
      <div className="flex mb-6">
        {/* Instructions on the left */}
        <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Instructions</h2>
          <br/>
          <p className="mb-2 text-3xl font-black  text-gray-900">
            Use this portal to manage quizzes, add questions, and create answer options.
          </p>
          <br/>
          <ul className="list-disc text-2xl  pl-5 text-gray-700">
            <li>Create a quiz by entering a title and clicking "Create Quiz".</li>
            <li>Select a quiz to view or add questions.</li>
            <li>Add questions by entering the question text and optionally an image URL.</li>
            <li>Add options to a question, marking the correct option.</li>
          </ul>
        </div>

        {/* Quiz selection with search functionality */}
        <div className="w-2/3 p-4 flex flex-col">
          <h2 className="text-4xl font-black text-blue-700 mb-4 text-center">Select a Quiz</h2>

          {/* Search Input */}
          <input
            type="text"
            className="border border-blue-500 p-2 mb-4 w-full"
            placeholder="Search for a quiz..."
            onChange={(e) => {
              const searchQuery = e.target.value.toLowerCase();
              const filteredQuizzes = quizzes.filter((quiz) =>
                quiz.title.toLowerCase().includes(searchQuery)
              );
              setQuizzes(filteredQuizzes);
            }}
          />

          {/* Scrollable Quizzes List */}
          <ul className="space-y-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                <div
                  className={`bg-white p-4 border ${quizId === quiz._id ? 'border-blue-700' : 'border-blue-500'} rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition`}
                  onClick={() => {
                    setQuizId(quiz._id);
                    fetchQuestions(quiz._id);
                  }}
                >
                  <h3 className="text-xl font-bold text-green-700">{quiz.title}</h3>
                  <button
                    onClick={() => deleteQuiz(quiz._id)}
                    className="bg-red-600 text-white px-2 py-1 mt-2 rounded shadow hover:bg-red-700 transition"
                  >
                    Delete Quiz
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>



      {quizId && (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Add a Question</h2>
            <input
              type="text"
              className="border border-blue-500 p-2 mb-2 w-full md:w-1/2 lg:w-1/3"
              placeholder="Question Identifier (Number)"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              type="text"
              className="border border-blue-500 p-2 mb-2 w-full md:w-1/2 lg:w-1/3"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              className="border border-blue-500 p-2 mb-2 w-full md:w-1/2 lg:w-1/3"
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button
              onClick={createQuestion}
              className="bg-blue-700 text-white px-4 py-2 mt-2 rounded shadow hover:bg-blue-800 transition"
            >
              Add Question
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Questions in Selected Quiz</h2>
            <ul className="space-y-4">
              {questions.map((q) => (
                <li key={q._id}>
                  <div className={`bg-white p-4 border ${questionId === q._id ? 'border-green-700' : 'border-blue-500'} rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer`} onClick={() => setQuestionId(q._id)}>
                    <h3 className="text-xl font-bold text-green-700">
                      {q.identifier}: {q.question}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {questionId && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Selected Question</h2>
                <div className="bg-white p-4 border border-green-700 rounded-lg shadow-lg mb-4">
                  {questions.find((q) => q._id === questionId) ? (
                    <h3 className="text-xl font-bold text-green-700">
                      {questions.find((q) => q._id === questionId).identifier}: {questions.find((q) => q._id === questionId).question}
                    </h3>
                  ) : (
                    <p className="text-gray-500">No question selected.</p>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-4">Add an Option</h2>
                <input
                  type="text"
                  className="border border-blue-500 p-2 mb-2 w-full md:w-1/2 lg:w-1/3"
                  placeholder="Option text"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                />
                <label className="inline-flex  items-center mb-4">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-600 ml-2"
                    checked={isCorrect}
                    onChange={(e) => setIsCorrect(e.target.checked)}
                  />
                  <span className="ml-2 mr-2">Correct Option</span>
                </label>
                <button
                  onClick={addOption}
                  className="bg-blue-700 text-white px-4 py-2 mt-2 rounded shadow hover:bg-blue-800 transition"
                >
                  Add Option
                </button>
              </div>
            </>
          )}
        </>
      )}

      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default Quiz;
