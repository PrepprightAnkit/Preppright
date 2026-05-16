import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Cpu, Users, BarChart3 } from "lucide-react";

const Empower = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: "interactive-modules",
      title: "Interactive Modules",
      desc: "Engage with immersive courses, gamified quizzes, and high-fidelity multimedia tailored for modern learners.",
      img: "/images/categories/development.png",
      icon: <Cpu size={28} strokeWidth={2.5} />,
      accent: "bg-blue-600",
    },
    {
      id: "mentorship-tracking",
      title: "Mentorship & Tracking",
      desc: "Get 1-on-1 human guidance and real-time progress insights to ensure you never lose your learning momentum.",
      img: "/images/categories/marketing.png",
      icon: <Users size={28} strokeWidth={2.5} />,
      accent: "bg-indigo-600",
    },
    {
      id: "advanced-analytics",
      title: "Advanced Analytics",
      desc: "Visualize your growth with deep-performance metrics, precision feedback, and AI-driven skill mapping.",
      img: "/images/categories/datascience.png",
      icon: <BarChart3 size={28} strokeWidth={2.5} />,
      accent: "bg-purple-600",
    },
  ];

  return (
    <section
      id="empower-section"
      className="bg-white relative overflow-hidden py-16 md:py-24"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 gap-6 md:gap-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-slate-950 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]"
            >
              🚀 PreppRight Standard
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 mb-6 tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Experience a New <br />
              <span className="text-indigo-600">Standard</span> of Learning
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed mx-auto"
          >
            We don't just teach courses. We build careers with cutting-edge
            tools and personalized mentorship.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)] transition-all duration-700 flex flex-col h-full"
            >
              <div className="p-10 pb-0">
                <div
                  className={`w-14 h-14 rounded-xl ${card.accent} text-white flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {card.icon}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight"
                  style={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-base">
                  {card.desc}
                </p>
                <button
                  onClick={() => navigate(`/advantage/${card.id}`)}
                  className="flex items-center gap-2 text-indigo-600 font-black text-[11px] uppercase tracking-widest group-hover:gap-4 transition-all"
                >
                  Explore Feature <span className="text-lg">→</span>
                </button>
              </div>

              <div className="mt-12 aspect-[16/10] bg-slate-50 relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Empower;
