import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  HeroSectionLogoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ HeroSectionLogoSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-custom-black text-custom-white py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-poppins">
      <div className="w-full">
        {/* Flex container with centered alignment */}
        <div className="flex flex-col md:flex-row items-center md:items-center space-y-6 md:space-y-0">
          {/* Text Section */}
          <div className="md:w-3/5 space-y-4 lg:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-big-size font-bold text-custom-white">
              Find the best courses for you
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-medium-size text-custom-white leading-relaxed font-light">
              Discover, learn and upskill with our wide range of courses. <br />
              From professional development to personal growth, we <br />{' '}
              provide an intuitive, immersive platform to explore your <br />{' '}
              passions and build your expertise. Unlock a brighter future,{' '}
              <br /> one course at a time.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-lg md:text-xl lg:text-2xl">
                  📖
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-small-size text-custom-white font-medium">
                  Learning
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-500 text-lg md:text-xl lg:text-2xl">
                  👨‍💻
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-small-size text-custom-white font-medium">
                  Career-Oriented
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-pink-500 text-lg md:text-xl lg:text-2xl">
                  💡
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-small-size text-custom-white font-medium">
                  Creative Thinking
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="bg-custom-teal px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base text-custom-white font-medium hover:bg-custom-teal transition-all duration-300 ease-in-out"
            >
              Explore Courses
            </button>
          </div>

          {/* Image Section */}
          <div className="md:w-2/5 flex justify-center md:justify-end ml-auto">
            <img
              src={HeroSectionLogoSrc}
              alt="Hero Section"
              className="w-48 sm:w-64 md:w-80 lg:w-[500px] h-auto rounded-2xl shadow-2xl object-cover transform transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
