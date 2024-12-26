import { useState } from 'react';
import heroImage from '../assets/images/heroes.png';

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
    image: heroImage,
  },
  {
    id: 2,
    name: 'Marvin McKinney',
    role: 'Full-Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: heroImage,
  },
  {
    id: 3,
    name: 'Marvin McKinney',
    role: 'Full-Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: heroImage,
  },
  {
    id: 4,
    name: 'Marvin McKinney',
    role: 'Full-Stack Developer',
    description:
      'Strong emphasis on project-based learning, debugging, and industry best practices.',
    image: heroImage,
  },
];

export function MeetTheHeroes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="w-full py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-poppins  font-bold text-gray-900 mb-4 tracking-tight">
            Meet the Heroes
          </h2>
          <p className="text-sm sm:text-base md:text-[20px] font-semibold font-poppins text-[#777575]">
            We offer the knowledge and abilities.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1200px] mx-auto">
            {heroes.map((hero) => (
              <div
                key={hero.id}
                className="transform transition-transform duration-300"
              >
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
                  <h3 className="text-white text-sm sm:text-base md:text-[20px] font-poppins font-semibold mb-2">
                    {hero.name}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base font-poppins mb-3 sm:mb-4">
                    {hero.role}
                  </p>
                  <p className="text-white text-xs sm:text-base leading-relaxed font-poppins">
                    {hero.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6 sm:mt-10">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === dot
                    ? 'bg-[#31b991]'
                    : 'bg-gray-300 hover:bg-[#d9d9d9]'
                }`}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeetTheHeroes;

