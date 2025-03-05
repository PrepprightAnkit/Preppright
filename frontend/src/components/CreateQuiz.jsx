import { MinusCircle, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{
    identifier: 1,
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  }]);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [errors, setErrors] = useState({});

  const validateQuiz = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = 'Question text is required';
      }

      const hasCorrectAnswer = question.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        newErrors[`question_${index}_correct`] = 'Must mark one correct answer';
      }

      question.options.forEach((option, optIndex) => {
        if (!option.text.trim()) {
          newErrors[`question_${index}_option_${optIndex}`] = 'Option text is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    
    if (!validateQuiz()) {
      alert('Please fix the validation errors before submitting');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/quiz/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          questions,
          duration,
          difficultyLevel
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Quiz created successfully!');
        navigate('/allQuiz');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(`Failed to create quiz: ${error.message}`);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        identifier: questions.length + 1,
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.map(
      (option, idx) => ({
        ...option,
        isCorrect: idx === optionIndex
      })
    );
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create New Quiz</h1>
        
        <form onSubmit={handleCreateQuiz} className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
              </div>

              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4"
                placeholder="Enter question"
                required
              />

              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`correct-${questionIndex}`}
                      checked={option.isCorrect}
                      onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                      required
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Question
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;