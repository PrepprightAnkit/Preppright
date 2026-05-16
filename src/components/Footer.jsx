import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-950 text-white pt-20 pb-10 md:pt-32 md:pb-16 overflow-hidden relative">
    {/* Decorative background element */}
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-600/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
    
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20 md:mb-24">
        
        {/* Brand Column */}
        <div className="space-y-6 md:space-y-8 text-center sm:text-left">
          <Link to="/" className="inline-block">
            <img src="/images/PreepPright-Yv6Az5Se.png" alt="PreppRight" className="h-10 md:h-12 w-auto brightness-0 invert mx-auto sm:mx-0" />
          </Link>
          <p className="text-slate-400 leading-relaxed max-w-xs mx-auto sm:mx-0 font-medium text-sm md:text-base">
            Empowering the next generation of digital professionals through practical, industry-standard education and career-focused training.
          </p>
          <div className="flex justify-center sm:justify-start gap-4">
            {[
              { href: "https://www.youtube.com/@preppright", icon: "youtube" },
              { href: "https://www.linkedin.com/company/preppright", icon: "linkedin" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300"
              >
                {social.icon === "youtube" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div className="text-center sm:text-left">
          <h4 className="text-white font-bold text-lg mb-6 md:mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>Platform</h4>
          <div className="flex flex-col gap-4">
            <Link to="/courses" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Masterclass Courses</Link>
            <Link to="/skill-paths" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Skill Paths</Link>
            <Link to="/practice" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Practice & Assessment</Link>
            <Link to="/community" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Student Community</Link>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-white font-bold text-lg mb-6 md:mb-8" style={{ fontFamily: "'Lexend', sans-serif" }}>Support</h4>
          <div className="flex flex-col gap-4">
            <Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Help Center</Link>
            <Link to="/terms" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Terms of Service</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Privacy Policy</Link>
            <Link to="/refund" className="text-slate-400 hover:text-indigo-400 transition-colors py-1">Refund Policy</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white/5 p-6 md:p-8 rounded-xl border border-white/10 text-center sm:text-left">
          <h4 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Lexend', sans-serif" }}>Newsletter</h4>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">Stay updated with our latest courses and career opportunities.</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full min-h-[48px] px-6 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Subscribe Now
          </a>
        </div>
      </div>

      {/* Bottom Bar - Stacking Logic */}
      <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 text-center">
        <p className="text-slate-500 text-sm font-medium">
          © 2026 PreppRight Education. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 text-slate-500 text-sm font-medium">
          <div className="flex gap-6">
             <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
