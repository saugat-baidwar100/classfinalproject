import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  HeroSectionLogoSrc: string;
}

const IconWithLabel: React.FC<{ icon: string; label: string; colorClass: string }> = ({
  icon,
  label,
  colorClass,
}) => (
  <div className="flex items-center space-x-2">
    <span className={`text-lg md:text-xl lg:text-2xl ${colorClass}`}>
      {icon}
    </span>
    <span className="text-xs sm:text-sm md:text-base lg:text-small-size text-custom-white font-medium">
      {label}
    </span>
  </div>
);

const HeroSection: React.FC<HeroSectionProps> = ({ HeroSectionLogoSrc }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-custom-black text-custom-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 font-poppins">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 lg:space-x-12">
          {/* Text Section */}
          <div className="md:w-3/5 space-y-4 lg:space-y-6 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-big-size font-bold text-custom-white">
              Find the best courses for you
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-custom-white leading-relaxed font-light max-w-2xl mx-auto md:mx-0">
              Discover, learn and upskill with our wide range of courses. 
              From professional development to personal growth, we 
              provide an intuitive, immersive platform to explore your 
              passions and build your expertise. Unlock a brighter future, 
              one course at a time.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-center md:justify-start">
              <IconWithLabel icon="📖" label="Learning" colorClass="text-yellow-400" />
              <IconWithLabel icon="👨‍💻" label="Career-Oriented" colorClass="text-orange-500" />
              <IconWithLabel icon="💡" label="Creative Thinking" colorClass="text-pink-500" />
            </div>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate('/courses')}
                className="bg-custom-teal px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base text-custom-white font-medium hover:bg-custom-teal transition-all duration-300 ease-in-out"
                aria-label="Explore courses"
              >
                Explore Courses
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-2/5 flex justify-center">
            <img
              src={HeroSectionLogoSrc}
              alt="Hero section showcasing a variety of courses"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-2xl shadow-2xl object-cover transform transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

