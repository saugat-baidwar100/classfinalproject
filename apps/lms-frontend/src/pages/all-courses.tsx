import { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/navbar';
import { Sidebar } from '../modules/sidebar/sidebar-container';
import logo from '../assets/images/logo.png';
import Footer from '../components/footer';
import { courseApi } from '../api/course';
import AllCourseCard from '../components/all-course-card';
import { TcourseSchema } from '@skillprompt-lms/libs/api-contract/modules/courses';

export const AllCoursePage = () => {
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<TcourseSchema[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { data, isLoading, error } = courseApi.getCourse.useQuery({
    queryKey: ['getCourse'],
  });

  // Extract the courses from the API data
  const courses = useMemo(() => data?.body?.data || [], [data]);

  useEffect(() => {
    if (isSelectedCheckbox.length === 0) {
      // If no filters are selected, show all courses
      setFilteredCourses(courses);
      return;
    }

    // Filter logic without using `every()`
    const filtered = courses.filter((course) => {
      const { category, instructor, type } = course;
      const courseValues = [
        category?.toLowerCase(),
        instructor?.toLowerCase(),
        type?.toLowerCase(),
      ];

      for (const filter of isSelectedCheckbox) {
        if (!courseValues.includes(filter.toLowerCase())) {
          return false; // If any filter is not matched, exclude the course
        }
      }
      return true; // Include the course if all filters are matched
    });

    setFilteredCourses(filtered);
  }, [isSelectedCheckbox, courses]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-base">
        <h2 className="text-base">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h2 className="text-sm">
          An error occurred. Please try again. {JSON.stringify(error)}
        </h2>
      </div>
    );
  }

  return (
    <>
      <Navbar logoSrc={logo} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 mb-14 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[4fr,1fr] lg:gap-16 relative">
        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[36px] font-bold font-poppins text-black">
              All Courses
            </h2>
            <button
              className={`filter-btn lg:hidden ${
                isSidebarVisible ? 'hidden' : 'block'
              } border-1 border-custom-teal font-poppins text-sm sm:text-base md:text-base lg:text-small-size text-custom-teal md:px-4 md:py-1.5 px-2 py-1 rounded-xl font hover:text-custom-white hover:bg-custom-teal transition duration-300`}
              onClick={toggleSidebar}
            >
              Filter
            </button>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-11">
            {filteredCourses.length === 0 ? (
              <div className="text-custom-teal text-lg text-center">
                No match found
              </div>
            ) : (
              filteredCourses.map((course) => (
                <AllCourseCard
                  key={course.id}
                  id={course.id}
                  thumbnail={course.thumbnail}
                  title={course.title}
                  totalLecture={12} 
                  totalStudents={122} 
                  lastUpdated={''} 
                  originalPrice="100" 
                  currentPrice={course.price}
                  type={course.type}
                  instructor={course.instructor}
                  category={course.category}
                />
              ))
            )}
          </div>
        </div>

        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-opacity-50 bg-customGray lg:hidden z-10 pointer-events-auto"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          style={{
            paddingTop: isSidebarVisible ? '6rem' : '2rem',
          }}
          className={`fixed lg:relative top-0 right-0 h-full bg-white transform transition-transform duration-300 z-20 ${
            isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 lg:h-auto md:w-80 lg:w-80 xl:w-80 w-48 p-6`}
        >
          <Sidebar
            handleChange={(selected: string[]) =>
              setIsSelectedCheckbox(selected)
            }
            isSelectedCheckbox={isSelectedCheckbox}
          />
        </div>
      </div>
      <Footer logoSrc={logo} />
    </>
  );
};
