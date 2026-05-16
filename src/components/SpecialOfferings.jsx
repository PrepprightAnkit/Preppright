import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Milestone, CodeXml, Globe } from "lucide-react";

const SpecialOfferings = () => {
  const offerings = [
    {
      title: "Skill Paths",
      desc: "Structured roadmaps from Zero to Hero in specific tech domains.",
      path: "/skill-paths",
      icon: <Milestone size={30} strokeWidth={2.5} />,
      color: "from-indigo-600 to-blue-600",
      tag: "NEW",
    },
    {
      title: "Practice Lab",
      desc: "Daily challenges and mock interviews to master your craft.",
      path: "/practice",
      icon: <CodeXml size={30} strokeWidth={2.5} />,
      color: "from-pink-600 to-rose-600",
      tag: "INTERACTIVE",
    },
    {
      title: "Community",
      desc: "Network with thousands of tech aspirants and mentors.",
      path: "/community",
      icon: <Globe size={30} strokeWidth={2.5} />,
      color: "from-emerald-500 to-teal-600",
      tag: "VIBRANT",
    },
  ];

  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Unlock <span className="text-indigo-600">Exclusive</span> Learning
          </h2>
          <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Beyond standard courses, we provide the tools and communities you
            need to succeed in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 rounded-[40px] bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)] transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-10">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-2xl shadow-indigo-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  {item.icon}
                </div>
                <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] md:text-xs font-black tracking-widest uppercase">
                  {item.tag}
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-black text-slate-950 mb-4 tracking-tight leading-tight"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-slate-600 font-medium mb-10 text-base leading-relaxed">
                {item.desc}
              </p>

              <Link
                to={item.path}
                className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group/link hover:gap-4 transition-all"
              >
                Explore Now
                <span className="text-lg">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferings;
