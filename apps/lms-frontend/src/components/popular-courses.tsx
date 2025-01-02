import React, { useState, useRef, useEffect } from 'react';
import { CourseCard } from './course-card';
import { Button } from './button';
import { Course } from './types/course';
import popularCoursesImage from "../assets/images/popular-courses.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const courses: Course[] = [
  {
    id: "1",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: "2",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: "3",
    title: "Complete web development with a bootcamp",
    author: "Hitesh Choudhary",
    rating: 4.7,
    totalRatings: 5556,
    originalPrice: 299,
    currentPrice: "Free",
    imageUrl: popularCoursesImage,
  },
];

type FilterType = "all" | "paid" | "free";

export const PopularCourses: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const filteredCourses = courses.filter((course) => {
    if (filter === "paid") return course.currentPrice !== "Free";
    if (filter === "free") return course.currentPrice === "Free";
    return true;
  });

  const settings = {
    dots: false,
    infinite: filteredCourses.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
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
  };

  useEffect(() => {
    setCurrentSlide(0);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }

    const autoplayInterval = setInterval(() => {
      if (sliderRef.current && filteredCourses.length > 1) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(autoplayInterval);
  }, [filter, filteredCourses.length]);

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold font-poppins text-center md:text-left">
          Our Popular Courses
        </h2>
        <div className="flex flex-wrap md:flex-nowrap gap-2 sm:gap-3 items-center justify-center md:justify-start">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="text-xs sm:text-[16px]"
          >
            All courses
          </Button>
          <Button
            variant={filter === "paid" ? "default" : "outline"}
            onClick={() => setFilter("paid")}
            className="text-xs sm:text-[16px"
          >
            Paid courses
          </Button>
          <Button
            variant={filter === "free" ? "default" : "outline"}
            onClick={() => setFilter("free")}
            className="text-xs sm:text-[16px]"
          >
            Free courses
          </Button>
        </div>
      </div>

      {/* Courses Display */}
      <div className="relative">
        {filteredCourses.length === 1 ? (
          // Single course display
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="px-2">
              <CourseCard course={filteredCourses[0]} />
            </div>
          </div>
        ) : (
          // Multiple courses carousel
          <Slider ref={sliderRef} {...settings}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="px-2">
                <CourseCard course={course} />
              </div>
            ))}
          </Slider>
        )}

        {/* Pagination Dots */}
        {filteredCourses.length > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 items-center">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => goToSlide(dot)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === dot
                    ? 'bg-custom-teal'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${dot + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;