import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, Flame, Rocket } from "lucide-react";

const SLIDES = [
  {
    tag: "Get Certified. Get Ahead",
    title: (
      <>
        Of the Industry <br />
        <span className="text-indigo-600">Grow with PreppRight</span>
      </>
    ),
    desc: "Join 5M+ learners worldwide. Experience live interactive classes and report massive career growth with our industry-recognized certifications.",
    img: "/images/courses/abc/fullstack .png",
    badge: (
      <span className="flex items-center gap-2">
        <Star size={16} className="text-amber-400 fill-amber-400" /> Top Rated Platform
      </span>
    ),
    stats: [
      { label: "Careers Advanced", value: "5M+" },
      { label: "Live Classes", value: "1.5K+" },
      { label: "Career Hike", value: "85%" },
    ],
  },
  {
    tag: "Real Mentors. Real Code.",
    title: (
      <>
        Build Powerful <br />
        <span className="text-indigo-600">Java Applications</span>
      </>
    ),
    desc: "Join the most interactive learning community. We don't just teach code; we build careers through 1-on-1 human mentorship.",
    img: "/images/courses/abc/java.png",
    badge: (
      <span className="flex items-center gap-2">
        <Flame size={16} className="text-orange-500 fill-orange-500" /> Live Interaction
      </span>
    ),
  },
  {
    tag: "Future-Proof Careers",
    title: (
      <>
        Master the <br />
        <span className="text-violet-600">AI & ML Revolution</span>
      </>
    ),
    desc: "Don't just use AI, build it. Get hands-on training from industry experts who've worked at the world's biggest tech giants.",
    img: "/images/courses/ai_ml.png",
    badge: (
      <span className="flex items-center gap-2">
        <Rocket size={16} className="text-indigo-600 fill-indigo-600" /> 120% Avg. Hike
      </span>
    ),
  },
];

const SEARCHABLE_COURSES = [
  {
    id: "java-programming",
    title: "Java Programming Mastery",
    price: "₹6,000",
    duration: "3 Months",
    rating: "4.9",
    image: "/images/courses/abc/java.png",
  },
  {
    id: "full-stack-web-development",
    title: "Full Stack Web Development",
    price: "₹9,000",
    duration: "6 Months",
    rating: "4.8",
    image: "/images/courses/abc/fullstack .png",
  },
  {
    id: "data-science-roadmap",
    title: "Data Science Roadmap",
    price: "₹7,000",
    duration: "4 Months",
    rating: "4.8",
    image: "/images/courses/abc/datascience.png",
  },
  {
    id: "python-mastery",
    title: "Python Mastery Bootcamp",
    price: "₹6,000",
    duration: "3 Months",
    rating: "4.8",
    image: "/images/courses/abc/pythonmystry.png",
  },
  {
    id: "ai-ml-python",
    title: "AI & Machine Learning with Python",
    price: "₹9,000",
    duration: "4 Months",
    rating: "4.8",
    image: "/images/courses/ai_ml.png",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    price: "₹7,000",
    duration: "3 Months",
    rating: "4.8",
    image: "/images/courses/abc/cybersecurity.png",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Training",
    price: "₹9,000",
    duration: "2 Months",
    rating: "4.8",
    image: "/images/courses/abc/cloudcomputing.png",
  },
  {
    id: "hybrid-ev",
    title: "Hybrid Electric Vehicles",
    price: "₹9,000",
    duration: "4 Months",
    rating: "4.9",
    image: "/images/courses/abc/hybried.png",
  },
  {
    id: "autocad",
    title: "AutoCAD Mastery",
    price: "₹7,000",
    duration: "2 Months",
    rating: "4.7",
    image: "/images/courses/abc/AutoCAD.png",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Masterclass",
    price: "₹6,000",
    duration: "3 Months",
    rating: "4.8",
    image: "/images/courses/abc/digitalmarkerting.png",
  },
];

const Hero = ({ bannerVisible }) => {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = SEARCHABLE_COURSES.filter((course) =>
        course.title.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 5);
      setRecommendations(filtered);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <section
      style={{
        "--padding-top": bannerVisible
          ? "var(--pt-banner, 180px)"
          : "var(--pt-no-banner, 130px)",
      }}
      className={`hero-section-fix relative overflow-hidden bg-white transition-all duration-500 [--pt-banner:160px] md:[--pt-banner:180px] [--pt-no-banner:110px] md:[--pt-no-banner:130px]`}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-violet-50/30 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className="relative z-10 order-1 md:order-1 text-center flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 md:mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  {SLIDES[current].tag}
                </div>

                <h1
                  className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-[1.1] text-slate-950"
                  style={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  {SLIDES[current].title}
                </h1>

                <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mb-6 md:mb-8 font-medium mx-auto">
                  {SLIDES[current].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators moved below */}
          </div>

          {/* Visual Section */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] order-2 md:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: -1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full p-2 md:p-4">
                  {/* Premium Frame */}
                  <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-2xl">
                    <img
                      src={SLIDES[current].img}
                      alt="Course Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    {/* Floating Badge */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-3 left-3 right-3 md:bottom-8 md:left-8 md:right-8 p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[8px] md:text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-0.5 md:mb-1">
                          Current Trend
                        </div>
                        <div
                          className="text-xs md:text-lg font-black text-slate-900"
                          style={{ fontFamily: "'Lexend', sans-serif" }}
                        >
                          {SLIDES[current].badge}
                        </div>
                      </div>
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-white bg-slate-200 overflow-hidden"
                          >
                            <img
                              src={`https://i.pravatar.cc/100?img=${i + 10}`}
                              alt="User"
                            />
                          </div>
                        ))}
                        <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-white bg-indigo-600 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
                          +5k
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Search Bar & Buttons - Moved Below Image */}
      <div className="mt-8 md:mt-16 max-w-4xl px-4 relative z-50 mx-auto text-center">
        {/* Search Bar */}
        <div className="relative w-full mb-6 md:mb-10 group">
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl group-focus-within:blur-2xl transition-all rounded-full" />
          <div className="relative flex items-center bg-white p-2 md:p-3 rounded-xl border border-slate-200 shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
            <div className="pl-4 pr-2 text-slate-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Find Your Learning Path..."
              className="w-full py-3 md:py-4 bg-transparent text-slate-900 placeholder-slate-400 font-bold focus:outline-none text-sm md:text-lg"
            />
            <button className="px-6 md:px-12 py-3.5 md:py-5 rounded-lg bg-indigo-600 text-white font-black text-sm md:text-base uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              Search
            </button>
          </div>

          <AnimatePresence>
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden z-[100] p-3"
              >
                {recommendations.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full flex items-center gap-5 p-3 hover:bg-indigo-50/50 rounded-2xl transition-all group text-left"
                  >
                    <div className="w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-slate-900 font-black text-sm md:text-base truncate group-hover:text-indigo-600 transition-colors"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-indigo-600 font-black text-[11px] md:text-xs tracking-tighter">
                          {course.price}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-slate-400 font-bold text-[10px] md:text-[11px] uppercase tracking-widest">
                          {course.duration}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-amber-400 font-black text-[10px] md:text-[11px] flex items-center gap-1">
                          <Star size={12} className="fill-amber-400" /> {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#courses"
            className="w-full sm:w-auto flex items-center justify-center min-h-[64px] px-12 rounded-xl bg-slate-950 text-white font-black text-base uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
          >
            Join for Free
          </a>
          <a
            href="#courses"
            className="w-full sm:w-auto flex items-center justify-center min-h-[64px] px-12 rounded-xl bg-white border-2 border-slate-100 text-slate-900 font-black text-base uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
          >
            Explore Courses
          </a>
        </div>

        {/* Slide Indicators Centered */}
        <div className="flex justify-center gap-3 mt-8 md:mt-12">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-12 bg-indigo-600" : "w-3 bg-slate-200 hover:bg-slate-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
