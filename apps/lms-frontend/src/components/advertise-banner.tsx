import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';
import advertiseImage from '../assets/images/advertise.png';

export interface AdvertiseBannerProps {
  image?: string;
}

export const AdvertiseBanner: React.FC<AdvertiseBannerProps> = ({ image = advertiseImage }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative Circles */}
      <div className="absolute inset-0 -z-10 flex justify-end">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20 max-w-[300px] md:max-w-[400px]"
        >
          <circle cx="200" cy="200" r="200" stroke="#E5E7EB" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="150" stroke="#E5E7EB" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="#E5E7EB" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div className="relative aspect-video sm:aspect-[4/3] lg:aspect-auto rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Students learning online"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[30px] font-semibold font-poppins text-black">
              Boost Your Skills And Career With Our Courses
            </h2>

            <p className="text-xs sm:text-sm md:text-base lg:text-[16px] font-poppins text-black">
              Trust us, you can achieve several things that can enhance your personal and professional growth.
            </p>

            {/* Benefits List */}
            <ul className="space-y-2 sm:space-y-3">
              {[
                'Skill development',
                'Certifications',
                'Hands-on projects',
                'Access to Expert knowledge',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 sm:gap-3">
                  <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base lg:text-lg font-poppins text-black">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Call-to-Action Button */}
            <button
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto rounded-md bg-[#31b991] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base lg:text-[16px] font-semibold text-white font-poppins shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseBanner;
