import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  HeroSectionLogoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ HeroSectionLogoSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-custom-black text-custom-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-poppins">
      <div className="w-full max-w-7xl mx-auto">
        {/* Flex container with centered alignment */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8">
          {/* Text Section */}
          <div className="md:w-3/5 space-y-4 lg:space-y-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-big-size font-bold text-custom-white">
              Find the best courses for you
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-custom-white leading-relaxed font-light">
              Discover, learn and upskill with our wide range of courses. <br className="hidden md:inline" />
              From professional development to personal growth, we <br className="hidden md:inline" />
              provide an intuitive, immersive platform to explore your <br className="hidden md:inline" />
              passions and build your expertise. Unlock a brighter future, <br className="hidden md:inline" />
              one course at a time.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-center md:justify-start">
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
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate('/courses')}
                className="bg-custom-teal px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base text-custom-white font-medium hover:bg-custom-teal transition-all duration-300 ease-in-out"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-2/5 flex justify-center">
            <img
              src={HeroSectionLogoSrc}
              alt="Hero Section"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-2xl shadow-2xl object-cover transform transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;