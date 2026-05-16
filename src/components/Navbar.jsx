import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { courseDetails } from "../data/coursesData";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/categories", label: "Industrial Trainings" },
  { to: "/courses", label: "Courses" },
  { to: "/discuss", label: "Discuss" },
  { to: "/quiz", label: "Quiz" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ bannerVisible }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchableCourses = Object.values(courseDetails).map(course => ({
    id: course.id,
    title: course.title,
    price: course.price,
    duration: course.duration,
    rating: course.rating,
    image: course.image_url
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle Swipe Gesture (Right to Left to Open, Left to Right to Close)
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchStartX - touchEndX;
      const deltaY = Math.abs(touchStartY - touchEndY);

      // Thresholds: 70px horizontal, 50px max vertical deviation
      if (deltaY < 50) {
        if (deltaX > 70) {
          // Swiped Left (Open Menu)
          setMenuOpen(true);
        } else if (deltaX < -70) {
          // Swiped Right (Close Menu)
          setMenuOpen(false);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = searchableCourses.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setRecommendations(filtered);
    } else {
      setRecommendations([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-[1000] transition-all duration-500 border-b ${
          bannerVisible ? "top-12 md:top-14" : "top-0"
        } ${
          scrolled 
          ? "h-20 bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-lg" 
          : "h-20 bg-white/70 backdrop-blur-md border-slate-200/10 shadow-sm"
        }`}
      >

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/images/PreepPright-Yv6Az5Se.png" 
              alt="PreppRight" 
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </Link>


          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative group py-2 text-[12px] font-black uppercase tracking-widest transition-colors ${
                  isActive(link.to) ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-1 bg-indigo-600 rounded-full"
                  initial={false}
                  animate={{ width: isActive(link.to) ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>


          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center h-11 px-8 rounded-xl bg-slate-950 text-white text-[13px] font-bold hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95"
            >
              Join Now
            </a>
            
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/5 text-slate-900 hover:bg-indigo-600 hover:text-white transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4">
                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${menuOpen ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 w-full h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${menuOpen ? "top-2 -rotate-45" : "top-3.5"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[2000] bg-slate-950/40 backdrop-blur-md lg:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] z-[2001] bg-white shadow-2xl flex flex-col lg:hidden"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-50">
                <img 
                  src="/images/PreepPright-Yv6Az5Se.png" 
                  alt="PreppRight" 
                  className="h-10 w-auto object-contain" 
                />
                <button 
                  onClick={() => setMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Mobile Search Bar */}
                <div className="relative mb-6">
                  <div className="relative flex items-center bg-slate-100 p-3 rounded-xl border border-transparent focus-within:border-indigo-400 focus-within:bg-white transition-all">
                    <div className="pl-1 pr-2 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search course..."
                      className="w-full py-1 bg-transparent text-slate-900 placeholder-slate-500 font-bold focus:outline-none text-sm"
                    />
                  </div>
                  
                  {recommendations.length > 0 && (
                    <div className="mt-2 bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden p-2">
                      {recommendations.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => {
                            navigate(`/course/${course.id}`);
                            setMenuOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-indigo-50 rounded-lg text-left"
                        >
                          <div className="w-12 h-9 rounded-md overflow-hidden flex-shrink-0">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-slate-900 font-bold text-xs truncate">{course.title}</h4>
                            <p className="text-indigo-600 font-black text-[10px]">{course.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                        isActive(link.to) 
                        ? "bg-indigo-50 text-indigo-600" 
                        : "text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-slate-50">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full min-h-[56px] rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-200"
                >
                  Join Now
                </a>
                <p className="mt-4 text-center text-slate-400 text-sm font-medium">
                  Start your learning journey today.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
