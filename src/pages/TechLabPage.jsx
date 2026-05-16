import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Zap,
  Globe,
  ShieldCheck,
  Cpu,
  Code,
  Cloud,
  Terminal,
  Settings,
  Link as LinkIcon,
  RefreshCw,
  Layout,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const TechLabPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const labTypes = [
    { name: "LiveLAB", icon: <Zap size={32} />, desc: "Real-time interactive environments", color: "indigo" },
    { name: "CloudLAB", icon: <Cloud size={32} />, desc: "Scalable cloud infrastructure", color: "blue" },
    { name: "CyberRange", icon: <ShieldCheck size={32} />, desc: "Security simulations", color: "rose" },
    { name: "CodeLAB", icon: <Code size={32} />, desc: "Programming practice", color: "emerald" },
    { name: "HardwareSIM", icon: <Cpu size={32} />, desc: "Virtual hardware config", color: "violet" },
    { name: "SoftwareSIM", icon: <Layout size={32} />, desc: "Workflow simulations", color: "cyan" },
    { name: "ScenarioSIM", icon: <Terminal size={32} />, desc: "Role-based simulations", color: "orange" },
    { name: "MathsLAB", icon: <Award size={32} />, desc: "Analysis playground", color: "amber" },
    { name: "SmartChat", icon: <RefreshCw size={32} />, desc: "AI-powered assistance", color: "pink" },
  ];

  return (
    <div className="bg-white text-slate-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} />
            PreppRight TECH LABS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-10 tracking-tighter leading-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Ultimate Hands-On <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Training Partner</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed mb-16"
          >
            Bridge the gap between theory and practice with our world-class virtual labs. Master complex IT scenarios in a safe, guided environment.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Practical Mastery", text: "Realistic simulations mirroring actual enterprise IT environments for targeted practice.", color: "indigo" },
              { title: "Zero Installation", text: "Access high-end hardware and software configurations directly from your browser.", color: "emerald" },
              { title: "Cost Efficiency", text: "Eliminate expensive physical infrastructure costs while maintaining high learning standards.", color: "violet" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white p-10 rounded-xl border border-slate-100 text-left hover:shadow-premium transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`w-12 h-12 rounded-lg mb-8 flex items-center justify-center transition-all ${
                  i === 0 ? "bg-indigo-50 text-indigo-600" : i === 1 ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
                }`}>
                  {i === 0 ? <Layout size={24} /> : i === 1 ? <Settings size={24} /> : <Award size={24} />}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>{card.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Ecosystem Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>Specialized Lab Ecosystem</h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Diverse sandbox environments tailored for every technical domain.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {labTypes.map((lab, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-xl border border-slate-100 flex items-center gap-6 group hover:border-indigo-100 hover:shadow-premium transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  {lab.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{lab.name}</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{lab.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Integration Section */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-950 rounded-xl p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                  Seamless Integration <br />
                  <span className="text-indigo-400">With Any Platform</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  {[
                    { icon: <Globe size={20} />, title: "SSO Ready", desc: "Enterprise-grade auth" },
                    { icon: <RefreshCw size={20} />, title: "LMS Sync", desc: "Gradebook automation" },
                    { icon: <LinkIcon size={20} />, title: "Deep Linking", desc: "Direct access to labs" },
                    { icon: <Layout size={20} />, title: "White Label", desc: "Custom branding" },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                        {feat.icon}
                      </div>
                      <div>
                        <div className="text-sm font-black text-white">{feat.title}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-10 py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                  Request Enterprise Demo
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-12 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Users size={24} color="white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Scenario Engine</div>
                    <div className="text-xs text-indigo-400 font-black uppercase tracking-widest">Adaptive Learning</div>
                  </div>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                  PreppRight LABS map to any course, textbook, or training program. Our engine dynamically adjusts scenarios based on student performance.
                </p>
                <div className="p-8 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
                  <div className="text-white font-bold mb-4">98% Completion Rate</div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} className="h-full bg-indigo-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechLabPage;
