import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Sidebar } from '../modules/sidebar/sidebar-container';
import popularCoursesImage from '../assets/images/popular-courses.png';
import logo from '../assets/images/logo.png';
import Footer from '../components/footer';
import { AllCourse } from '../components/types/course';
import AllCourseCard from '../components/all-course-card';

const courses: AllCourse[] = [
  {
    id: '1',
    title: 'Complete web development with a bootcamp',
    author: 'Hitesh Choudhary',
    totalLecture: 6,
    totalStudents: 10,
    lastUpdated: '12-02-2024',
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: '2',
    title: 'Complete web development with a bootcamp',
    author: 'Hitesh Choudhary',
    totalLecture: 6,
    totalStudents: 10,
    lastUpdated: '12-02-2024',
    originalPrice: 600,
    currentPrice: 300,
    imageUrl: popularCoursesImage,
  },
  {
    id: '3',
    title: 'Complete web development with a bootcamp',
    author: 'Hitesh Choudhary',
    totalLecture: 6,
    totalStudents: 10,
    lastUpdated: '12-02-2024',
    originalPrice: 299,
    currentPrice: 'Free',
    imageUrl: popularCoursesImage,
  },
];

export const AllCoursePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Navbar logoSrc={logo} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-14 mb-14 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[4fr,1fr] lg:gap-16 relative">
        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold font-poppins text-black">
              Top Categories
            </h2>
            {/* Filter button: hidden on medium and larger screens */}
            <button
              className={`filter-btn lg:hidden ${
                isSidebarVisible ? 'hidden' : 'block'
              } border-2 border-custom-teal text-sm sm:text-base md:text-base lg:text-small-size text-custom-teal px-4 py-1.5 rounded-xl font-semibold hover:text-custom-white hover:bg-custom-teal transition duration-300`}
              onClick={toggleSidebar}
            >
              Filter
            </button>
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-11">
            {courses.map((course) => (
              <AllCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Overlay for small screens */}
        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10 pointer-events-auto"
            onClick={toggleSidebar} 
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:relative top-0 right-0 h-full bg-white transform transition-transform duration-300 z-20 ${
            isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 lg:block lg:h-auto lg:w-auto w-80 p-6 ${
            isSidebarVisible ? 'overflow-y-auto md:overflow-y-auto lg:overflow-visible' : ''
          }`}
        >
          <Sidebar />
        </div>
      </div>
      <Footer logoSrc={logo} />
    </>
  );
};
