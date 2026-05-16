import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

const ASSESSMENTS = [
  {
    id: "dsa-challenge",
    title: "DSA Challenges",
    description: "Daily algorithm and data structure problems to sharpen your logic.",
    icon: "💻",
    count: "250+ Problems",
    difficulty: "Mixed",
    color: "bg-indigo-600",
    tags: ["Algorithms", "Data Structures"]
  },
  {
    id: "mock-interview",
    title: "Mock Interviews",
    description: "Simulate real technical interviews with industry mentors.",
    icon: "🎙️",
    count: "1-on-1 Sessions",
    difficulty: "Advanced",
    color: "bg-pink-600",
    tags: ["Behavioral", "System Design"]
  },
  {
    id: "skills-quiz",
    title: "Skill Quizzes",
    description: "Quick 10-minute assessments to validate your module learning.",
    icon: "📝",
    count: "50+ Topics",
    difficulty: "Beginner",
    color: "bg-emerald-600",
    tags: ["Language Basics", "Frameworks"]
  },
  {
    id: "project-review",
    title: "Project Review",
    description: "Get detailed feedback on your code from senior developers.",
    icon: "🔍",
    count: "Portfolio Ready",
    difficulty: "Pro",
    color: "bg-slate-900",
    tags: ["Code Quality", "Best Practices"]
  }
];

const PracticeAssessmentPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="pt-20 pb-20">

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <header className="text-center max-w-3xl mx-auto mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
            >
              ⚡ Practice Lab
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-slate-950 mb-8 leading-tight"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Sharpen Your <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">Tech Edge</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl font-medium leading-relaxed"
            >
              Don't wait for the interview to test yourself. Access our curated bank of assessments, mock tests, and real-world project reviews.
            </motion.p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ASSESSMENTS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 md:p-12 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-xl ${item.color} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl transition-transform group-hover:rotate-6`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Lexend', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                      <span className="text-sm font-bold text-slate-900">{item.count}</span>
                    </div>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-xl bg-slate-950 text-white font-black text-[11px] uppercase tracking-[0.1em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                    >
                      Start Assessment
                    </a>
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M45.7,-77.2C58.9,-70.7,69.1,-58.4,76.4,-44.6C83.7,-30.9,88.1,-15.4,87.6,-0.3C87.1,14.8,81.7,29.6,73.4,42.7C65.1,55.8,54,67.2,40.6,74.5C27.2,81.8,11.5,85,-4.4,92.6C-20.3,100.2,-36.5,112.2,-49.2,108.5C-61.9,104.8,-71.2,85.4,-78,69.5C-84.8,53.6,-89.2,41.2,-91.3,28.2C-93.4,15.2,-93.3,1.6,-89.5,-10.8C-85.7,-23.2,-78.3,-34.4,-68.9,-44.4C-59.5,-54.4,-48.1,-63.2,-35.8,-70.1C-23.5,-77.1,-11.7,-82.1,1.9,-85.4C15.6,-88.7,32.4,-83.7,45.7,-77.2Z" transform="translate(100 100)" />
                   </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 md:p-16 rounded-xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          >
             <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Lexend', sans-serif" }}>Join the Global Leaderboard</h2>
                <p className="text-indigo-100 text-lg font-medium opacity-80">Compete with 10k+ students and get noticed by top tech companies.</p>
             </div>
             <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-10 py-5 rounded-xl bg-white text-indigo-600 font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block"
              >
                View Rankings
             </a>
             {/* Abstract light */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PracticeAssessmentPage;
