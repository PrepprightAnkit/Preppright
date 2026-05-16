import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EnrollmentBanner = ({ visible: propsVisible, setVisible: propsSetVisible }) => {
  // Use local state if props are not provided
  const [internalVisible, setInternalVisible] = useState(true);
  const visible = propsVisible !== undefined ? propsVisible : internalVisible;
  const setVisible = propsSetVisible !== undefined ? propsSetVisible : setInternalVisible;

  const [time, setTime] = useState({ h: 14, m: 47, s: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (n) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-0 left-0 right-0 z-[2000] bg-indigo-600 text-white"
        >
          <div className="w-full max-w-7xl mx-auto px-4 h-12 md:h-14 flex items-center justify-between gap-4">
            
            {/* Left Side: Info */}
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold uppercase tracking-widest">
                Flash Sale
              </span>
              <p className="text-xs md:text-sm font-bold truncate">
                Enroll now & get 60% OFF on all Masterclasses! 
                <span className="hidden lg:inline font-medium opacity-80 ml-2">Offer valid for a limited time only.</span>
              </p>
            </div>

            {/* Right Side: Timer & Action */}
            <div className="flex items-center gap-4 md:gap-8 shrink-0">
              {/* Timer */}
              <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black tabular-nums">
                <span className="opacity-70 hidden xs:inline">Ends In:</span>
                <div className="flex gap-1">
                  <span>{fmt(time.h)}h</span>
                  <span className="opacity-50">:</span>
                  <span>{fmt(time.m)}m</span>
                  <span className="opacity-50">:</span>
                  <span className="text-amber-300">{fmt(time.s)}s</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white text-indigo-600 font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
              >
                Enroll Now
              </a>

              {/* Close Button */}
              <button 
                onClick={() => setVisible(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close Banner"
              >
                <svg className="w-4 h-4 md:w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentBanner;
