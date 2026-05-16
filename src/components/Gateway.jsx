import React from "react";
import { motion } from "framer-motion";
import { Handshake, Trophy, GraduationCap, CreditCard } from "lucide-react";

const Gateway = () => {
  const stats = [
    {
      icon: <Handshake size={32} strokeWidth={2.5} />,
      title: "850+ Partners",
      desc: "Global network of top-tier institutions",
      color: "indigo",
    },
    {
      icon: <Trophy size={32} strokeWidth={2.5} />,
      title: "45K+ Stories",
      desc: "Transforming dreams into achievements",
      color: "emerald",
    },
    {
      icon: <GraduationCap size={32} strokeWidth={2.5} />,
      title: "50% Scholarship",
      desc: "Unlock your full academic potential",
      color: "amber",
    },
    {
      icon: <CreditCard size={32} strokeWidth={2.5} />,
      title: "EMI Available",
      desc: "Affordable world-class education",
      color: "blue",
    },
  ];

  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-24">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-widest"
          >
            Global Reach
          </motion.div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 mb-6 tracking-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Gateway to <span className="text-indigo-600">Global Education</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Empowering students to achieve their dream career with personalized
            guidance and unparalleled support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] text-center hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 group"
            >
              <div className="flex justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gateway;
