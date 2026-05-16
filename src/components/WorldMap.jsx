import React from "react";
import { motion } from "framer-motion";

const WorldMap = () => {
  const pins = [
    { t: "35%", l: "18%", n: "USA" }, 
    { t: "62%", l: "28%", n: "Brazil" }, 
    { t: "25%", l: "48%", n: "Europe" }, 
    { t: "50%", l: "50%", n: "Africa" }, 
    { t: "38%", l: "55%", n: "UAE" }, 
    { t: "48%", l: "65%", n: "India" }, 
    { t: "28%", l: "68%", n: "Russia" }, 
    { t: "65%", l: "82%", n: "Australia" },
  ];

  return (
    <section className="bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-widest"
          >
            Global Presence
          </motion.div>
          <h2
            className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Connecting Learners <br />{" "}
            <span className="text-indigo-600">Around the World</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            We dedicate ourselves to helping every student improve in every
            place. Join a truly global community.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Scroll Wrapper for Mobile */}
          <div className="overflow-x-auto pb-8 no-scrollbar md:overflow-visible">
            <div className="relative min-w-[800px] md:min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="/map.png"
                  alt="Global Connections"
                  className="w-full h-auto drop-shadow-sm mb-6"
                  onError={(e) => {
                    e.target.src = "/world_map.png";
                  }}
                />

                {/* Indigo Pins */}
                {pins.map((loc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    style={{ top: loc.t, left: loc.l }}
                    className="absolute z-10"
                  >
                    <div className="relative group flex flex-col items-center">
                      <svg 
                        width="22" height="22" viewBox="0 0 24 24" fill="none" 
                        className="text-indigo-600 drop-shadow-md group-hover:scale-125 transition-transform cursor-pointer"
                      >
                        <path 
                          d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z" 
                          fill="currentColor" 
                          fillOpacity="0.2"
                          stroke="currentColor" 
                          strokeWidth="2" 
                        />
                        <circle cx="12" cy="9" r="3" fill="currentColor" />
                      </svg>
                      <div className="absolute inset-0 w-full h-full bg-indigo-500 rounded-full animate-ping opacity-20" />
                      
                      {/* Label */}
                      <span className="mt-1 px-2.5 py-1 rounded-lg bg-white shadow-xl border border-slate-100 text-[10px] font-black text-slate-800 uppercase tracking-tighter transition-all">
                        {loc.n}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Feature Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-2">
            {[
              { label: "Global Mentorship", icon: "🌍", color: "#6366f1" },
              { label: "24/7 Support", icon: "🕒", color: "#ec4899" },
              { label: "Industry Partners", icon: "🤝", color: "#f59e0b" },
              { label: "Remote Learning", icon: "💻", color: "#10b981" },
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{ background: `${point.color}10`, color: point.color }}
                >
                  {point.icon}
                </div>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest leading-tight">
                  {point.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default WorldMap;
