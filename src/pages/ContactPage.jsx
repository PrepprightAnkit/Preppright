import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const ContactPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCourse = queryParams.get("course") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: selectedCourse,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="bg-white text-slate-900 min-h-screen"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Hero Section */}
      <section className="hero-section-fix pb-20 relative overflow-hidden bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
                Get in Touch
              </div>
              <h1
                className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight text-slate-950"
                style={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Let's build your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Future
                </span>{" "}
                together.
              </h1>
              <p className="text-slate-500 text-xl leading-relaxed max-w-lg mb-12">
                Have questions about our career paths? Our experts are here to
                help you choose the right direction for your tech journey.
              </p>

              <div className="space-y-8">
                <ContactInfoItem
                  icon="📍"
                  title="Our Location"
                  detail="Noida, Uttar Pradesh, India"
                />
                <ContactInfoItem
                  icon="📧"
                  title="Email Support"
                  detail="support@preppright.com"
                />
                <ContactInfoItem
                  icon="📞"
                  title="Phone Number"
                  detail="+91 88102 43461"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 md:p-16 rounded-xl border border-slate-100 shadow-premium relative z-10"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-7xl mb-8">🎉</div>
                  <h2
                    className="text-3xl font-black text-slate-900 mb-4"
                    style={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    Message Received!
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Thank you for reaching out. One of our career counselors
                    will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-10 px-8 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Full Name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <InputGroup
                    label="Interested Course"
                    name="course"
                    placeholder="e.g. Full Stack Web Development"
                    value={formData.course}
                    onChange={handleChange}
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      How can we help?
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your goals..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-6 py-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 rounded-xl bg-slate-950 text-white font-black uppercase tracking-widest text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-950/10 hover:shadow-indigo-600/20"
                  >
                    Request Call Back
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const ContactInfoItem = ({ icon, title, detail }) => (
  <div className="flex gap-6 items-center">
    <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm">
      {icon}
    </div>
    <div>
      <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">
        {title}
      </div>
      <div className="text-lg font-bold text-slate-900">{detail}</div>
    </div>
  </div>
);

const InputGroup = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-6 py-4 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
    />
  </div>
);

export default ContactPage;
