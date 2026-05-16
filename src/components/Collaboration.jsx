import React from "react";

const COLLAB_LOGOS = [
  "WhatsApp Image 2026-05-09 at 7.01.54 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 7.02.05 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 7.03.45 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 7.04.41 PM.jpeg",
];

const Collaboration = () => {
  const scrollLogos = [...COLLAB_LOGOS, ...COLLAB_LOGOS, ...COLLAB_LOGOS]; // More repeats for smaller lists

  return (
    <section className="bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-center">
        <p className="text-sm md:text-base font-black text-indigo-600 uppercase tracking-[0.3em] mb-3">
          Industry Collaborations
        </p>
        <h2
          className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Bridging the Gap Between{" "}
          <span className="text-indigo-600">Academia & Industry</span>
        </h2>
      </div>

      <div className="relative w-full">
        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-reverse whitespace-nowrap gap-12 md:gap-24 items-center">
          {scrollLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white p-8 rounded-3xl border border-slate-200/50 flex items-center justify-center w-72 h-40 shadow-sm transition-transform hover:scale-105 duration-300"
            >
              <img
                src={`/images/courses/Collaboration/${logo}`}
                alt="Collaboration Partner"
                className="max-h-full max-w-full object-contain grayscale-[20%] hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 25s linear infinite;
          width: max-content;
        }
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Collaboration;
