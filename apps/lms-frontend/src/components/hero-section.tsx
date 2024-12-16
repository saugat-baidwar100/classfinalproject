import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  HeroSectionLogoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ HeroSectionLogoSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#000000] text-[#ffffff] py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-poppins">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left space-y-4 lg:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            Find the best courses for you
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#ffffff] leading-relaxed font-light">
            Discover, learn and upskill with our wide range of courses. <br />
            From professional development to personal growth, we <br /> provide
            an intuitive, immersive platform to explore your <br /> passions and
            build your expertise. Unlock a brighter future, <br /> one course at
            a time.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 lg:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg md:text-xl lg:text-2xl">
                📖
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium">
                Learning
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 text-lg md:text-xl lg:text-2xl">
                👨‍💻
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium">
                Career-Oriented
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-pink-500 text-lg md:text-xl lg:text-2xl">
                💡
              </span>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium">
                Creative Thinking
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="bg-[#31b991] px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl text-[#ffffff] font-semibold shadow-md hover:bg-[#289675]"
          >
            Explore Courses
          </button>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:w-2/5 mt-8 md:mt-0">
          <img
            src={HeroSectionLogoSrc}
            alt="Hero Section"
            className="w-64 sm:w-72 md:w-96 lg:w-[500px] h-auto rounded-2xl shadow-2xl object-cover transform transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
