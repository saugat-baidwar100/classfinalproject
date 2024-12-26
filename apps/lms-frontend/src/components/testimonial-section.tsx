import { Star } from 'lucide-react';
import testimonialImage from '../assets/images/testimonial.png';

export default function TestimonialSection() {
  return (
    <div className="w-full px-4 py-8 sm:py-12 bg-[#f2fffb]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold font-poppins text-black mb-2">
          Students Testimonial
        </h2>
        <p className="text-sm sm:text-base md:text-[20px] text-[#777575] font-poppins mb-8 sm:mb-12 md:mb-16">
          See what others are achieving from our courses
        </p>

        <div className="relative">
          <div className="bg-[#3EBD98] rounded-[20px] text-white relative overflow-visible p-4 sm:p-6 pt-12 sm:pt-16">
            <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
              <div className="rounded-full border-4 border-white overflow-hidden w-24 h-24 sm:w-32 sm:h-32">
                <img
                  src={testimonialImage}
                  alt="Student profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="text-4xl sm:text-5xl md:text-6xl leading-none font-serif text-white/90 mb-2 sm:mb-3">
                "
              </div>
              <p className="text-xs sm:text-sm md:text-base font-poppins leading-relaxed mb-4 sm:mb-6">
                "This platform transformed my career! The courses are so well-
                structured and easy to follow. Highly recommend it to anyone looking to
                upskill. The courses are so well-structured and easy to follow. This
                platform transformed my career! The courses are so well-structured
                and easy to follow. Highly recommend it to anyone looking to upskill"
              </p>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg md:text-[24px] font-medium font-poppins">
                  Albert Flores
                </h3>
                <p className="text-white/90 text-xs sm:text-sm md:text-base font-poppins mb-2">
                  Student
                </p>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === 0 ? 'bg-[#3CC5A7]' : 'bg-[#D9D9D9]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

