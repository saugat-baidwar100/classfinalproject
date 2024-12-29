import React from 'react';
import { AllCourse } from './types/course';
import { GiOpenBook, GiGraduateCap } from 'react-icons/gi';

// Import the image directly
import courseImage from '../assets/images/popular-courses.png';
import { Divider } from '@nextui-org/react';

interface CourseCardProps {
  course: AllCourse;
}

export const AllCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getImageSrc = (imageUrl: string) => {
    try {
      return imageUrl;
    } catch {
      return courseImage;
    }
  };

  return (
    <div className="flex flex-row rounded-[20px] cursor-pointer border border-[#EAEAEA] overflow-hidden">
      {/* Image Section */}
      <div className="aspect-w-4 aspect-h-3 relative">
        <img
          src={getImageSrc(course.imageUrl)}
          alt={course.title}
          className="object-contain w-full h-full"
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
        <div className="flex flex-row gap-3 items-center">
          <div className="flex gap-2">
            <GiOpenBook className="text-[#FF782D] size-3 mt-1.5" />
            {/* No. of lectures */}
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-black mb-2">
              {course.totalLecture} lectures
            </p>
          </div>
          <div className="flex gap-2">
            <GiGraduateCap className="text-[#FF782D] mt-1" />
            {/* No. of students enrolled */}
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-black mb-2">
              {course.totalStudents} students
            </p>
          </div>
        </div>

        {/* Last Updated Section */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-poppins mb-4">
          Last Updated: {course.lastUpdated}
        </p>
        <Divider className="my-5" />
        {/* Price Section */}
        <div className="flex items-center gap-2">
          {course.currentPrice === 'Free' ? (
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

export default AllCourseCard;
