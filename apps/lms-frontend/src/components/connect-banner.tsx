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
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 max-w-7xl mx-auto">
      {/* Banner content container with gradient background */}
      <div className="w-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
        {/* Left section with avatar and heading */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
          {/* Avatar container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-teal-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={girlImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Heading */}
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold font-poppins text-black text-center sm:text-left">
            Let&apos;s Get Connected With Us!
          </h2>
        </div>

        {/* Right section with buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          <button
            onClick={onStudentClick}
            className="w-full sm:w-auto px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base lg:text-[18px] border-2 border-teal-500 text-teal-500 font-semibold font-poppins rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200"
          >
            I&apos;m A Student
          </button>
          <button
            onClick={onInstructorClick}
            className="w-full sm:w-auto px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base lg:text-[18px] bg-teal-500 text-white font-semibold font-poppins rounded-lg hover:bg-teal-600 transition-all duration-200"
          >
            Become An Instructor
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectBanner;

