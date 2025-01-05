import React from 'react';
import { Course } from './types/course';
import courseImage from '../assets/images/popular-courses.png';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Utility function to handle image loading fallback
  const getImageSrc = (imageUrl: string) => {
    try {
      return imageUrl;
    } catch {
      return courseImage;
    }
  };

  return (
    // Main container with consolidated hover effects
    <div className="course-card bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#3bbd98] cursor-pointer group">
      {/* Image Section */}
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={getImageSrc(course.imageUrl)}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4">
        {/* Title - Updates text color on hover */}
        <h3 className="text-xs sm:text-sm md:text-base lg:text-[20px] font-poppins font-semibold mb-1 sm:mb-2 line-clamp-2 group-hover:text-white">
          {course.title}
        </h3>

        {/* Author - Updates text color on hover */}
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-poppins text-black mb-1 sm:mb-2 group-hover:text-white">
          By {course.author}
        </p>

        {/* Rating Section - Updates text colors on hover */}
        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-poppins font-semibold group-hover:text-white">
            {course.rating}
          </span>
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current text-yellow-400"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[10px] sm:text-xs md:text-sm lg:text-[20px] text-black font-poppins group-hover:text-white">
            ({course.totalRatings.toLocaleString()} ratings)
          </span>
        </div>

        {/* Price Section - Updates text colors on hover */}
        <div className="flex items-center gap-2">
          {course.currentPrice === 'Free' ? (
            <>
              <span className="text-[#9d9d9d] font-poppins text-[10px] sm:text-xs md:text-sm lg:text-[18px] line-through group-hover:text-white/70">
                Rs 299
              </span>
              <span className="text-[#31b991] font-poppins text-xs sm:text-sm md:text-base lg:text-[20px] group-hover:text-white">
                Free
              </span>
            </>
          ) : (
            <>
              <span className="text-[#9d9d9d] font-poppins text-[10px] sm:text-xs md:text-sm lg:text-[18px] line-through group-hover:text-white/70">
                Rs {course.originalPrice}
              </span>
              <span className="text-red-500 font-poppins text-xs sm:text-sm md:text-base lg:text-[20px] group-hover:text-white">
                Rs {course.currentPrice}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

