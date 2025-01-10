import React, { useState } from 'react';
import { AllCourse } from './types/course';
import { GiOpenBook, GiGraduateCap } from 'react-icons/gi';
import courseImage from '../assets/images/popular-courses.png';
import { Divider } from '@nextui-org/react';

export const AllCourseCard: React.FC<AllCourse> = ({
  instructor,
  id,
  thumbnail,
  title,
  totalLecture,
  totalStudents,
  lastUpdated,
  originalPrice,
  currentPrice,
}) => {

  const getImageSrc = (imageUrl: string) => {
    try {
      return imageUrl;
    } catch {
      return courseImage;
    }
  };


  return (
    <div className="flex flex-row h-32 sm:h-auto rounded-[20px] border border-[#EAEAEA] overflow-hidden group cursor-pointer transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:bg-custom-teal">
      {/* Image Section */}
      <div className="overflow-hidden flex-shrink-0 w-20 sm:w-52 md:w-52 lg:w-56">
        <img
          src={thumbnail || courseImage}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-1 sm:p-3 md:p-3 lg:p-4 xl:p-4">
        {/* Title */}
        <h3 className="text-sm flex-none line-clamp-1 md:flex-1 lg:flex-1 xl:flex-1 md:text-base lg:text-lg font-poppins font-semibold mb-[2px] sm:mb-1 md:mb-2 lg:mb-2 xl:mb-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          {title}
        </h3>

        {/* Author */}
        <p className="text-xs sm:text-sm lg:text-base font-poppins mb-1 md:mb-2 lg:mb-2 xl:mb-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          By {instructor}
        </p>

        <div className="flex flex-row gap-3 items-center mb-1 md:mb-2 lg:mb-2 xl:mb-2">
          <div className="flex gap-2 justify-center items-center">
            <GiOpenBook className="text-[#FF782D] transition-colors duration-300 ease-in-out group-hover:text-white" />
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-white">
              {totalLecture} lectures
            </p>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <GiGraduateCap className="text-[#FF782D] transition-colors duration-300 ease-in-out group-hover:text-white" />
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-white">
              {totalStudents} students
            </p>
          </div>
        </div>

        {/* Last Updated Section */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-poppins mb-1 md:mb-2 lg:mb-2 xl:mb-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          Last Updated: {lastUpdated}
        </p>

        <Divider className="my-2 sm:my-5" />

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-1 md:mb-2 lg:mb-2 xl:mb-2">
          {currentPrice === 'Free' ? (
            <>
              <span className="text-gray-600 font-poppins text-sm sm:text-base line-through transition-colors duration-300 ease-in-out group-hover:text-white">
                Rs 299
              </span>
              <span className="text-[#31b991] font-poppins text-sm sm:text-lg transition-colors duration-300 ease-in-out group-hover:text-white">
                Free
              </span>
            </>
          ) : (
            <>
              <span className="text-[#9d9d9d] font-poppins text-sm sm:text-base line-through transition-colors duration-300 ease-in-out group-hover:text-white">
                Rs {originalPrice}
              </span>
              <span className="text-red-500 font-poppins font-semibold text-sm sm:text-lg transition-colors duration-300 ease-in-out group-hover:text-white">
                Rs {currentPrice}
              </span>
            </>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default AllCourseCard;
