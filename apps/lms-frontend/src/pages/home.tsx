import React from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/hero-section';
import Footer from '../components/footer';
import logo from '../assets/images/logo.png';
import HeroSectionLogo from '../assets/images/hero-image.png';
import TopCategories from '../components/top-categories';
import PopularCourses from '../components/popular-courses';
import ConnectBanner from '../components/connect-banner';
import { MeetTheHeroes } from '../components/meet-the-heroes';
import AdvertiseBanner from '../components/advertise-banner';
import TestimonialSection from '../components/testimonial-section';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar logoSrc={logo} />
      {/* <CreateNewCourse /> */}
      <HeroSection HeroSectionLogoSrc={HeroSectionLogo} />
      <TopCategories />
      <PopularCourses />
      <ConnectBanner
        onStudentClick={() => console.log('Student clicked')}
        onInstructorClick={() => console.log('Instructor clicked')}
      />
      <MeetTheHeroes />
      <AdvertiseBanner />
      <TestimonialSection />
      <Footer logoSrc={logo} />
    </div>
  );
};

export default Home;
