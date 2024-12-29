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
  return (
    <>
      <Navbar logoSrc={logo} />
      <div className="px-20 mt-14 mb-14 grid grid-cols-[4fr,1fr] gap-16">
        <div>
          <h2 className="text-[32px] font-bold font-poppins text-black mb-10">
            Top Categories
          </h2>
          <div className="flex flex-col gap-11">
            {courses.map((course) => (
              <AllCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <Sidebar />
      </div>
      <Footer logoSrc={logo} />
    </>
  );
};
