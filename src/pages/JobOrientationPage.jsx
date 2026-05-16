import React, { useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Users,
  Video,
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";

const JobOrientationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { title: "Resume Building", icon: <FileText size={24} />, desc: "Expert guidance to build industry-standard ATS-friendly resumes.", color: "indigo" },
    { title: "Mock Interviews", icon: <Video size={24} />, desc: "Real-world interview simulations with industry professionals.", color: "blue" },
    { title: "Personal Branding", icon: <Users size={24} />, desc: "Optimize your LinkedIn and professional online presence.", color: "violet" },
    { title: "Salary Negotiation", icon: <TrendingUp size={24} />, desc: "Learn how to communicate your value and negotiate better offers.", color: "emerald" },
    { title: "Placement Portal", icon: <Briefcase size={24} />, desc: "Exclusive access to 400+ premium hiring partners.", color: "rose" },
    { title: "Career Coaching", icon: <Target size={24} />, desc: "1-on-1 sessions to define your career path and goals.", color: "amber" },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} />
            PreppRight Job Orientation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-10 tracking-tighter leading-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Bridge the Gap to Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-indigo-600">Dream Career</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed mb-16 font-medium"
          >
            Our Job Orientation program is designed to turn your technical skills into successful career placements. Get industry-ready with personalized support.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-xl border border-slate-100 hover:shadow-premium transition-all duration-500 group"
              >
                <div className={`w-14 h-14 rounded-lg mb-8 flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-600 transition-all`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-600/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter" style={{ fontFamily: "'Lexend', sans-serif" }}>
                Our Success is <span className="text-rose-500">Your Placement</span>
              </h2>
              <div className="space-y-6">
                {[
                  "85,000+ Successful Career Transitions",
                  "400+ Active Global Hiring Partners",
                  "Average Salary Hike of 120%",
                  "Dedicated Relationship Managers for Every Student"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg font-medium">
                    <CheckCircle2 className="text-rose-500 shrink-0" size={24} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 backdrop-blur-xl">
              <div className="text-6xl font-black mb-4">98%</div>
              <div className="text-xl font-bold mb-6 text-rose-500">Placement Rate</div>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Our comprehensive curriculum doesn't end with learning; it ends with you landing the job you've always wanted. We support you until you are placed.
              </p>
              <button className="w-full py-5 rounded-xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                Speak to a Career Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobOrientationPage;
