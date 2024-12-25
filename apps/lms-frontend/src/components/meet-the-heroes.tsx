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
    <section className="w-full py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Meet the Heroes
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-semibold font-poppins text-[#777575]">
            We offer the knowledge and abilities.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
            {heroes.map((hero) => (
              <div
                key={hero.id}
                className="transform transition-transform duration-300"
              >
                <div className="bg-[#3ebd98] rounded-2xl p-6 sm:p-8 text-center h-full shadow-lg">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="text-white text-base sm:text-lg font-poppins font-semibold mb-2">
                    {hero.name}
                  </h3>
                  <p className="text-white text-sm sm:text-base font-poppins mb-4">
                    {hero.role}
                  </p>
                  <p className="text-white text-xs sm:text-sm leading-relaxed font-poppins">
                    {hero.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-300 ${
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
