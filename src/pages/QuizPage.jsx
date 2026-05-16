import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomQuestions } from "../data/quizData";

const QuizPage = () => {
  const [quizState, setQuizState] = useState("landing"); // 'landing', 'active', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuestions(getRandomQuestions(20));
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(1800);
    setQuizState("active");
  };

  useEffect(() => {
    let timer;
    if (quizState === "active" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const finishQuiz = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) finalScore++;
    });
    setScore(finalScore);
    setQuizState("results");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 pt-40 pb-20">
        <AnimatePresence mode="wait">
          {quizState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
                Placement Readiness
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                Interactive <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Aptitude Arena</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
                Sharpen your logic and quantitative skills with our AI-curated question sets. Designed specifically for top-tier company assessments.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-xl p-10 text-left border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center text-3xl mb-8 group-hover:bg-indigo-50 group-hover:scale-110 transition-all">
                      📝
                    </div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                      General Aptitude Set {i}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm mb-10">
                      20 Random Questions <br />
                      30 Minutes Duration
                    </p>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <span className="text-emerald-500 font-black text-lg uppercase tracking-widest">Free</span>
                      <button 
                        onClick={startQuiz} 
                        className="px-8 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-600/20"
                      >
                        Start Arena
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {quizState === "active" && questions.length > 0 && (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-xl p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
                {/* Header Stats */}
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-4">
                    <div className="px-5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-xl tabular-nums">
                      {formatTime(timeLeft)}
                    </div>
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Time Remaining</span>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-900 font-black text-xl">{currentIndex + 1} / {questions.length}</div>
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Progress</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-50 rounded-full mb-16 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 leading-tight tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  {questions[currentIndex].question}
                </h2>

                {/* Options Grid */}
                <div className="space-y-4">
                  {questions[currentIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 flex items-center gap-6 group ${
                        answers[currentIndex] === opt
                          ? "border-indigo-600 bg-indigo-50/30"
                          : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                        answers[currentIndex] === opt
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-slate-400 group-hover:text-slate-900 border border-slate-100"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={`text-lg font-bold ${
                        answers[currentIndex] === opt ? "text-indigo-900" : "text-slate-600"
                      }`}>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-16 flex justify-between gap-6">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="px-10 py-4 rounded-xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-10 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-lg hover:shadow-indigo-600/20"
                      disabled={!answers[currentIndex]}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={finishQuiz}
                      className="px-12 py-4 rounded-xl bg-emerald-600 text-white font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      disabled={!answers[currentIndex]}
                    >
                      Finish Arena
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {quizState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-xl p-16 text-center border border-slate-100 shadow-premium">
                <div className="text-8xl mb-10 drop-shadow-2xl">🏆</div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  Arena Conquered!
                </h2>
                <p className="text-slate-400 font-medium text-lg mb-12">
                  Excellent focus. Here's your performance breakdown.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-16">
                  <div className="bg-slate-50 p-10 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-2">Final Score</span>
                    <div className="text-5xl font-black text-indigo-600 tabular-nums">{score} <span className="text-2xl text-slate-300">/ 20</span></div>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest block mb-2">Accuracy</span>
                    <div className="text-5xl font-black text-emerald-500 tabular-nums">{((score / 20) * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={startQuiz} className="px-10 py-4 rounded-xl bg-slate-950 text-white font-bold hover:bg-indigo-600 transition-all shadow-lg">
                    Try Different Set
                  </button>
                  <button
                    onClick={() => setQuizState("landing")}
                    className="px-10 py-4 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-all"
                  >
                    Return to Lobby
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
