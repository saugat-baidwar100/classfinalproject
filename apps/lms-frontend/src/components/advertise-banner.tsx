import { CheckIcon } from '@heroicons/react/24/solid'
import advertiseImage from '../assets/images/advertise.png'

export interface AdvertiseBannerProps {
  image?: string;
}

export const AdvertiseBanner = ({ image = advertiseImage }: AdvertiseBannerProps) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative Circles */}
      <div className="absolute right-0 top-0 -z-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          <circle cx="200" cy="200" r="200" stroke="#E5E7EB" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="150" stroke="#E5E7EB" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="100" stroke="#E5E7EB" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden rounded-lg sm:aspect-[4/3] lg:aspect-auto">
            <img
              src={image}
              alt="Students learning online"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold font-poppins text-black sm:text-3xl lg:text-4xl">
              Boost Your Skills And Career With Our Courses
            </h2>

            <p className="text-sm font-poppins text-black sm:text-base lg:text-lg">
              Trust us, you can achieve several things that can enhance your personal and professional growth.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3">
              {[
                'Skill development',
                'Certifications',
                'Hands-on projects',
                'Access to Expert knowledge',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckIcon className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-poppins text-black sm:text-base lg:text-lg">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Call-to-Action Button */}
            <button
              className="rounded-md bg-[#31b991] px-6 py-3 text-sm font-semibold text-white font-poppins shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:text-base lg:text-lg"
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