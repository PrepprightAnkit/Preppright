import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        identifier: 1,
        question: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ]
    });

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const handleCreateQuiz = async () => {
        try {
          // Create Quiz with only the title
          const quizResponse = await fetch(`${apiUrl}/api/v1/quiz/quizzes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: quizTitle })
          });
          
          
          const quizData = await quizResponse.json();
          console.log(quizData);
          const quizId = quizData.data._id;
          
          // Create Questions for the quiz
          for (const question of questions) {
            await fetch(`${apiUrl}/api/v1/quiz/quizzes/questions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                quizId,
                identifier: question.identifier,
                question: question.question,
                options: question.options
              })
            });
          }
          
          
          alert('Quiz created successfully!');
          navigate('/allQuiz');
        } catch (error) {
          console.error('Error creating quiz:', error);
          alert('Failed to create quiz');
        }
      };
      

    const addQuestion = () => {
        if (!currentQuestion.question.trim()) {
            alert('Please enter a question');
            return;
        }

        const validOptions = currentQuestion.options.filter(opt => opt.text.trim());
        if (validOptions.length < 2) {
            alert('Please add at least 2 options');
            return;
        }

        if (!currentQuestion.options.some(opt => opt.isCorrect)) {
            alert('Please mark at least one option as correct');
            return;
        }

        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            identifier: currentQuestion.identifier + 1,
            question: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        });
    };

    const updateOption = (index, field, value) => {
        const newOptions = [...currentQuestion.options];
        if (field === 'isCorrect') {
            // Uncheck all other options if this one is checked
            newOptions.forEach((opt, i) => {
                opt.isCorrect = i === index;
            });
        } else {
            newOptions[index][field] = value;
        }
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Create New Quiz</h2>
                
                {/* Quiz Title Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Quiz Title</label>
                    <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter quiz title"
                    />
                </div>

                {/* Current Question Form */}
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4">Question {currentQuestion.identifier}</h3>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Question Text</label>
                        <input
                            type="text"
                            value={currentQuestion.question}
                            onChange={(e) => setCurrentQuestion({
                                ...currentQuestion, 
                                question: e.target.value
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter question"
                        />
                    </div>

                    {/* Options Inputs */}
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="mb-3 flex items-center">
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => updateOption(index, 'text', e.target.value)}
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Option ${index + 1}`}
                            />
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={option.isCorrect}
                                    onChange={() => updateOption(index, 'isCorrect', true)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">Correct</span>
                            </label>
                        </div>
                    ))}

                    <button 
                        onClick={addQuestion}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                        <Plus className="mr-2" /> Add Question
                    </button>
                </div>

                {/* Added Questions List */}
                {questions.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Added Questions</h3>
                        {questions.map((q, index) => (
                            <div 
                                key={index} 
                                className="bg-blue-50 p-4 rounded-lg mb-3 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold">Q{q.identifier}: {q.question}</p>
                                    <p className="text-sm text-gray-600">
                                        Options: {q.options.filter(opt => opt.text.trim()).length}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Quiz Button */}
                <button 
                    onClick={handleCreateQuiz}
                    disabled={questions.length === 0}
                    className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
                        questions.length > 0 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Create Quiz
                </button>
            </div>
        </div>
    );
};

export default CreateQuiz;