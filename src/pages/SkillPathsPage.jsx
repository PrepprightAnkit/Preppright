import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

const SKILL_PATHS = [
  {
    id: "frontend-mastery",
    title: "Frontend Mastery",
    description: "Master React, Next.js, and Modern CSS to build world-class user interfaces.",
    duration: "12 Weeks",
    modules: 8,
    level: "Intermediate",
    color: "from-blue-600 to-indigo-600",
    icon: "🎨",
    skills: ["React", "TypeScript", "Tailwind", "Next.js"]
  },
  {
    id: "backend-architecture",
    title: "Backend Architecture",
    description: "Deep dive into Node.js, System Design, and Scalable Databases.",
    duration: "14 Weeks",
    modules: 10,
    level: "Advanced",
    color: "from-slate-800 to-slate-950",
    icon: "⚙️",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker"]
  },
  {
    id: "full-stack-career",
    title: "Full-Stack Career Path",
    description: "The complete journey from zero to a professional Full-Stack Developer.",
    duration: "24 Weeks",
    modules: 18,
    level: "Beginner to Pro",
    color: "from-indigo-600 to-purple-600",
    icon: "🚀",
    skills: ["MERN", "AWS", "DevOps", "Architecture"]
  },
  {
    id: "data-science-ai",
    title: "Data Science & AI",
    description: "Master Python, Machine Learning, and AI integration for real-world apps.",
    duration: "16 Weeks",
    modules: 12,
    level: "Intermediate",
    color: "from-emerald-500 to-teal-700",
    icon: "🤖",
    skills: ["Python", "TensorFlow", "Pandas", "PyTorch"]
  }
];

const SkillPathsPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      <main className="pt-20 pb-20">

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Hero Header */}
          <header className="max-w-3xl mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] mb-6"
            >
              🚀 Career Roadmaps
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1]" 
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Curated <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Skill Paths</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-xl font-medium leading-relaxed"
            >
              Don't just learn tools. Master entire domains with our structured skill paths designed to take you from beginner to industry-ready.
            </motion.p>
          </header>

          {/* Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_PATHS.map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col p-8 md:p-10 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all duration-500 overflow-hidden"
              >
                {/* Background Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${path.color} opacity-5 blur-[40px] group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                      {path.icon}
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      {path.duration}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-slate-950 mb-4 leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                    {path.title}
                  </h3>
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                    {path.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {path.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-lg bg-white border border-slate-100 text-slate-500 text-[11px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Intensity</span>
                      <span className="text-sm font-bold text-slate-900">{path.level}</span>
                    </div>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-slate-950 text-white font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                    >
                      Start Path
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SkillPathsPage;
