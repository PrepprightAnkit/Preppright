import React from "react";

const PARTNER_LOGOS = [
  "WhatsApp Image 2026-05-09 at 6.32.51 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 6.33.05 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 6.37.21 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 6.39.58 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 6.41.12 PM.jpeg",
  "WhatsApp Image 2026-05-09 at 6.59.16 PM.jpeg",
];

const CredentialsPartner = () => {
  const scrollLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="bg-white overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-center">
        <p className="text-sm md:text-base font-black text-indigo-600 uppercase tracking-[0.3em] mb-3">
          Our Credentials & Partners
        </p>
        <h2
          className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Certified & Recognized by{" "}
          <span className="text-indigo-600">Leading Institutions</span>
        </h2>
      </div>

      <div className="relative w-full">
        {/* Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-mid whitespace-nowrap gap-12 md:gap-20 items-center">
          {scrollLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-slate-50 p-8 rounded-3xl border border-slate-200/50 flex items-center justify-center w-64 h-36 transition-transform hover:scale-105 duration-300"
            >
              <img
                src={`/images/courses/Creditional_partner/${logo}`}
                alt="Partner Credential"
                className="max-h-full max-w-full object-contain grayscale-[20%] hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-mid {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-mid {
          animation: scroll-mid 35s linear infinite;
          width: max-content;
        }
        .animate-scroll-mid:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CredentialsPartner;
