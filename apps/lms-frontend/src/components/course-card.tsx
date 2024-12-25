import React from 'react';
import { Course } from './types/course';

// Import the image directly
import courseImage from '../assets/images/popular-courses.png';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getImageSrc = (imageUrl: string) => {
    try {
      return imageUrl;
    } catch {
      return courseImage;
    }
  };

  return (
    <div className="course-card bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
      {/* Image Section */}
      <div className="aspect-w-4 aspect-h-3 relative">
        <img
          src={getImageSrc(course.imageUrl)}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm sm:text-base lg:text-lg font-poppins font-semibold mb-2">
          {course.title}
        </h3>

        {/* Author */}
        <p className="text-xs sm:text-sm lg:text-base font-poppins text-black mb-2">
          By {course.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm sm:text-base font-poppins font-semibold">
            {course.rating}
          </span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs sm:text-sm lg:text-base text-black font-poppins">
            ({course.totalRatings.toLocaleString()} ratings)
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          {course.currentPrice === "Free" ? (
            <>
              <span className="text-[#9d9d9d] font-poppins text-sm sm:text-base line-through">
                Rs 299
              </span>
              <span className="text-[#31b991] font-poppins text-sm sm:text-lg">
                Free
              </span>
            </>
          ) : (
            <>
              <span className="text-[#9d9d9d] font-poppins text-sm sm:text-base line-through">
                Rs {course.originalPrice}
              </span>
              <span className="text-red-500 font-poppins text-sm sm:text-lg">
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
