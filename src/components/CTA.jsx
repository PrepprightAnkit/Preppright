import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => (
  <section className="bg-white">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-slate-950 rounded-[48px] md:rounded-[64px] p-8 md:p-24 text-center relative overflow-hidden"
      >
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-600/20 rounded-full blur-[100px] md:blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-violet-600/10 rounded-full blur-[100px] md:blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm md:text-base font-black uppercase tracking-widest"
          >
            Start Your Transformation
          </motion.div>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Ready to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Scale New Heights
            </span>{" "}
            <br /> In Your Career?
          </h2>

          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16 font-medium leading-relaxed">
            Join 15,000+ students and professionals who have transformed their
            lives through PreppRight's industry-standard training.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-h-[56px] px-10 rounded-2xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-2xl shadow-white/5 active:scale-95"
            >
              Get Started for Free
            </a>
            <Link
              to="/courses"
              className="flex items-center justify-center min-h-[56px] px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
