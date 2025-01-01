import React from 'react';
import { Star } from 'lucide-react';
import testimonialImage from '../assets/images/testimonial.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../testimonial-section.css';

export default function TestimonialSection() {
  interface SliderSettings {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    autoplaySpeed: number;
    customPaging: (i: number) => JSX.Element;
    appendDots: (dots: React.ReactNode) => JSX.Element;
  }

  const settings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: (i) => (
      <button 
        className="custom-dot"
        type="button"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    appendDots: (dots) => (
      <div style={{ bottom: '-50px', position: 'absolute' }}>
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
  };

  const testimonials = [
    {
      name: "Albert Flores",
      role: "Student",
      testimonial: "This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill. The courses are so well-structured and easy to follow. This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill"
    },
    {
      name: "Albert Flores",
      role: "Student",
      testimonial: "This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill. The courses are so well-structured and easy to follow. This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill"
    },
    {
      name: "Albert Flores",
      role: "Student",
      testimonial: "This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill. The courses are so well-structured and easy to follow. This platform transformed my career! The courses are so well-structured and easy to follow. Highly recommend it to anyone looking to upskill"
    }
  ];

  return (
    <div className="w-full px-4 py-8 sm:py-12 bg-[#f2fffb]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold font-poppins text-black mb-2">
          Students Testimonial
        </h2>
        <p className="text-sm sm:text-base md:text-[20px] text-[#777575] font-poppins mb-4">
          See what others are achieving from our courses
        </p>

        <div className="mb-8">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative pt-20 sm:pt-24">
                <div className="bg-[#3EBD98] rounded-[20px] text-white relative overflow-visible p-6 sm:p-8 pt-16 sm:pt-20">
                  <div className="absolute -top-16 sm:-top-20 left-1/2 transform -translate-x-1/2">
                    <div className="rounded-full border-4 border-white overflow-hidden w-28 h-28 sm:w-36 sm:h-36">
                      <img 
                        src={testimonialImage} 
                        alt="Student profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-poppins mb-4">
                    "{testimonial.testimonial}"
                  </p>
                  <h1 className="text-base sm:text-lg md:text-[24px] font-poppins mb-3">
                    {testimonial.name}
                  </h1>
                  <p className="text-base sm:text-lg md:text-[16px] font-poppins mb-3">
                    {testimonial.role}
                  </p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
