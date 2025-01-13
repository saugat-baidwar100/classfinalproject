// import { Instructor } from '../modules/course/instructor';
import Navbar from '../components/navbar';
import logo from '../assets/images/logo.png';
import CourseCard from '../modules/course/course-detail';
import PopularCourses from '../components/popular-courses';
import Footer from '../components/footer';
import ClassRoom from '../modules/course/classroom';

export const CourseDetail = () => {
  return (
    <div>
      <Navbar logoSrc={logo} />
      <CourseCard />
      <PopularCourses />
      <ClassRoom />
      <Footer logoSrc={logo} />
    </div>
  );
};
