import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const DiscussPage = () => {
  const threads = [
    {
      title: "How to prepare for Google SDE role?",
      author: "Rahul S.",
      replies: 24,
      category: "Career",
      tags: ["Google", "Interview"],
      icon: "🎯",
    },
    {
      title: "Spring Boot vs Node.js for Enterprise Apps",
      author: "Sneha P.",
      replies: 15,
      category: "Backend",
      tags: ["Spring", "Tech Stack"],
      icon: "⚡",
    },
    {
      title: "Latest trends in UI/UX for 2025",
      author: "Amit V.",
      replies: 38,
      category: "Design",
      tags: ["Trends", "UX"],
      icon: "🎨",
    },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            PreppRight Community
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tighter leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Connect. Learn. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Succeed Together.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Join 50,000+ ambitious learners and industry experts. Solve doubts, share insights, and build your professional network.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search discussions, topics, or mentors..." 
              className="w-full pl-16 pr-8 py-6 rounded-xl border border-slate-100 bg-white shadow-premium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-lg font-medium"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Discussions List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>Recent Discussions</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold">Latest</button>
                  <button className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 text-sm font-bold hover:bg-slate-50">Popular</button>
                </div>
              </div>

              {threads.map((thread, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-8 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-premium cursor-pointer"
                >
                  <div className="flex gap-8 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-indigo-50 group-hover:scale-110 transition-all">
                      {thread.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                          {thread.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">Posted by <span className="text-slate-900 font-bold">{thread.author}</span></span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                        {thread.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {thread.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-center px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-indigo-100 transition-colors">
                      <div className="text-2xl font-black text-slate-900 leading-none mb-1">{thread.replies}</div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Replies</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Empty State / Coming Soon */}
              <div className="bg-slate-50/50 rounded-xl p-16 text-center border-2 border-dashed border-slate-100">
                <div className="text-5xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Expanding Community</h3>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
                  We're migrating to a new real-time collaboration engine to provide a smoother experience.
                </p>
                <button className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-indigo-600 transition-all shadow-lg">
                  Join Beta Access
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats Card */}
              <div className="bg-slate-900 text-white p-10 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                <h4 className="text-xl font-bold mb-8 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>Live Community Stats</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <span className="text-slate-400 font-medium">Online Now</span>
                    <span className="flex items-center gap-2 text-emerald-400 font-black">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      1,240
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                    <span className="text-slate-400 font-medium">Total Threads</span>
                    <span className="text-white font-black">15.4K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Expert Mentors</span>
                    <span className="text-indigo-400 font-black">450+</span>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-premium">
                <h4 className="text-xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>Top Contributors</h4>
                <p className="text-sm text-slate-400 font-medium mb-8">Most active this month</p>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600">
                        U{i}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-black text-slate-900">User_{i}502</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry Mentor</div>
                      </div>
                      <div className="text-sm font-black text-indigo-600">
                        {500 - i * 40} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-indigo-600 p-10 rounded-xl text-white text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">Start a Discussion</h4>
                  <p className="text-indigo-100 text-sm mb-8 font-medium">Have a doubt? Ask the community now.</p>
                  <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-all shadow-xl">
                    Post Question
                  </button>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DiscussPage;
