import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Placement from "../components/Placement";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            We build careers, not just courses
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            About <span className="text-indigo-600">PreppRight</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            A Government of India registered entity (MSME & Startup India
            recognized) dedicated to bridging the employability gap through
            industry-aligned career infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black text-slate-900 mb-6"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Our Mission
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              At PreppRight, our mission is to serve as a{" "}
              <strong>Strategic Career Infrastructure Partner</strong> for
              students and educational institutions. We act as an extension of
              career services to improve institutional reputation and student
              outcomes.
            </p>
            <div className="space-y-4">
              {[
                "Industry-Aligned Curriculum & Live Projects",
                "Guaranteed Internship Enablement",
                "Multi-stage Placement Readiness Framework",
                "500+ Active Global Hiring Partners",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-slate-700 font-bold"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-600/10 blur-3xl rounded-full" />
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/preppright_mission_india.png"
                alt="Our Mission - PreppRight"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-black text-slate-900 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              The PreppRight Advantage
            </h2>
            <p className="text-slate-500 font-medium">
              Why we are different from traditional EdTech vendors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Outcome-Focused",
                desc: "We measure success by tangible employability and placement offers, not just course completion certificates.",
                icon: "🎯",
              },
              {
                title: "Industry-Validated",
                desc: "Our curriculum is updated in real-time based on direct feedback from our network of 500+ corporate partners.",
                icon: "🏢",
              },
              {
                title: "Student-First Pedagogy",
                desc: "Empathy-driven training that builds student confidence and professional communication alongside technical expertise.",
                icon: "👥",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials & Recognition Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black uppercase tracking-widest">
              Trust & Quality
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-slate-900 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Certified & Recognized by Leading Institutions
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              We are proud to be recognized and supported by major government
              and industry bodies, ensuring the highest standards of education
              and placement readiness.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                name: "Bhashini",
                img: "/images/courses/Creditional_partner/WhatsApp Image 2026-05-09 at 6.32.51 PM.jpeg",
              },
              {
                name: "MeitY Startup Hub",
                img: "/images/courses/Creditional_partner/WhatsApp Image 2026-05-09 at 6.33.05 PM.jpeg",
              },
              {
                name: "DPIIT Startup India",
                img: "/images/courses/Creditional_partner/WhatsApp Image 2026-05-09 at 6.37.21 PM.jpeg",
              },
              {
                name: "MSME",
                img: "/images/courses/Creditional_partner/WhatsApp Image 2026-05-09 at 6.39.58 PM.jpeg",
              },
              {
                name: "ISO 9001:2015",
                img: "/images/courses/Creditional_partner/WhatsApp Image 2026-05-09 at 6.41.12 PM.jpeg",
              },
            ].map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Collaborations Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest">
              Strategic Ecosystem
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-slate-900 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Our Strategic Collaborations
            </h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Working together with industry pioneers and educational councils
              to build a robust career infrastructure for students.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              {
                name: "Lumenxo Software",
                img: "/images/courses/Collaboration/WhatsApp Image 2026-05-09 at 7.01.54 PM.jpeg",
              },
              {
                name: "Xencus",
                img: "/images/courses/Collaboration/WhatsApp Image 2026-05-09 at 7.02.05 PM.jpeg",
              },
              {
                name: "Nexcore Technology",
                img: "/images/courses/Collaboration/WhatsApp Image 2026-05-09 at 7.03.45 PM.jpeg",
              },
              {
                name: "AICTE",
                img: "/images/courses/Collaboration/WhatsApp Image 2026-05-09 at 7.04.41 PM.jpeg",
                scaleClass: "scale-[2.5]",
              },
              {
                name: "Symbiosis SSPU",
                img: "/images/courses/Creditional_partner/d.png",
              },
            ].map((collab, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-50 p-8 rounded-[32px] border border-white shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center text-center group"
              >
                <div className="h-24 w-full flex items-center justify-center mb-4 p-4 bg-white rounded-2xl shadow-inner overflow-hidden">
                  <div className={`w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${collab.scaleClass || ""}`}>
                    <img
                      src={collab.img}
                      alt={collab.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-700">
                  {collab.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hiring Partners Section */}
        <div className="mb-24 relative group">
          <div className="absolute inset-0 bg-indigo-600/5 rounded-[48px] -rotate-1" />
          <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 md:p-16 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 blur-3xl rounded-full -mr-20 -mt-20 opacity-50" />

            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                Placement Network
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-slate-900 mb-6"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Our Elite Hiring Partners
              </h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                We bridge the gap between talent and opportunity. Our graduates
                are chosen by the industry's most innovative companies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  name: "Internshala",
                  img: "/images/hirrirng/image.png",
                  link: "https://internshala.com/",
                  desc: "Leading Internship Platform",
                },
                {
                  name: "Unstop",
                  img: "/images/hirrirng/image copy.png",
                  link: "https://unstop.com/",
                  desc: "Career Engagement Platform",
                },
                {
                  name: "Naukri.com",
                  img: "/images/hirrirng/image copy 2.png",
                  link: "https://www.naukri.com/",
                  desc: "India's No.1 Job Site",
                },
                {
                  name: "NSDC",
                  img: "/images/hirrirng/image copy 3.png",
                  link: "https://nsdcindia.org/",
                  desc: "Government Skill Initiative",
                },
                {
                  name: "Pitch N Hire",
                  img: "/images/hirrirng/image copy 4.png",
                  link: "https://www.pitchnhire.com/",
                  desc: "Global Hiring Platform",
                },
                {
                  name: "Onjob",
                  img: "/images/hirrirng/image copy 5.png",
                  link: "https://onjob.io/",
                  desc: "Job Portal",
                },
              ].map((partner, i) => (
                <motion.a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  whileHover={{ y: -10 }}
                  className="flex flex-col bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 group/card"
                >
                  <div className="h-20 w-full flex items-center justify-center mb-6 transition-all duration-500">
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-black text-slate-800 mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium mb-4">
                      {partner.desc}
                    </p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      Visit Website
                      <svg
                        className="w-4 h-4 group-hover/card:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-[40px] p-8 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-5xl font-black mb-6 leading-tight"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Trusted by <span className="text-indigo-400">500+</span>{" "}
                Corporate Partners
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our students have secured roles at global giants and high-growth
                startups, including Microsoft, Amazon, TCS, Accenture, Razorpay,
                and more.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-black text-indigo-400 mb-2">
                    95%
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                    Placement Rate
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl font-black text-indigo-400 mb-2">
                    12 LPA
                  </div>
                  <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                    Avg. Package
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Microsoft",
                "Amazon",
                "TCS",
                "Infosys",
                "Accenture",
                "HDFC Bank",
                "Razorpay",
                "Zomato",
              ].map((partner, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-xl font-black tracking-tight hover:bg-white/10 transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Placement />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
