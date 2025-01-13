import { Button } from '@nextui-org/button';
import girlImage from '../../assets/images/girl.png';
import Group from '../../assets/images/Group.png';
import Component2 from '../../assets/images/Component 2.png';
import Heroes from '../../assets/images/heroes.png';
import popularCourses from '../../assets/images/popular-courses.png';
import { useState } from 'react';

import {
  FaShieldAlt,
  FaMobileAlt,
  FaCertificate,
  FaBook,
} from 'react-icons/fa';

export default function CourseCard() {
  const [isVisible, setIsVisible] = useState(false);

  const reviews = [
    { stars: 5, percentage: 90 },
    { stars: 4, percentage: 5 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="text-custom-teal text-xl" />,
      text: 'Money Back Guarantee',
    },
    {
      icon: <FaMobileAlt className="text-custom-teal text-xl" />,
      text: 'Access on all devices',
    },
    {
      icon: <FaCertificate className="text-custom-teal text-xl" />,
      text: 'Certification of completion',
    },
    {
      icon: <FaBook className="text-custom-teal text-xl" />,
      text: '20 Lessons',
    },
  ];
  return (
    <div className=" font-poppins">
      <div className="bg-custom-black shadow-md p-4  flex flex-wrap justify-between lg:pr-28 ">
        <div className="py-10 lg:w-2/3">
          <h2 className="text-xl font-semibold px-4 lg:px-36 mb-2 text-custom-teal text-center lg:text-left">
            Complete Web Development With A Bootcamp
          </h2>

          <div className="flex flex-wrap justify-center lg:justify-start items-center px-4 lg:px-36">
            <img
              src={Heroes}
              alt="Course Preview"
              className="rounded w-9 h-9 mb-4"
            />

            <p className="text-white ml-3 mt-1 text-center mb-4">
              <span>By </span>
              <span className="font-semibold">Marvin McKinney</span>
            </p>
            <img
              src={Group}
              alt="Course Preview"
              className="rounded w-4 h-4 mb-4 mt-2 ml-5"
            />
            <p className="text-custom-teal ml-2 mt-1 text-center mb-3">
              4 Lectures{' '}
            </p>
            <img
              src={Component2}
              alt="Course Preview"
              className="rounded w-4 h-4 mb-4 mt-2 ml-5"
            />
            <p className="text-custom-teal ml-2 mt-1 text-center mb-3">
              {' '}
              10 Students
            </p>
          </div>
        </div>
        <div className="relative lg:absolute right-0 top-0 mt-8 lg:mt-28 lg:mr-40">
          <div className="course-card rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 w-full lg:w-96">
            <img
              src={popularCourses}
              alt="Course"
              className="w-full h-auto object-cover"
            />
            <div className="bg-white flex items-center gap-4 lg:gap-8 py-4 lg:py-8 justify-center">
              <p className="text-gray-500 line-through">Rs 600.0</p>
              <p className="text-lg font-semibold text-red-600">Rs 300</p>
              <Button
                color="primary"
                radius="lg"
                size="sm"
                className="bg-custom-teal"
              >
                Start Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 lg:px-40 pt-6 text-center lg:text-left">
        <Button
          color="primary"
          radius="lg"
          size="md"
          className="bg-custom-teal"
        >
          Overview
        </Button>
        <p className="mt-6 text-gray-500 text-base max-w-full lg:max-w-3xl leading-relaxed">
          A Complete Web Development Bootcamp is an intensive, immersive
          training program designed to teach individuals how to build and
          develop websites and web applications from scratch. It typically
          covers both front-end and back-end development, and may also delve
          into specialized topics like database management, version control, and
          deployment.
        </p>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row gap-8">
        <div className="bg-custom-blue p-6 lg:pb-14 rounded-lg w-full lg:w-2/3 lg:ml-40 lg:mb-20 lg:mt-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-center lg:text-center mb-6">
            Course Curriculum
          </h2>
          <div className="bg-white rounded-lg">
            <div className="border-b border-gray-200 p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
              >
                <p className="text-lg font-semibold">Course Introduction</p>
                <p className="text-gray-500 text-sm">3 Lessons • 10min</p>
              </div>

              {isVisible && (
                <div className="mt-3 ml-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm">Welcome To This Course</p>
                    <p className="text-gray-500 text-sm">2:30</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Read Before You Start</p>
                    <p className="text-gray-500 text-sm">5:05</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Book Resources</p>
                    <p className="text-gray-500 text-sm">2:25</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Course Summary</p>
                <p className="text-gray-500 text-sm">3 Lessons • 5min</p>
              </div>
            </div>
            {/* <div className="border-t border-gray-300 my-4"></div> */}

            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Conclusion</p>
                <p className="text-gray-500 text-sm">2 Lessons • 5min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-lg w-full lg:w-1/3 lg:ml-52">
          <h2 className="text-lg font-semibold mb-4">This Course Includes</h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4">
                {feature.icon}
                <span className="text-sm md:text-base">{feature.text}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-6 lg:mr-40"></div>
          <div className="lg:mr-32">
            <h3 className="text-lg font-semibold mb-2">
              Training 5 or more people
            </h3>
            <p className="text-gray-600 text-sm">
              Class, launched less than a year ago by Blackboard co-founder
              Michael Chasen, integrates exclusively...
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-blue p-6 rounded-lg mx-4 lg:mx-40 py-10 mb-14">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="flex items-center justify-center lg:justify-start mb-4">
          <span className="text-xl font-bold">4.0</span>
          <span className="text-custom-teal text-2xl ml-2">★</span>
        </div>
        <div className="mb-10">
          {reviews.map((review) => (
            <div key={review.stars} className="flex items-center mb-2">
              <span className="text-lg font-medium w-10 text-custom-teal">
                {review.stars} ★
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                <div
                  className="bg-custom-teal h-2 rounded-full"
                  style={{ width: `${review.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm">{review.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 my-6"></div>

        <div className="mt-10">
          <div className="flex items-center mb-2">
            <img
              src={girlImage}
              alt="Reviewer"
              className="rounded-full w-10 h-10 mr-4"
            />

            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-bold">Laura Hipster</p>
              </div>
              <p className="text-gray-500 text-sm">October 03, 2022</p>
            </div>
          </div>
          <p className="text-gray-600 ml-14">
            Quisque nec non amet quis. Varius tellus justo odio parturient
            mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend
            luctus ut. Id sed faucibus bibendum augue id cras purus. At eget
            euismod cursus non. Molestie dignissim sed volutpat feugiat vel.
          </p>
          <button className="ml-14 mt-6">Reply</button>
        </div>
      </div>
    </div>
  );
}
