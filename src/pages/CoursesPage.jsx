import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const COURSE_HERO_SLIDES = [
  {
    tag: "Get Certified. Get Ahead",
    title: (
      <>
        Master the Skills <br />
        <span className="text-indigo-600">Top Companies Hire</span>
      </>
    ),
    desc: "Experience world-class learning with industry experts. Join 50,000+ students already transforming their careers with PreppRight.",
    img: "/images/courses/abc/fullstack .png",
    accent: "bg-indigo-600",
  },
  {
    tag: "IT & Software",
    title: (
      <>
        Build Powerful <br />
        <span className="text-violet-600">Software Solutions</span>
      </>
    ),
    desc: "From Full Stack to AI/ML, master the tech stack of tomorrow. 1-on-1 mentorship and 24/7 learning support.",
    img: "/images/courses/abc/java.png",
    accent: "bg-violet-600",
  },
  {
    tag: "Mechanical Engineering",
    title: (
      <>
        Drive the <br />
        <span className="text-emerald-600">EV Revolution</span>
      </>
    ),
    desc: "Master Hybrid Electric Vehicle technology and AutoCAD. Engineer the sustainable future of automotive industry.",
    img: "/images/courses/abc/hybried.png",
    accent: "bg-emerald-600",
  },
];

const CoursesPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % COURSE_HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    "All Courses",
    "Business and Non-IT",
    "IT and Software",
    "Electronic and Communication",
    "Mechanical",
    "TECH LAB",
    "Job Orientation",
  ];

  const allCourses = [
    {
      id: "java-programming",
      title: "Java Programming Mastery",
      category: "IT and Software",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.9",
      students: "12,450+",
      skills: ["Java", "Spring Boot", "Hibernate", "Microservices"],
      batch: "Starts 15th Oct",
      desc: "Master Java from scratch to advanced frameworks with industry projects.",
      image_url: "/images/courses/abc/java.png",
    },
    {
      id: "full-stack-web-development",
      title: "Full Stack Web Development",
      category: "IT and Software",
      price: "₹5,000",
      duration: "6 Months",
      rating: "4.8",
      students: "22,100+",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      batch: "Starts 20th Oct",
      desc: "Complete MERN stack mastery with end-to-end application development.",
      image_url: "/images/courses/abc/fullstack .png",
    },
    {
      id: "financial-management",
      title: "Financial Management & Analysis",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.9",
      students: "8,920+",
      skills: ["Tally", "Excel", "Taxation", "Audit"],
      batch: "Self-Paced",
      desc: "Learn corporate finance, analysis, and management from experts.",
      image_url: "/images/courses/abc/Financial.png",
    },
    {
      id: "data-science-roadmap",
      title: "Data Science Roadmap",
      category: "IT and Software",
      price: "₹4,000",
      duration: "4 Months",
      rating: "4.8",
      students: "15,200+",
      skills: ["Python", "SQL", "Tableau", "Statistics"],
      batch: "Starts 12th Oct",
      desc: "Master data analytics, visualization, and predictive modeling.",
      image_url: "/images/courses/abc/datascience.png",
    },
    {
      id: "python-mastery",
      title: "Python Mastery Bootcamp",
      category: "IT and Software",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      students: "18,400+",
      skills: ["Python", "Django", "Automation", "Numpy"],
      batch: "Starts 18th Oct",
      desc: "Go from basic syntax to advanced automation and scripting.",
      image_url: "/images/courses/abc/pythonmystry.png",
    },
    {
      id: "ai-ml-python",
      title: "AI & Machine Learning",
      category: "IT and Software",
      price: "₹6,000",
      duration: "4 Months",
      rating: "4.8",
      students: "9,600+",
      skills: ["TensorFlow", "PyTorch", "NLP", "Scikit-Learn"],
      batch: "Starts 25th Oct",
      desc: "Deep dive into Neural Networks, Deep Learning, and AI integration.",
      image_url: "/images/courses/ai_ml.png",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Masterclass",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      students: "11,200+",
      skills: ["SEO", "Google Ads", "SMM", "Content"],
      batch: "Self-Paced",
      desc: "Master SEO, SEM, and social media growth strategies.",
      image_url: "/images/courses/abc/digitalmarkerting.png",
    },
    {
      id: "hr-management",
      title: "Human Resource Management",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.7",
      students: "6,800+",
      skills: ["Payroll", "Labor Laws", "Recruitment"],
      batch: "Starts 14th Oct",
      desc: "Core HR functions, talent acquisition, and organizational behavior.",
      image_url: "/images/courses/abc/HR.png",
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      category: "IT and Software",
      price: "₹4,000",
      duration: "3 Months",
      rating: "4.8",
      students: "5,400+",
      skills: ["Ethical Hacking", "Linux", "OWASP", "SIEM"],
      batch: "Starts 30th Oct",
      desc: "Network security, ethical hacking, and threat mitigation.",
      image_url: "/images/courses/abc/cybersecurity.png",
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing Training",
      category: "IT and Software",
      price: "₹5,000",
      duration: "2 Months",
      rating: "4.8",
      students: "7,900+",
      skills: ["AWS", "Azure", "Docker", "Kubernetes"],
      batch: "Starts 10th Oct",
      desc: "Master AWS, Azure, and Cloud architecture deployment.",
      image_url: "/images/courses/abc/cloudcomputing.png",
    },
    {
      id: "iot",
      title: "Internet of Things (IoT)",
      category: "Electronic and Communication",
      price: "₹3,000",
      duration: "2 Months",
      rating: "4.5",
      students: "4,200+",
      skills: ["Arduino", "Raspberry Pi", "Sensors", "MQTT"],
      batch: "Self-Paced",
      desc: "Build smart connected devices with hands-on IoT projects.",
      image_url: "/images/courses/electronics_iot.png",
    },
    {
      id: "embedded-systems",
      title: "Embedded Systems & Robotics",
      category: "Electronic and Communication",
      price: "₹4,000",
      duration: "2 Months",
      rating: "4.5",
      students: "3,800+",
      skills: ["C Programming", "Microcontrollers", "PCB Design"],
      batch: "Starts 22nd Oct",
      desc: "Master microcontroller programming and robotic automation.",
      image_url: "/images/courses/embedded_systems.png",
    },
    {
      id: "drone-engineering",
      title: "Drone Engineering & Aviation",
      category: "Electronic and Communication",
      price: "₹6,000",
      duration: "3 Months",
      rating: "4.8",
      students: "2,900+",
      skills: ["Flight Dynamics", "Avionics", "CAD Design"],
      batch: "Starts 28th Oct",
      desc: "Design, build, and pilot industrial-grade drone systems.",
      image_url: "/images/courses/electronics_iot.png",
    },
    {
      id: "hybrid-ev",
      title: "Hybrid Electric Vehicles",
      category: "Mechanical",
      price: "₹6,000",
      duration: "4 Months",
      rating: "4.9",
      students: "6,100+",
      skills: ["Battery Tech", "BMS", "Motor Control", "CAN Bus"],
      batch: "Starts 15th Oct",
      desc: "Future of automotive engineering: EV tech and battery management.",
      image_url: "/images/courses/abc/hybried.png",
    },
    {
      id: "autocad",
      title: "AutoCAD Training Program",
      category: "Mechanical",
      price: "₹4,000",
      duration: "2 Months",
      rating: "4.7",
      students: "10,500+",
      skills: ["2D Drafting", "3D Modeling", "ISO Standards"],
      batch: "Self-Paced",
      desc: "Master industrial 2D/3D design and drafting standards.",
      image_url: "/images/courses/abc/AutoCAD.png",
    },
    {
      id: "metaverse",
      title: "Metaverse / AR / VR Development",
      category: "IT and Software",
      price: "₹7,000",
      duration: "4 Months",
      rating: "4.9",
      students: "1,800+",
      skills: ["Unity 3D", "C#", "Blender", "Oculus SDK"],
      batch: "Starts 5th Nov",
      desc: "Building immersive digital worlds and augmented experiences.",
      image_url: "/images/courses/web_development.png",
    },
  ];

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All Courses" ||
      course.category === selectedCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const benefits = [
    {
      title: "World Class Pedagogy",
      img: "/images/categories/development.png",
      points: [
        "Learn from the World's Best Faculty & Industry Experts",
        "Learn with fun Hands-on Exercises & Assignments",
        "Participate in Hackathons & Group Activities",
      ],
      stats: [
        { label: "4.8/5 Rating", icon: "⭐" },
        { label: "Gamified Learning", icon: "🎮" },
      ],
    },
    {
      title: "Personalized Guidance with 24×7 Support",
      img: "/images/categories/marketing.png",
      points: [
        "Dedicated Learning Managers",
        "24/7 Learning Support",
        "Network with Peers & Interact with Industry Leaders",
      ],
      stats: [
        { label: "24 x 7 Support", icon: "🕒" },
        { label: "1:1 Mentorship", icon: "🤝" },
      ],
    },
    {
      title: "Career Assistance",
      img: "/images/categories/business.png",
      points: [
        "Resume Building & Mock Interview Prep",
        "Exclusive access to PreppRight Job Portal",
        "400+ Hiring Partners",
      ],
      stats: [
        { label: "85,000 Career Transition", icon: "📈" },
        { label: "400+ Hiring Partners", icon: "🌐" },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Premium Dynamic Hero Section */}
      <section className="hero-section-fix pb-10 relative overflow-hidden bg-white">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 translate-x-1/4 -translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[400px]">
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    {COURSE_HERO_SLIDES[currentSlide].tag}
                  </div>
                  <h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter leading-tight text-slate-950"
                    style={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    {COURSE_HERO_SLIDES[currentSlide].title}
                  </h1>
                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg mb-8 font-medium">
                    {COURSE_HERO_SLIDES[currentSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex gap-2">
                {COURSE_HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-full min-h-[300px] hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-premium border border-slate-100 p-4 bg-white">
                    <img
                      src={COURSE_HERO_SLIDES[currentSlide].img}
                      alt="Course Category"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Courses Grid */}
      <section className="py-12 md:py-16 border-t border-slate-50" id="all-courses">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-10 mb-12">
            <div className="relative w-full max-w-2xl group">
              <input
                type="text"
                placeholder="Search for your course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-8 py-5 md:py-6 rounded-2xl bg-white border border-slate-100 focus:border-indigo-600 outline-none transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:border-indigo-200 font-medium text-lg"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 transition-colors">
                <svg
                  className="w-7 h-7"
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
              </span>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === "TECH LAB") navigate("/tech-lab");
                    else if (cat === "Job Orientation")
                      navigate("/job-orientation");
                    else setSelectedCategory(cat);
                  }}
                  className={`px-5 py-3 md:px-6 md:py-4 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105"
                      : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => (
                <motion.div
                  layout
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)] overflow-hidden flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-white/20 text-slate-900 text-[9px] font-black uppercase tracking-widest">
                      {course.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Users size={12} className="text-indigo-600" />
                        {course.students} Students
                      </div>
                    </div>

                    <h3
                      className="text-lg md:text-xl font-black text-slate-950 mb-1 md:mb-1.5 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors"
                      style={{ fontFamily: "'Lexend', sans-serif" }}
                    >
                      {course.title}
                    </h3>

                    <p className="text-slate-500 text-[13px] font-medium mb-3 line-clamp-2 leading-relaxed">
                      {course.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-slate-50">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <Clock size={12} className="text-indigo-600" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Certified
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <Briefcase size={12} className="text-blue-500" />
                        Placement
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <BookOpen size={12} className="text-violet-500" />
                        Labs
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Fee
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-wider">
                              30% OFF
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl md:text-2xl font-black text-slate-950 tracking-tighter">
                              {course.price}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 line-through decoration-slate-300">
                              {(() => {
                                const currentPrice = parseInt(
                                  course.price.replace(/[^\d]/g, "")
                                );
                                const originalPrice = Math.round(
                                  currentPrice / 0.7
                                );
                                return `₹${originalPrice.toLocaleString()}`;
                              })()}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/course/${course.id}`}
                          className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                        >
                          <ChevronRight size={20} strokeWidth={3} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No courses found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 mb-6 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                About PreppRight
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Empowering the{" "}
                <span className="text-indigo-600">Next Generation</span>
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed mb-10 font-medium">
                At PreppRight, our mission is to provide students with the
                resources, tools, and guidance they need to achieve academic
                excellence and beyond.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="text-3xl font-black text-slate-900 mb-2">
                    50,000+
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Students Impacted
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 mb-2">
                    95%
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Success Rate
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="bg-white p-6 rounded-[48px] shadow-premium border border-slate-100 overflow-hidden">
                <img
                  src="/images/categories/business.png"
                  alt="Impact"
                  className="w-full h-auto rounded-[32px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento-Style Learner Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="inline-block px-3 py-1 mb-4 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
              The PreppRight Advantage
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Why Students <span className="text-indigo-600">Love Us</span>
            </h2>
          </div>

          <div className="space-y-32">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-20 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative group bg-white p-5 rounded-[56px] shadow-premium border border-slate-100 overflow-hidden">
                    <img
                      src={benefit.img}
                      alt={benefit.title}
                      className="w-full h-auto rounded-[40px] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <h3
                    className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight"
                    style={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    {benefit.title}
                  </h3>
                  <ul className="space-y-6 mb-12">
                    {benefit.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-lg text-slate-500 font-medium group"
                      >
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-6">
                    {benefit.stats.map((s, k) => (
                      <div
                        key={k}
                        className="p-8 rounded-3xl bg-[#fafafa] border border-slate-50 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all"
                      >
                        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                          {s.icon}
                        </div>
                        <div
                          className="font-bold text-slate-900 tracking-tight"
                          style={{ fontFamily: "'Lexend', sans-serif" }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;
