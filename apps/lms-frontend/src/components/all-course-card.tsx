import React from 'react';
import { AllCourse } from './types/course';
import { GiOpenBook, GiGraduateCap } from 'react-icons/gi';

// Import the image directly
import courseImage from '../assets/images/popular-courses.png';

export const AllCourseCard: React.FC<AllCourse> = ({ author, imageUrl, title, totalLecture, totalStudents, lastUpdated, originalPrice, currentPrice }) => {
  const getImageSrc = (imageUrl: string) => {
    try {
      return imageUrl;
    } catch {
      return courseImage;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row rounded-[20px] border border-[#EAEAEA] overflow-hidden group cursor-pointer transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:bg-custom-teal">
      {/* Image Section */}
      <div className="w-full sm:w-1/3 overflow-hidden">
        <img
          src={getImageSrc(imageUrl)}
          alt={title}
          className="object-cover w-full h-48 sm:h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
  
      {/* Content Section */}
      <div className="w-full sm:w-2/3 p-4">
        {/* Title */}
        <h3 className="text-sm sm:text-base lg:text-lg font-poppins font-semibold mb-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          {title}
        </h3>
  
        {/* Author */}
        <p className="text-xs sm:text-sm lg:text-base font-poppins text-black mb-2 transition-colors duration-300 ease-in-out group-hover:text-white">
          By {author}
        </p>
  
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-2">
          <div className="flex gap-2">
            <GiOpenBook className="text-[#FF782D] mt-1.5 transition-colors duration-300 ease-in-out group-hover:text-white" />
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {totalLecture} lectures
            </p>
          </div>
          <div className="flex gap-2">
            <GiGraduateCap className="text-[#FF782D] mt-1 transition-colors duration-300 ease-in-out group-hover:text-white" />
            <p className="text-xs sm:text-sm lg:text-base font-poppins text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {totalStudents} students
            </p>
          </div>
        </div>
  
        {/* Last Updated Section */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-poppins mb-4 transition-colors duration-300 ease-in-out group-hover:text-white">
          Last Updated: {lastUpdated}
        </p>
  
        <div className="h-px bg-gray-200 my-4 group-hover:bg-gray-400"></div>
  
        {/* Price Section */}
        <div className="flex items-center gap-2">
          {currentPrice === 'Free' ? (
            <>
              <span className="text-[#9d9d9d] font-poppins text-sm sm:text-base line-through transition-colors duration-300 ease-in-out group-hover:text-white">
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
              <span className="text-red-500 font-poppins text-sm sm:text-lg transition-colors duration-300 ease-in-out group-hover:text-white">
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

