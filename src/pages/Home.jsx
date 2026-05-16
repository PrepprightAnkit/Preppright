import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Courses from "../components/Courses";
import Trust from "../components/Trust";
import Gateway from "../components/Gateway";
import TopCategories from "../components/TopCategories";
import Empower from "../components/Empower";
import WorldMap from "../components/WorldMap";
import Placement from "../components/Placement";
import CredentialsPartner from "../components/CredentialsPartner";
import Collaboration from "../components/Collaboration";
import SpecialOfferings from "../components/SpecialOfferings";
import CTA from "../components/CTA";
import Footer from "../components/Footer";



const Home = ({ bannerVisible }) => {
  return (
    <>
      <Hero bannerVisible={bannerVisible} />
      <Empower /> {/* Moved Up to Ensure Visibility */}
      <Trust />
      <Gateway />
      <Collaboration />
      <TopCategories />
      <Features />
      <SpecialOfferings />
      <Placement />
      <Courses limit={3} />
      <CredentialsPartner />
      <WorldMap />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
