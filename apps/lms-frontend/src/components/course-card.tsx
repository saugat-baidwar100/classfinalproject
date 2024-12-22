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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-4 aspect-h-3 relative">
        <img
          src={getImageSrc(course.imageUrl)}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-medium-size font-poppins font-semibold mb-2">{course.title}</h3>
        <p className="text-small-size font-poppins text-black mb-2">By {course.author}</p>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-medium-size font-poppins font-semibold">{course.rating}</span>
          <svg className="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-medium-size text-black font-poppins">
            ({course.totalRatings.toLocaleString()} ratings)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {course.currentPrice === "Free" ? (
            <>
              <span className="text-[#9d9d9d] font-poppins text-[18px] line-through">
                Rs 299
              </span>
              <span className="text-[#31b991] font-poppins text-[20px]">Free</span>
            </>
          ) : (
            <>
              <span className="text-[#9d9d9d] font-poppins text-[18px] line-through">
                Rs {course.originalPrice}
              </span>
              <span className="text-red-500 font-poppins text-[20px]">
                Rs {course.currentPrice}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};