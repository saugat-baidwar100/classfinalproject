import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/hero-section";
import Footer from "../components/footer";
import logo from "../assets/images/logo.png";
import HeroSectionLogo from "../assets/images/hero-image.png"; // Import your local image

const Home: React.FC = () => {
  return (
    <div>
      <Navbar logoSrc={logo} />
      <HeroSection HeroSectionLogoSrc={HeroSectionLogo} />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to SkillPrompt!</h1>
      </main>
      <Footer logoSrc={logo} />
    </div>
  );
};

export default Home;
