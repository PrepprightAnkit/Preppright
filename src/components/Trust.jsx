import React from "react";
import { motion } from "framer-motion";

const STUDENT_IMAGES = [
  "image.png",
  "image copy.png",
  "image copy 2.png",
  "image copy 3.png",
  "image copy 4.png",
  "image copy 5.png",
  "image copy 6.png",
  "image copy 7.png",
  "image copy 8.png",
  "image copy 9.png",
];

const Trust = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 text-center">
        <div className="mb-8 md:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm md:text-base font-black text-slate-400 uppercase tracking-[0.3em] mb-4"
          >
            Alumni Success
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Our Alumni Work At{" "}
            <span className="text-indigo-600">Global Giants</span>
          </motion.h2>
        </div>

        {/* Student Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {STUDENT_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square sm:aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-premium group border border-slate-100 bg-white p-4 md:p-6 flex items-center justify-center"
            >
              <img
                src={`/images/Students_working/${img}`}
                alt="Alumni Success Logo"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Partner";
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
