import React, { useState, useEffect } from 'react';

const Discuss = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [reload, setReload] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {

                const response = await fetch(`${apiUrl}/api/v1/users/getQuestions`);
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

            const response = await fetch(`${apiUrl}/api/v1/users/questionPublic`, {
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
            
            const response = await fetch(`${apiUrl}/api/v1/users/answer/${selectedQuestion._id}`, {
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
                setSelectedQuestion(null);  // Deselect the question after answering
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error submitting answer', error);
        }
    };

    const handleLikeQuestion = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/users/likeQuestion/${id}`, {
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
            const response = await fetch(`${apiUrl}/api/v1/users/dislikeQuestion/${id}`, {
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
            const response = await fetch(`${apiUrl}/api/v1/users/likeAnswer/${questionId}/${answerId}`, {
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
            const response = await fetch(`${apiUrl}/api/v1/users/dislikeAnswer/${questionId}/${answerId}`, {
                method: 'POST',
            });
            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error disliking answer', error);
        }
    };

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setQuestionText(searchText);
        if (searchText) {
            const filtered = questions.filter((question) =>
                question.questionText.toLowerCase().startsWith(searchText.toLowerCase())
            );
            setFilteredQuestions(filtered);
            setShowDropdown(true);
        } else {
            setFilteredQuestions([]);
            setShowDropdown(false);
        }
    };

    const handleDropdownSelect = (question) => {
        setSelectedQuestion(question);
        setShowDropdown(false);
        setQuestionText('');
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 bg-blue-100 min-h-screen">
            <h1 className="text-blue-700 text-5xl font-bold mb-8">Discussion Forum !!</h1>
            <div className="w-full max-w-6xl p-4 bg-white border-4 border-blue-700 rounded-lg shadow-lg max-h-screen overflow-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-3/4 p-4">
                        <h2 className="text-3xl ml-4 text-blue-600 font-black mb-4">Questions</h2>
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                className="mb-4 p-4 text-blue-700 text-2xl bg-white rounded-lg shadow-md"
                            >
                                <h3 className="text-2xl font-semibold">{question.questionText}</h3>
                                <div className=" text-xl text-gray-600 mt-2">
                                    Likes: {question.likes} | Dislikes: {question.dislikes}
                                    <button
                                        onClick={() => handleLikeQuestion(question._id)}
                                        className="ml-2 text-blue-500"
                                    >
                                        Like
                                    </button>
                                    <button
                                        onClick={() => handleDislikeQuestion(question._id)}
                                        className="ml-2 text-red-500"
                                    >
                                        Dislike
                                    </button>
                                    <button
                                        onClick={() => setSelectedQuestion(selectedQuestion && selectedQuestion._id === question._id ? null : question)}
                                        className="ml-2 text-green-500"
                                    >
                                        Answer
                                    </button>
                                </div>
                                {selectedQuestion && selectedQuestion._id === question._id && (
                                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                        <form onSubmit={handleAnswerSubmit}>
                                            <textarea
                                                className="w-full p-2 mb-2 border rounded"
                                                rows="4"
                                                value={answerText}
                                                onChange={(e) => setAnswerText(e.target.value)}
                                                placeholder="Type your answer here..."
                                                required
                                            />
                                            <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">
                                                Submit Answer
                                            </button>
                                        </form>
                                        <h4 className="text-lg font-semibold mb-2 mt-4">Answers</h4>
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
                        <div className="mb-8 bg-white p-4 rounded-lg border-2 border-blue-700 shadow-md">
                            <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
                            <form onSubmit={handleQuestionSubmit}>
                                <textarea
                                    className="w-full p-2 mb-2 border rounded"
                                    rows="4"
                                    value={questionText}
                                    onChange={handleSearchChange}
                                    placeholder="Type your question here..."
                                    required
                                />
                                {showDropdown && (
                                    <ul className="border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto">
                                        {filteredQuestions.map((question) => (
                                            <li
                                                key={question._id}
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => handleDropdownSelect(question)}
                                            >
                                                {question.questionText}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mt-2">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discuss;