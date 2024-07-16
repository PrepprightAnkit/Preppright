import React, { useState, useEffect } from 'react';

const Discuss = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/getQuestions');
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };

        fetchQuestions();
    }, [reload]);

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/questionPublic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questionText }),
            });
            if (response.ok) {
                setQuestionText('');
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error submitting question', error);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!selectedQuestion) return;

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/answer/${selectedQuestion._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: selectedQuestion._id,
                    answerText
                }),
            });
            if (response.ok) {
                setAnswerText('');
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error submitting answer', error);
        }
    };

    const handleLikeQuestion = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/likeQuestion/${id}`, {
                method: 'POST',
            });
            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error liking question', error);
        }
    };

    const handleDislikeQuestion = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/dislikeQuestion/${id}`, {
                method: 'POST',
            });
            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error disliking question', error);
        }
    };

    const handleLikeAnswer = async (questionId, answerId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/likeAnswer/${questionId}/${answerId}`, {
                method: 'POST',
            });
            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error liking answer', error);
        }
    };

    const handleDislikeAnswer = async (questionId, answerId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/dislikeAnswer/${questionId}/${answerId}`, {
                method: 'POST',
            });
            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error disliking answer', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 bg-blue-100 min-h-screen">
            <h1 className="text-blue-700 text-5xl font-bold mb-8">Discussion Forum !!</h1>
            <div className="w-full max-w-6xl p-4 bg-white border-4 border-blue-700 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 p-4">
                        <h2 className="text-2xl font-bold mb-4">Questions</h2>
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="mb-4 p-4 bg-white rounded-lg shadow-md cursor-pointer"
                                onClick={() => setSelectedQuestion(question)}
                            >
                                <h3 className="text-xl font-semibold">{question.questionText}</h3>
                                <div className="text-sm text-gray-600 mt-2">
                                    Likes: {question.likes} | Dislikes: {question.dislikes}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleLikeQuestion(question._id) }}
                                        className="ml-2 text-blue-500"
                                    >
                                        Like
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDislikeQuestion(question._id) }}
                                        className="ml-2 text-red-500"
                                    >
                                        Dislike
                                    </button>
                                </div>
                                {selectedQuestion && selectedQuestion._id === question._id && (
                                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                        <h4 className="text-lg font-semibold mb-2">Answers</h4>
                                        {question.answers.map((answer) => (
                                            <div key={answer._id} className="mb-2">
                                                <p>{answer.answerText}</p>
                                                <div className="text-sm text-gray-600">
                                                    Likes: {answer.likes} | Dislikes: {answer.dislikes}
                                                    <button
                                                        onClick={() => handleLikeAnswer(question._id, answer._id)}
                                                        className="ml-2 text-blue-500"
                                                    >
                                                        Like
                                                    </button>
                                                    <button
                                                        onClick={() => handleDislikeAnswer(question._id, answer._id)}
                                                        className="ml-2 text-red-500"
                                                    >
                                                        Dislike
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/4 p-4">
                        <div className="mb-8 bg-white p-4 rounded-lg border -2 border-blue-700 shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                            <form onSubmit={handleQuestionSubmit}>
                                <textarea
                                    className="w-full p-2 mb-2 border rounded"
                                    rows="4"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    placeholder="Type your question here..."
                                    required
                                />
                                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md border -2 border-blue-700">
                            <h2 className="text-2xl font-bold mb-4">Answer a Question</h2>
                            <form onSubmit={handleAnswerSubmit}>
                                <select
                                    className="w-full p-2 mb-2 border rounded"
                                    value={selectedQuestion ? selectedQuestion._id : ''}
                                    onChange={(e) => setSelectedQuestion(questions.find(q => q._id === e.target.value))}
                                    required
                                >
                                    <option value="" disabled>Select a question to answer</option>
                                    {questions.map((question) => (
                                        <option key={question._id} value={question._id}>{question.questionText}</option>
                                    ))}
                                </select>
                                {selectedQuestion ? (
                                    <>
                                        <textarea
                                            className="w-full p-2 mb-2 border rounded"
                                            rows="4"
                                            value={answerText}
                                            onChange={(e) => setAnswerText(e.target.value)}
                                            placeholder="Type your answer here..."
                                            required
                                        />
                                        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">
                                            Submit
                                        </button>
                                    </>
                                ) : (
                                    <p>Select a question to answer</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discuss;
