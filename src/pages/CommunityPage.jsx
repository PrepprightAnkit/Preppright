import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

const FORUMS = [
  {
    id: "career-talk",
    title: "Career & Placement",
    description: "Discuss job search strategies, resume tips, and interview experiences.",
    members: "12.4k",
    posts: "1.2k today",
    icon: "💼",
    color: "bg-blue-500"
  },
  {
    id: "project-showcase",
    title: "Project Showcase",
    description: "Share what you've built, get feedback, and find collaborators.",
    members: "8.2k",
    posts: "450 today",
    icon: "🚀",
    color: "bg-purple-500"
  },
  {
    id: "tech-trends",
    title: "Tech Trends",
    description: "Stay updated with the latest in AI, Web3, and Software Architecture.",
    members: "15k",
    posts: "2.1k today",
    icon: "🌐",
    color: "bg-emerald-500"
  },
  {
    id: "help-center",
    title: "Doubts & Debugging",
    description: "Stuck on a bug? Post your code and get help from the community.",
    members: "20k",
    posts: "5k today",
    icon: "🐛",
    color: "bg-rose-500"
  }
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="pt-20 pb-20">

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <header className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
            <div className="max-w-2xl text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] mb-6"
              >
                🤝 Student Community
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-slate-950 mb-8 leading-[1.1]"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Learn Better <span className="text-indigo-600 underline decoration-indigo-100 decoration-8 underline-offset-4">Together</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-xl font-medium leading-relaxed"
              >
                Join the largest network of tech aspirants. Solve doubts, collaborate on projects, and build lifelong professional connections.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-sm aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-2xl shadow-slate-200"
            >
               {/* Simplified Community Visual */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-8">
                     {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center text-xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                           👤
                        </div>
                     ))}
                  </div>
               </div>
               <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-indigo-600/20 to-transparent" />
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORUMS.map((forum, i) => (
              <motion.div
                key={forum.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-lg ${forum.color} text-white flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {forum.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  {forum.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                  {forum.description}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="text-slate-900">{forum.members} Members</span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-emerald-500">{forum.posts}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-12 md:p-20 rounded-xl bg-slate-950 text-white text-center relative overflow-hidden"
          >
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>Ready to join the conversation?</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="w-full sm:w-auto px-10 py-5 rounded-xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30">
                      Join Global Discord
                   </button>
                   <Link to="/discuss" className="w-full sm:w-auto px-10 py-5 rounded-xl bg-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-md">
                      Go to Forums
                   </Link>
                </div>
             </div>
             {/* Decorative spheres */}
             <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl" />
             <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;
