import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Sidebar } from '../modules/sidebar/sidebar-container';
import logo from '../assets/images/logo.png';
import Footer from '../components/footer';
import { courseApi } from '../api/course';
import AllCourseCard from '../components/all-course-card';
import { TcourseSchema } from '@skillprompt-lms/libs/api-contract/modules/courses';

export const AllCoursePage = () => {
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState<string[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetching courses from API
  const { data, isLoading, error } = courseApi.getCourse.useQuery({
    queryKey: ['getCourse'],
  });

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
        <h2 className="text-sm">An error occurred. Please try again.</h2>
      </div>
    );
  }

  console.log('Course Data:', data?.body?.data);
  console.log('Selected Filters:', isSelectedCheckbox);

  // Filter courses based on selected filters
  const filteredData = (courses: TcourseSchema[], selected: string[]) => {
    if (!courses || courses.length === 0) return [];

    // Normalize selected filters to lowercase
    const normalizedFilters = selected.map((filter) => filter.toLowerCase());

    const selectedCategories = normalizedFilters.filter((value) =>
      courses.some((course) => course.category?.toLowerCase() === value)
    );
    const selectedAuthors = normalizedFilters.filter((value) =>
      courses.some((course) => course.instructor?.toLowerCase() === value)
    );
    const selectedTypes = normalizedFilters.filter((value) =>
      courses.some((course) => course.type?.toLowerCase() === value)
    );

    return courses
      .filter(({ category, instructor, type }) => {
        return (
          (selectedCategories.length === 0 ||
            selectedCategories.includes(category?.toLowerCase() || '')) &&
          (selectedAuthors.length === 0 ||
            selectedAuthors.includes(instructor?.toLowerCase() || '')) &&
          (selectedTypes.length === 0 ||
            selectedTypes.includes(type?.toLowerCase() || ''))
        );
      })
      .map(
        ({
          id,
          title,
          instructor,
          category,
          type,
          price,
          thumbnail,
          updated_at,
        }) => (
          <AllCourseCard
            key={id}
            id={id}
            thumbnail={thumbnail}
            title={title}
            totalLecture={12}
            totalStudents={122}
            lastUpdated={updated_at ?? ''}
            originalPrice="100"
            currentPrice={price}
            type={type}
            instructor={instructor}
            category={category}
          />
        )
      );
  };

  const result = filteredData(data?.body?.data ?? [], isSelectedCheckbox);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Navbar logoSrc={logo} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-14 mb-14 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[4fr,1fr] lg:gap-16 relative">
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
            {(!data || data.body.data.length === 0) && (
              <div className="text-custom-teal text-lg">
                No Courses Available
              </div>
            )}
            {result}
          </div>
        </div>

        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-opacity-50 bg-customGray lg:hidden z-10 pointer-events-auto"
            onClick={toggleSidebar}
          ></div>
        )}

        <div
          className={`fixed lg:relative top-0 right-0 h-full bg-white transform transition-transform duration-300 z-20 ${
            isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 lg:h-auto md:w-80 lg:w-80 xl:w-80 w-48 p-6 ${
            isSidebarVisible
              ? 'overflow-y-auto md:overflow-y-auto lg:overflow-visible'
              : ''
          }`}
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
