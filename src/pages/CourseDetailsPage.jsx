import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { courseDetails } from "../data/coursesData";

/* ─── Keyframe injection (runs once) ─── */
const injectKeyframes = () => {
  if (document.getElementById("cdp-keyframes")) return;
  const style = document.createElement("style");
  style.id = "cdp-keyframes";
  style.textContent = `
    @keyframes cdp-fadeUp   { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:translateY(0);} }
    @keyframes cdp-fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes cdp-pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }
    @keyframes cdp-float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
    @keyframes cdp-spin     { to { transform:rotate(360deg); } }
    @keyframes cdp-shimmer  { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes cdp-ticker   { from{transform:translateX(0);} to{transform:translateX(-50%);} }
    @keyframes cdp-glow     { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,.3);} 50%{box-shadow:0 0 40px rgba(99,102,241,.7);} }
    @keyframes cdp-barFill  { from{width:0;} to{width:var(--w);} }
    .cdp-ani-1{animation:cdp-fadeUp .7s ease both;}
    .cdp-ani-2{animation:cdp-fadeUp .7s .15s ease both;}
    .cdp-ani-3{animation:cdp-fadeUp .7s .3s ease both;}
    .cdp-ani-4{animation:cdp-fadeUp .7s .45s ease both;}
    .cdp-float{animation:cdp-float 4s ease-in-out infinite;}
    .cdp-enroll-btn:hover{transform:scale(1.04) translateY(-2px)!important;box-shadow:0 20px 50px rgba(99,102,241,.5)!important;}
    .cdp-enroll-btn:active{transform:scale(.97)!important;}
    .cdp-mod-item:hover{border-color:rgba(99,102,241,.5)!important;background:rgba(99,102,241,.07)!important;}
    .cdp-tool-card:hover{border-color:rgba(99,102,241,.6)!important;transform:translateY(-6px)!important;}
    .cdp-proj-card:hover{border-color:rgba(99,102,241,.4)!important;transform:translateY(-8px)!important;}
    .cdp-proj-card:hover .cdp-proj-icon{transform:scale(1.1) rotate(-5deg)!important;}
    .cdp-inst-card:hover{border-color:rgba(99,102,241,.4)!important;transform:translateY(-4px)!important;}
    .cdp-outcome-card:hover{background:rgba(99,102,241,.12)!important;border-color:rgba(99,102,241,.5)!important;color:#a5b4fc!important;}
    .cdp-faq-item:hover{border-color:rgba(99,102,241,.3)!important;}
    .cdp-stat-bar{animation:cdp-barFill 1.2s ease forwards;}
    .cdp-sticky-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;}
    @keyframes cdp-shimmer-banner { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  `;
  document.head.appendChild(style);
};

/* ─── Tiny icon SVGs ─── */
const IcClock = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IcStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IcCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcUsers = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IcBriefcase = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IcPlay = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IcArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IcShield = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IcLightning = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IcTrophy = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="8 21 12 21 16 21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5 5 5 0 0 0 5-5V4z" />
    <path d="M17 4h3a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4z" />
    <line x1="12" y1="12" x2="12" y2="17" />
  </svg>
);
const IcGlobe = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IcVideo = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);
const IcLinkedin = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IcUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── Token pill ─── */
const Pill = ({ children, color = "#6366f1", bg = "rgba(99,102,241,.12)" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "6px 16px",
      borderRadius: 99,
      background: bg,
      color,
      fontSize: 14,
      fontWeight: 800,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      border: `1px solid ${color}33`,
    }}
  >
    {children}
  </span>
);

/* ─── Stat card ─── */
const StatCard = ({ icon, label, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 20px",
      borderRadius: 12,
      background: "rgba(0,0,0,0.03)",
      border: "1px solid rgba(0,0,0,0.05)",
      transition: "all .3s",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 8,
        background: "rgba(99,102,241,.15)",
        border: "1px solid rgba(99,102,241,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#818cf8",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <p
        style={{
          fontSize: 10,
          color: "#64748b",
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#0f172a",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>
    </div>
  </div>
);


/* ─── FAQ item ─── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((p) => !p)}
      className="cdp-faq-item"
      style={{
        padding: "20px 24px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(0,0,0,0.03)",
        cursor: "pointer",
        transition: "border-color .3s",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{ margin: 0, fontWeight: 700, color: "#0f172a", fontSize: 15 }}
        >
          {q}
        </p>
        <span
          style={{
            color: "#6366f1",
            fontSize: 22,
            lineHeight: 1,
            transition: "transform .3s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </div>
      {open && (
        <p
          style={{
            margin: "12px 0 0",
            color: "#64748b",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
};

/* ─── Custom Hook for Responsive ─── */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

/* ─── Main Component ─── */
const CourseDetailsPage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseDetails[id];
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const heroRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 55,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23; // Reset to 23 if needed or stop
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => num.toString().padStart(2, "0");

  useEffect(() => {
    injectKeyframes();
    window.scrollTo(0, 0);
    const onScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [id]);

  if (!course)
    return (
      <div
        style={{
          color: "#e2e8f0",
          textAlign: "center",
          padding: "80px 0",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Course not found
      </div>
    );

  const tickerItems = [
    "100% Placement Assistance",
    "Live Mentorship",
    "Lifetime Access",
    "Real Projects",
    "Expert Instructors",
    "Certificate Included",
  ];

  const faqs = [
    {
      q: "Do I need prior coding experience?",
      a: "No prior experience is needed. We start from absolute basics and take you to an advanced, job-ready level.",
    },
    {
      q: "Is this course fully online or offline?",
      a: "Fully online with live weekend sessions, recorded lectures, and 24/7 Discord support.",
    },
    {
      q: "Will I get placement support?",
      a: "Yes! Our dedicated placement team helps with resume reviews, mock interviews, and connecting you with hiring partners.",
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 7-day no-questions-asked money-back guarantee if you are not satisfied.",
    },
  ];

  /* skill bars */
  const skillBars = [
    { label: "Industry Relevance", pct: 97 },
    { label: "Student Satisfaction", pct: 96 },
    { label: "Placement Rate", pct: 88 },
    { label: "Completion Rate", pct: 92 },
  ];

  return (
    <div
      className="course-details-page"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        paddingTop: "var(--nav-h, 90px)",
        background: "#fff",
        color: "#0f172a",
      }}
    >
      {/* ── Ambient blobs ── */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15%",
              right: "-10%",
              width: "55vw",
              height: "55vw",
              background:
                "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "-10%",
              width: "50vw",
              height: "50vw",
              background:
                "radial-gradient(circle,rgba(236,72,153,0.05) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "30%",
              width: "30vw",
              height: "30vw",
              background:
                "radial-gradient(circle,rgba(14,165,233,0.02) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[500px]">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div className="cdp-ani-1">
                  <Pill color="#6366f1" bg="rgba(99,102,241,0.08)">
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        background: "#6366f1",
                        borderRadius: "50%",
                        animation: "cdp-pulse 2s infinite",
                      }}
                    />
                    {course.placement_assist} Placement Assisted
                  </Pill>
                </div>

                <h1
                  className="cdp-ani-2"
                  style={{
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.1,
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {course.title}
                </h1>

                <p className="cdp-ani-3 text-slate-500 text-xl leading-relaxed max-w-lg font-medium">
                  {course.description?.split(".")[0]}. {course.subtitle}
                </p>

                <div className="cdp-ani-3 flex items-center gap-4">
                  <div className="flex text-amber-400 text-lg">★★★★★</div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                    {course.rating} (12.4k Reviews)
                  </span>
                </div>

                <div className="cdp-ani-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col gap-1">
                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      Duration
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col gap-1">
                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      Students
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      {course.students_enrolled}
                    </div>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 shadow-sm flex flex-col gap-1">
                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                      Projects
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      {course.projects_count}+
                    </div>
                  </div>
                </div>

                <div className="cdp-ani-4 flex flex-col sm:flex-row gap-5">
                  <button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                        "_blank",
                      )
                    }
                    className="px-10 py-5.5 rounded-xl bg-slate-950 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-950/20 active:scale-95 text-center"
                  >
                    Enroll Now - {course.price}
                  </button>
                  <button className="px-10 py-5.5 rounded-xl bg-white border border-slate-100 text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all text-center">
                    Download Syllabus
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="relative h-[500px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-premium border border-slate-100 h-full overflow-hidden">
                  <div className="w-full h-full bg-slate-50 rounded-lg overflow-hidden group relative">
                    <img
                      src={course.image_url || `/images/courses/${id}.png`}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 px-5 py-3 rounded-lg bg-white/90 backdrop-blur-md border border-white/20 shadow-xl">
                      <div
                        className="text-sm font-black text-slate-900 uppercase tracking-widest"
                        style={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        🔥 Trending Choice
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHO IS THIS FOR + CAREER OUTCOMES
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-[0.15em] w-fit mb-8 md:mb-12">
                👥 Who is this for?
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Is this the right course{" "}
                <span className="text-indigo-600">for you?</span>
              </h2>

              <div className="flex flex-col gap-4">
                {course.prerequisites?.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                      <IcCheck />
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Career outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-sm md:text-base font-black uppercase tracking-[0.15em] w-fit mb-8 md:mb-12">
                🎯 Career Outcomes
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Where this course{" "}
                <span className="text-pink-600">takes you</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {course.career_outcomes?.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-slate-900 text-white font-bold text-sm text-center shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Success Metric Card */}
              <div className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group mb-10">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <IcTrophy />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <IcTrophy />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
                      Alumni Success Metric
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-bold leading-snug">
                    Average salary hike of{" "}
                    <span className="text-amber-300 text-2xl font-black">
                      60%
                    </span>{" "}
                    observed for alumni of this program.
                  </p>
                </div>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-6">
                {skillBars.map((s, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">
                        {s.label}
                      </span>
                      <span className="text-sm font-black text-indigo-600">
                        {s.pct}%
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CURRICULUM / ROADMAP
      ════════════════════════════════════ */}
      {/* ════════════════════════════════════
          CURRICULUM / ROADMAP
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white pt-16 md:pt-24 pb-4 md:pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm md:text-base font-black uppercase tracking-[0.15em] mb-6">
              📚 Curriculum
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Learning{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                Roadmap
              </span>
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              A structured journey from fundamentals to enterprise-level
              architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Module Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-3 sticky top-32">
              {course.syllabus.map((mod, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModule(i)}
                  className={`flex flex-col gap-1 p-5 rounded-xl text-left transition-all duration-300 border ${
                    activeModule === i
                      ? "bg-slate-950 border-slate-950 shadow-2xl shadow-slate-200"
                      : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 shadow-sm"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      activeModule === i ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    Module {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-base font-bold leading-tight ${
                      activeModule === i ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {mod.title}
                  </span>
                  {activeModule === i && (
                    <motion.div
                      layoutId="active-indicator"
                      className="mt-3 flex items-center gap-2 text-indigo-400 text-[11px] font-bold"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      Now Viewing
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Active Module Content */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 md:p-12 rounded-xl bg-slate-50 border border-slate-100 shadow-inner relative overflow-hidden"
                >
                  {/* Decorative background accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                      <div>
                        <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.2em] block mb-2">
                          Module {String(activeModule + 1).padStart(2, "0")}
                        </span>
                        <h3
                          className="text-2xl md:text-3xl font-black text-slate-950 leading-tight"
                          style={{ fontFamily: "'Lexend', sans-serif" }}
                        >
                          {course.syllabus[activeModule]?.title}
                        </h3>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest shadow-sm">
                        Comprehensive Guide
                      </div>
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-10">
                      {course.syllabus[activeModule]?.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                        Key Lessons Covered
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.syllabus[activeModule]?.lessons?.map(
                          (lesson, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-indigo-100/50 transition-all group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-black text-xs group-hover:bg-indigo-600 transition-colors">
                                {i + 1}
                              </div>
                              <span className="text-slate-800 font-bold text-sm">
                                {lesson}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TOOLS
      ════════════════════════════════════ */}
      <section className="relative z-10 bg-white pt-4 md:pt-6 pb-16 md:pb-24">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 48,
              textAlign: "center",
            }}
            className="mb-8 md:mb-12"
          >
            <Pill color="#22d3ee" bg="rgba(34,211,238,.1)">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>{" "}
              Tools & Tech
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "16px 0 10px",
              }}
            >
              Master Industry-Standard{" "}
              <span style={{ color: "#22d3ee" }}>Tools</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 15,
                maxWidth: 500,
                margin: 0,
              }}
            >
              Everything in your toolkit used by top companies worldwide.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {course.tools_learned?.map((tool, i) => {
              const toolLogos = {
                "intellij idea":
                  "https://cdn.simpleicons.org/intellijidea/000000",
                maven: "https://cdn.simpleicons.org/apachemaven/C71A36",
                junit: "https://cdn.simpleicons.org/junit5/25A239",
                "spring boot": "https://cdn.simpleicons.org/springboot/6DB33F",
                mysql: "https://cdn.simpleicons.org/mysql/4479A1",
                git: "https://cdn.simpleicons.org/git/F05032",
                "vs code":
                  "https://cdn.simpleicons.org/visualstudiocode/007ACC",
                "node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
                react: "https://cdn.simpleicons.org/react/61DAFB",
                mongodb: "https://cdn.simpleicons.org/mongodb/47A248",
                express: "https://cdn.simpleicons.org/express/000000",
                docker: "https://cdn.simpleicons.org/docker/2496ED",
                aws: "https://cdn.simpleicons.org/amazonwebservices/232F3E",
                python: "https://cdn.simpleicons.org/python/3776AB",
                pandas: "https://cdn.simpleicons.org/pandas/150458",
                numpy: "https://cdn.simpleicons.org/numpy/013243",
                tensorflow: "https://cdn.simpleicons.org/tensorflow/FF6F00",
                pytorch: "https://cdn.simpleicons.org/pytorch/EE4C2C",
                keras: "https://cdn.simpleicons.org/keras/D00000",
                opencv: "https://cdn.simpleicons.org/opencv/5C3EE8",
                "hugging face":
                  "https://cdn.simpleicons.org/huggingface/FFD21E",
                cuda: "https://cdn.simpleicons.org/nvidia/76B900",
                sql: "https://cdn.simpleicons.org/mysql/4479A1",
                expressjs: "https://cdn.simpleicons.org/express/000000",
                "microsoft excel":
                  "https://cdn.simpleicons.org/microsoftexcel/217346",
                excel: "https://cdn.simpleicons.org/microsoftexcel/217346",
                "sap fico": "https://cdn.simpleicons.org/sap/08639C",
                "power bi": "https://cdn.simpleicons.org/powerbi/F2C811",
                tableau: "https://cdn.simpleicons.org/tableau/E97627",
                quickbooks: "https://cdn.simpleicons.org/quickbooks/2CA01C",
                jupyter: "https://cdn.simpleicons.org/jupyter/F37626",
                "google analytics":
                  "https://cdn.simpleicons.org/googleanalytics/E37400",
                wordpress: "https://cdn.simpleicons.org/wordpress/21759B",
                canva: "https://cdn.simpleicons.org/canva/00C4CC",
                semrush: "https://cdn.simpleicons.org/semrush/FF642D",
                "meta ads manager": "https://cdn.simpleicons.org/meta/0668E1",
                mailchimp: "https://cdn.simpleicons.org/mailchimp/FFE01B",
                "linkedin recruiter":
                  "https://cdn.simpleicons.org/linkedin/0A66C2",
                "microsoft teams":
                  "https://cdn.simpleicons.org/microsoftteams/6264A7",
                "kali linux": "https://cdn.simpleicons.org/kalilinux/557C94",
                wireshark: "https://cdn.simpleicons.org/wireshark/167EC6",
                azure: "https://cdn.simpleicons.org/microsoftazure/0078D4",
                terraform: "https://cdn.simpleicons.org/terraform/7B42BC",
                kubernetes: "https://cdn.simpleicons.org/kubernetes/326CE5",
                arduino: "https://cdn.simpleicons.org/arduino/00979D",
                "raspberry pi":
                  "https://cdn.simpleicons.org/raspberrypi/C51A4A",
                matlab: "https://cdn.simpleicons.org/mathworks/0076A8",
                "autocad 2024": "https://cdn.simpleicons.org/autodesk/0696D7",
              };
              const logoUrl =
                toolLogos[tool.toLowerCase()] ||
                "https://cdn-icons-png.flaticon.com/512/2092/2092631.png";

              return (
                <div
                  key={i}
                  className="cdp-tool-card"
                  style={{
                    padding: "10px 20px",
                    borderRadius: 12,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 120,
                    cursor: "default",
                    transition: "all .3s",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#1e293b",
                      letterSpacing: "0.02em",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  >
                    {tool}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROJECTS
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/30">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: 24,
            }}
            className="mb-8 md:mb-12"
          >
            <div>
              <Pill color="#f472b6" bg="rgba(244,114,182,.1)">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>{" "}
                Portfolio
              </Pill>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "16px 0 0",
                }}
              >
                Capstone{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#f472b6,#818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Projects
                </span>
              </h2>
            </div>
            <p style={{ color: "#475569", fontWeight: 600, fontSize: 14 }}>
              Built by you · Verified by us
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {course.projects.map((proj, i) => (
              <div
                key={i}
                className="cdp-proj-card"
                style={{
                  padding: "36px 32px",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(255,255,255,.06)",
                  transition: "all .35s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg,#6366f1,#ec4899)",
                    opacity: 0.6,
                  }}
                />
                <div
                  className="cdp-proj-icon"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    background: "linear-gradient(135deg,#6366f1,#ec4899)",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    boxShadow: "0 10px 30px rgba(99,102,241,.3)",
                    transition: "transform .3s",
                  }}
                >
                  {(() => {
                    const techLogos = {
                      java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                      "spring boot":
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
                      mysql:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                      react:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                      "node.js":
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                      mongodb:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                      excel:
                        "https://cdn-icons-png.flaticon.com/512/732/732220.png",
                      "financial modeling":
                        "https://cdn-icons-png.flaticon.com/512/2620/2620186.png",
                      python:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    };
                    const firstTech = proj.tech[0]?.toLowerCase();
                    const logo =
                      techLogos[firstTech] ||
                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                    return (
                      <img
                        src={logo}
                        alt={firstTech}
                        style={{
                          width: "60%",
                          height: "60%",
                          objectFit: "contain",
                        }}
                      />
                    );
                  })()}
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#0f172a",
                    margin: "0 0 12px",
                    transition: "color .3s",
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: "0 0 24px",
                  }}
                >
                  {proj.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tech.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 99,
                        background: "rgba(0,0,0,0.05)",
                        border: "1px solid rgba(255,255,255,.1)",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#94a3b8",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          LEARNING ROADMAP
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill color="#6366f1" bg="rgba(99,102,241,0.1)">
              🚀 Journey
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "20px 0 16px",
              }}
            >
              Your Path to <span style={{ color: "#6366f1" }}>Expertise</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 16 }}>
              A structured 4-phase roadmap to transform you from zero to
              job-ready.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            {/* The Line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? "20px" : "50%",
                transform: isMobile ? "none" : "translateX(-50%)",
                width: 2,
                height: "100%",
                background:
                  "linear-gradient(to bottom, transparent, #6366f1, #818cf8, #6366f1, transparent)",
                opacity: 0.3,
                borderRadius: 2,
              }}
            />

            {[
              {
                phase: "01",
                title: "Foundation & Setup",
                desc: "Setting up professional grade tools and mastering core logic with hands-on labs.",
                label: "The Beginning",
                align: "left",
              },
              {
                phase: "02",
                title: "Advanced Logic",
                desc: "Deep dive into architecture, optimization, and complex data structures.",
                label: "Level Up",
                align: "right",
              },
              {
                phase: "03",
                title: "Industrial Grade Projects",
                desc: "Developing 4+ end-to-end applications using enterprise best practices.",
                label: "Real World",
                align: "left",
              },
              {
                phase: "04",
                title: "Job Readiness",
                desc: "Portfolio refinement, mock interviews, and direct placement assistance.",
                label: "Final Mile",
                align: "right",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  justifyContent: isMobile
                    ? "flex-start"
                    : step.align === "left"
                      ? "flex-start"
                      : "flex-end",
                  width: "100%",
                  marginBottom: isMobile ? 40 : 80,
                  position: "relative",
                  paddingLeft: isMobile ? 60 : 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: isMobile ? "20px" : "50%",
                    top: 24,
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "4px solid #fff",
                    zIndex: 2,
                    boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                  }}
                />

                <div
                  style={{
                    width: isMobile ? "100%" : "45%",
                    padding: "32px",
                    borderRadius: 12,
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.02)",
                    textAlign: isMobile ? "left" : step.align,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle Background Number */}
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      [step.align === "left" ? "right" : "left"]: -10,
                      fontSize: 100,
                      fontWeight: 900,
                      color: "rgba(0,0,0,0.02)",
                      fontFamily: "'Syne', sans-serif",
                      pointerEvents: "none",
                    }}
                  >
                    {step.phase}
                  </div>

                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#6366f1",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      margin: "0 0 12px",
                    }}
                  >
                    {step.label}
                  </p>
                  <h4
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: "#0f172a",
                      fontWeight: 800,
                      fontSize: 22,
                      margin: "0 0 12px",
                    }}
                  >
                    Phase {step.phase}: {step.title}
                  </h4>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: 15,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/30">
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill color="#6366f1" bg="rgba(99,102,241,0.1)">
              ⚖️ Comparison
            </Pill>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "20px 0 16px",
              }}
            >
              Why <span style={{ color: "#6366f1" }}>PreppRight</span> is
              Different
            </h2>
          </div>

          <div
            style={{
              overflowX: "auto",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(0,0,0,0.03)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.05)" }}>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#0f172a",
                      fontSize: 18,
                    }}
                  >
                    Features
                  </th>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#6366f1",
                      fontSize: 18,
                      background: "rgba(99,102,241,.1)",
                      textAlign: "center",
                      fontWeight: 800,
                    }}
                  >
                    PreppRight
                  </th>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#64748b",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    Other Platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    f: "Industry Expert Mentors",
                    p: "✅ Live Sessions",
                    o: "❌ Recorded Only",
                  },
                  {
                    f: "24/7 Discord Support",
                    p: "✅ Instant Response",
                    o: "❌ 24-48h Wait",
                  },
                  {
                    f: "Placement Assistance",
                    p: "✅ 100% Dedicated",
                    o: "❌ Basic Portal",
                  },
                  {
                    f: "Project Reviews",
                    p: "✅ Detailed Feedback",
                    o: "❌ No Feedback",
                  },
                  {
                    f: "Lifetime Access",
                    p: "✅ Unlimited",
                    o: "❌ Limited (1 Yr)",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                  >
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      {row.f}
                    </td>
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#0f172a",
                        fontWeight: 700,
                        textAlign: "center",
                        background: "rgba(99,102,241,.04)",
                      }}
                    >
                      {row.p}
                    </td>
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#475569",
                        textAlign: "center",
                      }}
                    >
                      {row.o}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMMUNITY & LABS
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1.2fr 1fr",
              gap: isTablet ? 40 : 60,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  padding: isMobile ? 20 : 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #5865F2, #404EED)",
                  boxShadow: "0 30px 60px rgba(88,101,242,.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 800,
                    margin: "0 0 20px",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Join the Elite Discord Community
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.8)",
                    fontSize: 16,
                    lineHeight: 1.7,
                    marginBottom: 30,
                  }}
                >
                  Don't learn alone. Join our private Discord server to connect
                  with 5000+ students, participate in hackathons, and get your
                  doubts cleared instantly.
                </p>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      24/7
                    </h4>
                    <p
                      style={{
                        color: "rgba(255,255,255,.6)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Live Support
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      5k+
                    </h4>
                    <p
                      style={{
                        color: "rgba(255,255,255,.6)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Active Students
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <Pill color="#6366f1" bg="rgba(99,102,241,.1)">
                🛠️ Hands-on Labs
              </Pill>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "16px 0 20px",
                }}
              >
                Practice in <span style={{ color: "#6366f1" }}>Cloud Labs</span>
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 16,
                  lineHeight: 1.7,
                  marginBottom: 30,
                }}
              >
                Master complex concepts with our pre-configured cloud
                environments. No heavy software installation needed—just code
                directly in your browser.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 15,
                }}
              >
                {[
                  "In-browser IDE",
                  "Real-world datasets",
                  "Automated grading",
                  "Live project collab",
                ].map((t, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#64748b",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0f172a",
                      }}
                    >
                      ✓
                    </div>{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STUDENT REVIEWS
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/30">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill color="#ec4899" bg="rgba(236,72,153,.1)">
              💬 Testimonials
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "20px 0 16px",
              }}
            >
              What Our <span style={{ color: "#ec4899" }}>Students Say</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 30,
            }}
          >
            {[
              {
                name: "Rahul Sharma",
                role: "Software Engineer @ Google",
                text: "The curriculum is top-notch. The focus on real-world projects helped me crack my interviews easily. Highly recommended!",
              },
              {
                name: "Sneha Patil",
                role: "UI/UX Designer @ Meta",
                text: "PreppRight's mentors are industry veterans. Their feedback on my portfolio was game-changing for my career.",
              },
              {
                name: "Amit Verma",
                role: "Data Scientist @ Amazon",
                text: "The hands-on labs and Discord support are amazing. I never felt stuck during the entire 6-month journey.",
              },
            ].map((rev, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  padding: 30,
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 15,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: "rgba(99, 102, 241, 0.1)",
                      border: "2px solid rgba(99, 102, 241, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6366f1",
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5
                      style={{ color: "#0f172a", fontWeight: 800, margin: 0 }}
                    >
                      {rev.name}
                    </h5>
                    <p
                      style={{
                        color: "#ec4899",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      {rev.role}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 15,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  "{rev.text}"
                </p>
                <div style={{ display: "flex", gap: 2, marginTop: 15 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <IcStar key={s} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════
          PRICING
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              borderRadius: 12,
              background: "#0f172a",
              border: "1px solid #1e293b",
              padding: isMobile ? "32px 24px" : "64px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 60px 120px rgba(0,0,0,.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                background:
                  "radial-gradient(circle,rgba(99,102,241,.05),transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -60,
                left: -60,
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle,rgba(236,72,153,.05),transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
                gap: isTablet ? 36 : 64,
                alignItems: "center",
                position: "relative",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                    fontWeight: 800,
                    color: "#fff",
                    margin: "0 0 32px",
                  }}
                >
                  Start your <span style={{ color: "#6366f1" }}>Mastery</span>{" "}
                  Journey
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  {[
                    "100+ Hours of HD Video Content",
                    "4 Comprehensive Capstone Projects",
                    "24/7 Priority Discord Support",
                    "Lifetime Access & Free Updates",
                    "Certificate of Excellence",
                    "Dedicated Placement Support",
                  ].map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#94a3b8",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 4,
                          background: "rgba(99,102,241,.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          flexShrink: 0,
                        }}
                      >
                        <IcCheck />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: isMobile ? "32px 24px" : "44px 40px",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#64748b",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                  }}
                >
                  Complete Program Fee
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        color: "#94a3b8",
                        textDecoration: "line-through",
                        fontWeight: 600,
                      }}
                    >
                      {(() => {
                        const p = parseInt(
                          course.price?.replace(/[₹,]/g, "") || "0",
                        );
                        const original = Math.round(p / 0.7);
                        return `₹${original.toLocaleString("en-IN")}`;
                      })()}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 4,
                        background: "rgba(245, 158, 11, 0.1)",
                        color: "#f59e0b",
                        fontSize: 12,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      30% OFF
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      gap: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#6366f1",
                        marginTop: isMobile ? 6 : 10,
                      }}
                    >
                      ₹
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
                        fontWeight: 800,
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1,
                        maxWidth: "100%",
                      }}
                    >
                      {course.price
                        ?.replace(/[₹,]/g, "")
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h3>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6366f1",
                    fontWeight: 700,
                    fontStyle: "italic",
                    margin: "0 0 32px",
                  }}
                >
                  ✅ 100% Money Back Guarantee
                </p>
                <button
                  className="cdp-enroll-btn"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                      "_blank",
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "20px",
                    background: "#6366f1",
                    color: "#fff",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    borderRadius: 16,
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s",
                    boxShadow: "0 12px 40px rgba(99,102,241,.4)",
                    letterSpacing: ".04em",
                  }}
                >
                  ENROLL NOW
                </button>
                <p style={{ marginTop: 16, fontSize: 12, color: "#64748b" }}>
                  EMI available from ₹999/month · No-cost options
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MENTORS
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill color="#6366f1" bg="rgba(99,102,241,0.1)">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>{" "}
              Expert Mentors
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "20px 0 16px",
              }}
            >
              Meet Your <span style={{ color: "#6366f1" }}>Industry</span>{" "}
              Mentors
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: 18,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Learn from the experts who have been there and done that. Our
              mentors bring real-world experience from top global companies.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            {course.instructors?.map((mentor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="cdp-inst-card"
                style={{
                  width: "100%",
                  maxWidth: 450,
                  padding: "40px",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(255,255,255,.06)",
                  position: "relative",
                  transition: "all .3s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: 12,
                      background: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 40,
                      color: "#fff",
                      fontWeight: 800,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {mentor.image_url ? (
                      <img 
                        src={mentor.image_url} 
                        alt={mentor.name} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    ) : (
                      mentor.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#0f172a",
                        margin: "0 0 4px",
                      }}
                    >
                      {mentor.name}
                    </h3>
                    <p
                      style={{
                        color: "#6366f1",
                        fontSize: 16,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        margin: 0,
                      }}
                    >
                      {mentor.role}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: "0 0 24px",
                  }}
                >
                  {mentor.bio}
                </p>

                {mentor.linkedin && (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      borderRadius: 8,
                      background: "rgba(10, 102, 194, 0.05)",
                      color: "#0a66c2",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      border: "1px solid rgba(10, 102, 194, 0.1)",
                      transition: "all .3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background =
                        "rgba(10, 102, 194, 0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "rgba(10, 102, 194, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <IcLinkedin />
                    View LinkedIn Profile
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CERTIFICATION
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-slate-50/30">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill color="#818cf8" bg="rgba(129,140,248,.1)">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>{" "}
              Certification
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "20px 0 16px",
              }}
            >
              Get <span style={{ color: "#818cf8" }}>Industry Recognized</span>{" "}
              Certification
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: 18,
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Earn a professional certificate that validates your skills and
              boosts your career prospects globally.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              gap: isTablet ? 40 : 80,
              alignItems: "center",
              background: "rgba(0,0,0,0.03)",
              padding: isMobile ? "30px" : "60px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background:
                    "radial-gradient(circle, rgba(99,102,241,.15), transparent 70%)",
                  borderRadius: 20,
                  zIndex: -1,
                }}
              />
              <img
                src="/images/certificates/certificate2.png"
                alt="PreppRight Course Certificate"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 30px 60px rgba(0,0,0,.5)",
                  border: "1px solid rgba(255,255,255,.1)",
                  transform: "rotate(-2deg)",
                }}
              />
            </div>
            <div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                {[
                  {
                    title: "Verifiable Credential",
                    desc: "Shareable on LinkedIn and verifiable by employers worldwide.",
                  },
                  {
                    title: "Skill Validation",
                    desc: "Proves your expertise in modern industry-standard tools and technologies.",
                  },
                  {
                    title: "Lifetime Validity",
                    desc: "Your accomplishment never expires and remains a permanent part of your portfolio.",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 20 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        background: "rgba(129,140,248,.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#818cf8",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#0f172a",
                          fontSize: 18,
                          fontWeight: 700,
                          margin: "0 0 8px",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: 14,
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ
      ════════════════════════════════════ */}
      <section className="relative z-10 border-t border-slate-100 bg-white">
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center" }} className="mb-8 md:mb-12">
            <Pill>❓ FAQ</Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.4rem)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "18px 0 10px",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#818cf8" }}>Questions</span>
            </h2>
          </div>
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          STICKY BAR
      ════════════════════════════════════ */}
      {showStickyBar && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            padding: isMobile ? "0" : "12px 24px",
            animation: "cdp-fadeIn .3s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              background: "rgba(10,15,30,.98)",
              backdropFilter: "blur(24px)",
              border: isMobile ? "none" : "1px solid rgba(255,255,255,.1)",
              borderTop: "1px solid rgba(255,255,255,.1)",
              borderRadius: isMobile ? 0 : 12,
              padding: isMobile ? "16px 18px" : "18px 28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 -10px 60px rgba(0,0,0,.5)",
              gap: 12,
              width: "100%",
            }}
          >
            {/* Title Section */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: isMobile ? 8 : 10,
                  color: "#818cf8",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  margin: "0 0 2px",
                }}
              >
                📌 Enrolling Now
              </p>
              <h4
                style={{
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: isMobile ? 14 : 17,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {course.title}
              </h4>
            </div>

            {/* Price & Action Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 12 : 32,
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    paddingRight: 24,
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      color: "#94a3b8",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      margin: "0 0 4px",
                      letterSpacing: 1,
                    }}
                  >
                    Offer Ends
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 3,
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#ec4899",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <span>{formatNum(timeLeft.hours)}</span>:
                    <span>{formatNum(timeLeft.minutes)}</span>:
                    <span>{formatNum(timeLeft.seconds)}</span>
                  </div>
                </div>
              )}

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-end" : "center",
                    gap: isMobile ? 0 : 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? 18 : 24,
                      fontWeight: 900,
                      color: "#818cf8",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  >
                    {course.price}
                  </span>
                  <span
                    style={{
                      fontSize: isMobile ? 11 : 13,
                      color: "#64748b",
                      textDecoration: "line-through",
                      fontWeight: 600,
                    }}
                  >
                    {(() => {
                      const p = parseInt(
                        course.price?.replace("₹", "").replace(/,/g, "") || "0",
                      );
                      const original = Math.round(p / 0.7);
                      return `₹${original.toLocaleString("en-IN")}`;
                    })()}
                  </span>
                </div>
                {!isMobile && (
                  <span
                    style={{
                      fontSize: 9,
                      color: "#f59e0b",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                    }}
                  >
                    Special 30% Discount
                  </span>
                )}
              </div>

              <button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                    "_blank",
                  )
                }
                style={{
                  padding: isMobile ? "10px 16px" : "14px 32px",
                  background: "linear-gradient(135deg,#6366f1,#ec4899)",
                  color: "#fff",
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 12 : 15,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  transition: "all .3s",
                  boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                  letterSpacing: ".04em",
                  whiteSpace: "nowrap",
                }}
              >
                {isMobile ? "ENROLL" : "ENROLL NOW"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
