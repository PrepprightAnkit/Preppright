import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const ADVANTAGE_DATA = {
  "interactive-modules": {
    title: "Interactive Learning Modules",
    subtitle: "Reimagining the Digital Classroom",
    heroImg: "/images/categories/development.png",
    content: "Our interactive modules are designed to break the monotony of traditional online learning. We combine video, real-time quizzes, and gamified challenges to ensure 100% engagement.",
    features: [
      { title: "Real-time Quizzes", desc: "Test your knowledge instantly with pop-up quizzes integrated into lessons." },
      { title: "Gamified Progress", desc: "Earn badges and climb the leaderboard as you complete complex tasks." },
      { title: "Hands-on Sandboxes", desc: "Practice code or business strategies directly within the learning environment." }
    ]
  },
  "mentorship-tracking": {
    title: "Personalized Mentorship & Tracking",
    subtitle: "Your Success, Our Mission",
    heroImg: "/images/categories/marketing.png",
    content: "We don't just provide content; we provide a roadmap. Every student is paired with an industry mentor who tracks progress and provides weekly actionable feedback.",
    features: [
      { title: "1-on-1 Guidance", desc: "Dedicated time with experts to solve doubts and plan your career path." },
      { title: "Skill Gap Analysis", desc: "Identify exactly what you need to learn to land your dream job." },
      { title: "Portfolio Reviews", desc: "Get professional feedback on your projects before you show them to recruiters." }
    ]
  },
  "advanced-analytics": {
    title: "Advanced Data Analytics",
    subtitle: "Precision Performance Insights",
    heroImg: "/images/categories/datascience.png",
    content: "Gain deep insights into your learning behavior. Our AI-driven analytics platform shows you where you're excelling and where you need to focus more effort.",
    features: [
      { title: "Progress Visualization", desc: "Beautiful charts and heatmaps that show your growth over time." },
      { title: "Attendance Tracking", desc: "Never miss a beat with automated attendance and engagement reports." },
      { title: "Career Readiness Score", desc: "A data-backed score that measures how ready you are for the industry." }
    ]
  }
};

const AdvantageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = ADVANTAGE_DATA[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) return <div className="py-40 text-center">Page not found</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-3 py-1 mb-8 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
              The Advantage
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
              {data.title}
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-slate-900 mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>Why It Matters</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                {data.content}
              </p>
              <div className="space-y-6">
                {data.features.map((feat, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-indigo-600 font-bold">0{i+1}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-premium"
            >
              <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Ready to experience the PreppRight difference?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/courses')}
              className="px-10 py-4 rounded-xl bg-indigo-600 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95"
            >
              Explore Courses
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-10 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdvantageDetailPage;
