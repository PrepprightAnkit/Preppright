import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Terminal, Users, Rocket } from "lucide-react";

const Features = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-widest"
        >
          Why Choose PreppRight
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Experience a <span className="text-indigo-600">New Standard</span> of
          Learning
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Large Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 group flex flex-col items-start text-left"
        >
          <div className="w-16 h-16 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
            <GraduationCap size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h3
              className="text-2xl md:text-3xl font-black text-slate-950 mb-4 tracking-tight leading-tight"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Industry-Led Curriculum
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
              Our courses are designed and taught by experts from top tech
              companies like Google, Meta, and Amazon, ensuring you learn
              exactly what the industry demands.
            </p>
          </div>
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 md:p-10 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 flex flex-col justify-start group min-h-[340px]"
        >
          <div className="w-16 h-16 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
            <Terminal size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h3
              className="text-xl md:text-2xl font-black text-slate-950 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Live Hands-on Labs
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Don't just watch videos. Code in real-time with mentors in our
              advanced cloud-based labs.
            </p>
          </div>
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 flex flex-col justify-start group min-h-[340px]"
        >
          <div className="w-16 h-16 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-sm">
            <Users size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h3
              className="text-xl md:text-2xl font-black text-slate-950 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              1-on-1 Mentorship
            </h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              Get personalized guidance from industry veterans to clear your
              doubts and plan your career.
            </p>
          </div>
        </motion.div>

        {/* Large Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 group flex flex-col items-start text-left"
        >
          <div className="w-16 h-16 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
            <Rocket size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h3
              className="text-2xl md:text-3xl font-black text-slate-950 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Guaranteed Career Growth
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium max-w-2xl">
              With our dedicated placement cell and resume workshops, we help
              you land your dream job with an average salary hike of 120%.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Features;
