import React, { useState, useRef, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroImage from '../assets/images/heroes.png';

interface Hero {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const heroes: Hero[] = [
  {
    id: 1,
    name: 'Marvin McKinney',
    role: 'Full-Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: HeroImage,
  },
  {
    id: 2,
    name: 'Marvin McKinney',
    role: 'Full-Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices..',
    image: HeroImage,
  },
  {
    id: 3,
    name: 'Marvin McKinney',
    role: 'Full Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: HeroImage,
  },
  {
    id: 4,
    name: 'Marvin Mckinney',
    role: 'Full Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: HeroImage,
  },
];

export function MeetTheHeroes() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true, // Simplify by using autoplay directly in the settings
    autoplaySpeed: 3000,
  }), []);

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] font-poppins font-bold text-gray-900 mb-4">
            Meet the Heroes
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold font-poppins text-[#777575]">
            We offer the knowledge and abilities.
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {heroes.map((hero) => (
              <div key={hero.id} className="px-2">
                <div className="bg-[#3ebd98] rounded-2xl p-4 sm:p-6 text-center h-full shadow-lg">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-[20px] font-poppins font-semibold mb-2">
                    {hero.name}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-poppins mb-3 sm:mb-4">
                    {hero.role}
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-poppins">
                    {hero.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          <div className="flex justify-center gap-3 mt-6 sm:mt-8 md:mt-10">
            {heroes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index
                    ? 'bg-[#31b991]'
                    : 'bg-gray-300 hover:bg-[#d9d9d9]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetTheHeroes;
