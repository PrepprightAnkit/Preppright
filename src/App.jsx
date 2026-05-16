import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CategoriesPage from "./pages/CategoriesPage";
import DiscussPage from "./pages/DiscussPage";
import QuizPage from "./pages/QuizPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ContactPage from "./pages/ContactPage";
import TechLabPage from "./pages/TechLabPage";
import JobOrientationPage from "./pages/JobOrientationPage";
import { TermsPage, PrivacyPage, RefundPage } from "./pages/PolicyPages";
import AdvantageDetailPage from "./pages/AdvantageDetailPage";
import SkillPathsPage from "./pages/SkillPathsPage";
import PracticeAssessmentPage from "./pages/PracticeAssessmentPage";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";

import EnrollmentBanner from "./components/EnrollmentBanner";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function AppContent() {
  const location = useLocation();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const els = Array.from(
      document.querySelectorAll("[data-reveal]:not(.is-revealed)"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <div className="app-shell w-full overflow-x-hidden relative">
      <div className="app-effects" aria-hidden="true" />
      <EnrollmentBanner visible={showBanner} setVisible={setShowBanner} />
      <Navbar bannerVisible={showBanner} />
      <main className="w-full">

        <Routes>
          <Route path="/" element={<Home bannerVisible={showBanner} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advantage/:id" element={<AdvantageDetailPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetailsPage />} />
          <Route path="/course" element={<Navigate to="/courses" replace />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tech-lab" element={<TechLabPage />} />
          <Route path="/job-orientation" element={<JobOrientationPage />} />
          <Route path="/discuss" element={<DiscussPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/skill-paths" element={<SkillPathsPage />} />
          <Route path="/practice" element={<PracticeAssessmentPage />} />
          <Route path="/community" element={<CommunityPage />} />

          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route
            path="/register"
            element={
              <div className="container px-4 md:px-8 mx-auto" style={{ paddingTop: "10rem" }}>
                <h2 className="text-3xl md:text-5xl font-bold">Register Page</h2>
              </div>
            }
          />
        </Routes>
      </main>
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
