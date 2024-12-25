// <<<<<<< HEAD
// import { CreateNewCourse } from '../components/forms/CreateNewCourse';

// export const Home = () => {
//   return (
//     <div>
//       <CreateNewCourse />
// =======
import React from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/hero-section';
import Footer from '../components/footer';
import logo from '../assets/images/logo.png';
import HeroSectionLogo from '../assets/images/hero-image.png'; // Import your local image
import TopCategories from '../components/top-categories';
import PopularCourses from '../components/popular-courses';
import ConnectBanner from '../components/connect-banner';
import { MeetTheHeroes } from '../components/meet-the-heroes';
import AdvertiseBanner from '../components/advertise-banner';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar logoSrc={logo} />
      <HeroSection HeroSectionLogoSrc={HeroSectionLogo} />
      <TopCategories />
      <PopularCourses />
      <ConnectBanner
        onStudentClick={() => console.log('Student clicked')}
        onInstructorClick={() => console.log('Instructor clicked')}
      />
      <MeetTheHeroes />
      <AdvertiseBanner />
      <Footer logoSrc={logo} />
      {/* >>>>>>> 4fdfde2272577f77a4b98b60df4192f8a44317bf */}
    </div>
  );
};

export default Home;
