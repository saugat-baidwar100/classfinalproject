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
      <div className="w-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Left section with avatar and heading */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Avatar container */}
          <div className="w-20 sm:w-24 md:w-28 lg:w-32 bg-teal-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={girlImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Heading */}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-poppins text-black text-center sm:text-left">
            Let&apos;s Get Connected With Us!
          </h2>
        </div>

        {/* Right section with buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={onStudentClick}
            className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 text-sm sm:text-base md:text-lg lg:text-xl border-2 border-teal-500 text-teal-500 font-semibold font-poppins rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200"
          >
            I&apos;m A Student
          </button>
          <button
            onClick={onInstructorClick}
            className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 text-sm sm:text-base md:text-lg lg:text-xl bg-teal-500 text-white font-semibold font-poppins rounded-lg hover:bg-teal-600 transition-all duration-200"
          >
            Become An Instructor
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectBanner;
