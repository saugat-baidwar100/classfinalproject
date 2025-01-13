import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import { LoginPage } from './pages/login-page';
import { ResetPassword } from './modules/auth/reset-password';
import { ForgotPassword } from './modules/auth/forget-password';
import { CreateNewCourse } from './components/forms/CreateNewCourse';
import { AllCoursePage } from './pages/all-courses';
import { RegisterPage } from './pages/register.page';
import { VerifyOtp } from './modules/auth/verify-otp';
import AddCourse from './pages/add-course';
import { CourseCurriculum } from './components/forms/course-curriculum';
import { CourseDetail } from './pages/course-detail-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/courses',
    element: <AllCoursePage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '/verifyotp',
    element: <VerifyOtp />,
  },
  {
    path: '/forgetpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
  },
  {
    path: '/create-course',
    element: <CreateNewCourse />,
  },
  {
    path: '/add-course',
    element: <AddCourse />,
  },
  {
    path: '/coursedetail',
    // element: <Navbar />,
    element: <CourseDetail />,
  },
  {
    path: '/course-curriculum',
    element: <CourseCurriculum />,
  },
]);

export function Approuter() {
  return <RouterProvider router={router} />;
}
