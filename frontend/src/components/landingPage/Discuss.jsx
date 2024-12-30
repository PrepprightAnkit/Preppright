import {
  ChevronDown,
  ChevronUp,
  Menu,
  MessageCircle,
  Search,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import theme from '../theme';
import ContentModerator from "./contentModerator";
const Discuss = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const QUESTIONS_PER_PAGE = 2;
  const contentModerator = new ContentModerator(import.meta.env.VITE_GEMINI_API_KEY);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/users/getQuestions`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, [reload]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check content before submission
      const isContentSafe = await contentModerator.isContentSafe(questionText);
      
      if (!isContentSafe) {
        alert("Your question contains inappropriate content. Please revise and try again.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/v1/users/questionPublic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionText }),
      });
      
      if (response.ok) {
        setQuestionText("");
        setReload(!reload);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error submitting question", error);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    try {
      // Check content before submission
      const isContentSafe = await contentModerator.isContentSafe(answerText);
      
      if (!isContentSafe) {
        alert("Your answer contains inappropriate content. Please revise and try again.");
        return;
      }

      const response = await fetch(
        `${apiUrl}/api/v1/users/answer/${selectedQuestion._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: selectedQuestion._id,
            answerText,
          }),
        }
      );
      
      if (response.ok) {
        setAnswerText("");
        setSelectedQuestion(null);
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

  const handleLikeQuestion = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/users/likeQuestion/${id}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error liking question", error);
    }
  };

  const handleDislikeQuestion = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/users/dislikeQuestion/${id}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error disliking question", error);
    }
  };

  const handleLikeAnswer = async (questionId, answerId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/users/likeAnswer/${questionId}/${answerId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error liking answer", error);
    }
  };

  const handleDislikeAnswer = async (questionId, answerId) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/v1/users/dislikeAnswer/${questionId}/${answerId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error disliking answer", error);
    }
  };
  const filteredQuestions = questions.filter(question => 
    question?.questionText?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header with Mobile Menu Toggle */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl h-24 mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MessageCircle className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-blue-800">DiscussHub</h1>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2 w-1/2">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="bg-transparent w-full focus:outline-none text-gray-700"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
              <Search className="text-gray-500" size={20} />
              <input
  type="text"
  placeholder="Search questions..."
  value={searchTerm}
  onClick={(e) => e.stopPropagation()} // Prevent closing the menu when clicking
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
    // Removed the setIsMobileMenuOpen(false)
  }}
  className="bg-transparent w-full focus:outline-none text-gray-700"
/>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 grid md:grid-cols-3 gap-8">
        {/* Question List Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ask a Question
            </h2>
            <form onSubmit={handleQuestionSubmit}>
            <textarea
  className="w-full rounded-lg border-2 border-gray-200 p-3 mb-4 focus:border-blue-500 transition-all resize-none"
  placeholder="What's on your mind?"
  value={questionText}
  onChange={(e) => setQuestionText(e.target.value)}
  rows={4}
/>

              <button
                type="submit"
                className={`w-full bg-blue-500 ${theme.components.button.base} ${theme.components.button.primary} text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2`}
              >
                <Send size={20} />
                <span>Post Question</span>
              </button>
            </form>
          </div>
        </div>

        {/* Questions Display Section */}
        <div className="md:col-span-2 space-y-4">
          {paginatedQuestions.map((question) => (
            <div
            key={question._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 flex-grow pr-4">
                  {question.questionText}
                </h3>
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleLikeQuestion(question._id)}
                    className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
                  >
                    <ChevronUp size={20} />
                  </button>
                  <span className="text-sm text-gray-600">
                    {question.likes}
                  </span>
                  <button
                    onClick={() => handleDislikeQuestion(question._id)}
                    className="text-red-500 hover:bg-red-50 rounded-full p-2"
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>

              {/* Expandable Answer Section */}
              <div className="mt-4">
                <button
                  onClick={() =>
                    setSelectedQuestion(
                      selectedQuestion &&
                        selectedQuestion._id === question._id
                        ? null
                        : question
                    )
                  }
                  className={ `text-indigo-500 hover:text-indigo-800 font-medium flex items-center`}
                >
                  {selectedQuestion && selectedQuestion._id === question._id
                    ? "Close Answers"
                    : `View Answers (${question.answers.length})`}
                </button>

                {selectedQuestion &&
                  selectedQuestion._id === question._id && (
                    <div className="mt-4 space-y-4">
                      {/* Answer Input */}
                      <form onSubmit={handleAnswerSubmit} className="mb-4">
                        <div className="flex space-x-2">
                          <textarea
  className="flex-grow rounded-lg border-2 border-gray-200 p-3 focus:border-blue-500 transition-all resize-none"
  placeholder="Write your answer..."
  value={answerText}
  onChange={(e) => setAnswerText(e.target.value)}
  rows={3}
  style={{ resize: "none" }} // Add this inline style or define it in CSS
/>

                          <button
                            type="submit"
                            className={`${theme.components.button.base} ${theme.components.button.primary} bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors`}
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </form>

                      {/* Existing Answers */}
                      {question.answers.map((answer) => (
                        <div
                          key={answer._id}
                          className="bg-gray-50 rounded-lg p-4 flex items-start space-x-4"
                        >
                          <div className="flex-grow">
                            <p className="text-gray-700">
                              {answer.answerText}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <button
                                onClick={() =>
                                  handleLikeAnswer(question._id, answer._id)
                                }
                                className="flex items-center space-x-1 hover:text-blue-600"
                              >
                                <ThumbsUp size={16} />
                                <span>{answer.likes}</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDislikeAnswer(
                                    question._id,
                                    answer._id
                                  )
                                }
                                className="flex items-center space-x-1 hover:text-red-600"
                              >
                                <ThumbsDown size={16} />
                                <span>{answer.dislikes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${theme.components.button.base} ${theme.components.button.primary}bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50`}
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`${theme.components.button.base} ${theme.components.button.primary}bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          © 2024 PreppRight. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Discuss;
