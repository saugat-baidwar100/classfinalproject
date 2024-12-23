import React from 'react';
import girlImage from '../assets/images/girl.png';

interface ConnectBannerProps {
  onStudentClick: () => void;
  onInstructorClick: () => void;
}

const ConnectBanner: React.FC<ConnectBannerProps> = ({
  onStudentClick,
  onInstructorClick,
}) => {
  return (
    <div className="w-full px-8 py-4">
      <div className="w-full bg-gradient-to-r from-blue-100 to-purple-100 px-12 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-x-8">
          <div className="w-32 h-32 bg-teal-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={girlImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-medium-size font-semibold font-poppins text-black text-center md:text-left">
            Let&apos;s Get Connected With Us!
          </h2>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-6 md:mt-0 items-center">
          <button
            onClick={onStudentClick}
            className="px-6 py-2.5 border-2 border-teal-500 text-teal-500 font-semibold font-poppins text-[18px] rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-200"
          >
            I&apos;m A Student
          </button>
          <button
            onClick={onInstructorClick}
            className="px-6 py-2.5 bg-teal-500 text-white font-semibold font-poppins text-[18px] rounded-xl hover:bg-teal-600 transition-all duration-200"
          >
            Become An Instructor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectBanner;
