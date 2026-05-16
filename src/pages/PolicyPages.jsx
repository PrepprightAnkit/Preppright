import React, { useEffect } from "react";
import Footer from "../components/Footer";

const PolicyPage = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-slate-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-slate-950"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          {title}
        </h1>
        <div
          className="prose prose-slate max-w-none bg-slate-50/50 p-10 md:p-16 rounded-xl border border-slate-100 shadow-sm leading-relaxed text-slate-600 font-medium"
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const TermsPage = () => (
  <PolicyPage title="Terms and Conditions">
    <p className="mb-8">
      Welcome to PreppRight. By accessing our platform, you agree to comply with
      and be bound by the following terms and conditions of use.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">1. Use of License</h3>
    <p className="mb-8">
      Permission is granted to temporarily download one copy of the materials on
      PreppRight's website for personal, non-commercial transitory viewing only.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">2. Disclaimer</h3>
    <p className="mb-8">
      The materials on PreppRight's website are provided on an 'as is' basis.
      PreppRight makes no warranties, expressed or implied, and hereby disclaims
      and negates all other warranties.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">3. Limitations</h3>
    <p>
      In no event shall PreppRight or its suppliers be liable for any damages
      arising out of the use or inability to use the materials on PreppRight's
      website.
    </p>
  </PolicyPage>
);

export const PrivacyPage = () => (
  <PolicyPage title="Privacy Policy">
    <p className="mb-8">
      Your privacy is important to us. It is PreppRight's policy to respect your
      privacy regarding any information we may collect from you across our
      website.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Information We Collect</h3>
    <p className="mb-8">
      We only ask for personal information when we truly need it to provide a
      service to you. We collect it by fair and lawful means, with your
      knowledge and consent.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Data Retention</h3>
    <p className="mb-8">
      We only retain collected information for as long as necessary to provide
      you with your requested service.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Security</h3>
    <p>
      We protect your personal information using commercially acceptable means
      to prevent loss and theft, as well as unauthorized access or disclosure.
    </p>
  </PolicyPage>
);

export const RefundPage = () => (
  <PolicyPage title="Refund Policy">
    <p className="mb-8">
      At PreppRight, we strive to ensure our students are satisfied with our
      courses. Our refund policy is designed to be fair and transparent.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Eligibility for Refund</h3>
    <p className="mb-8">
      Refunds are available for courses within 7 days of purchase, provided that
      no more than 10% of the course content has been accessed.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Process</h3>
    <p className="mb-8">
      To request a refund, please contact our support team at
      support@preppright.com with your order details.
    </p>
    <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">Exceptions</h3>
    <p>
      Refunds are not available for personalized mentorship programs or
      bootcamps once the session has commenced.
    </p>
  </PolicyPage>
);
