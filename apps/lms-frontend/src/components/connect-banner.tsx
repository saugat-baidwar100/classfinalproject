import React from 'react';
import girlImage from '../assets/images/girl.png';

interface ConnectBannerProps {
  onStudentClick: () => void;
  onInstructorClick: () => void;
}

const ConnectBanner: React.FC<ConnectBannerProps> = ({
  onStudentClick,
  onInstructorClick,
}) => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Banner content container with gradient background */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-purple-100 px-8 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
        {/* Left section with avatar and heading */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Avatar container */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-teal-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={girlImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Heading */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins text-black text-center md:text-left">
            Let&apos;s Get Connected With Us!
          </h2>
        </div>

        {/* Right section with buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-6 md:mt-0 items-center">
          <button
            onClick={onStudentClick}
            className="px-5 sm:px-6 py-2 text-sm sm:text-base border-2 border-teal-500 text-teal-500 font-semibold font-poppins rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200"
          >
            I&apos;m A Student
          </button>
          <button
            onClick={onInstructorClick}
            className="px-5 sm:px-6 py-2 text-sm sm:text-base bg-teal-500 text-white font-semibold font-poppins rounded-lg hover:bg-teal-600 transition-all duration-200"
          >
            Become An Instructor
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectBanner;
