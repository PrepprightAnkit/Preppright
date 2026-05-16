import React from "react";

const PLACEMENT_LOGOS = [
  "WhatsApp Image 2026-05-09 at 5.39.19 PM (1).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.19 PM (2).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.19 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.20 PM (1).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.20 PM (2).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.20 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.21 PM (1).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.21 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.46 PM (1).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.46 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.47 PM (1).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.47 PM (2).jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.47 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 5.39.48 PM.jpeg",
];

const Placement = () => {
  const scrollLogos = [...PLACEMENT_LOGOS, ...PLACEMENT_LOGOS];

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-center">
        <div className="inline-block px-4 py-2 mb-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm md:text-base font-black uppercase tracking-widest">
          Alumni Success
        </div>
        <h2
          className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Our Students are{" "}
          <span className="text-indigo-600">Successfully Placed</span>
        </h2>
      </div>

      <div className="relative w-full">
        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-placement whitespace-nowrap gap-6 md:gap-8 items-center">
          {scrollLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-md group hover:shadow-xl transition-all duration-300">
                <img
                  src={`/images/courses/placement/${logo}`}
                  alt="Placed Student"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=Success";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-placement {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-placement {
          animation: scroll-placement 40s linear infinite;
          width: max-content;
        }
        .animate-scroll-placement:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Placement;
