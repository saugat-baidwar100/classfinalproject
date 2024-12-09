import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from './pages/home';
import ForgotPassword from './modules/auth/forget-password';
import { ResetPassword } from './modules/auth/reset-password';
import { Navbar } from '@nextui-org/react';
import { LoginPage } from './pages/login-page';
import { OTP } from './modules/auth/otp';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />

        <LoginPage />
      </>
    ),
  },
  {
    path: '/instructor',
    element: <Navbar />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgetpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
  {
    path: '/otp',
    element: <OTP />,
  },
]);
function Approuter() {
  return <RouterProvider router={router} />;
}
export default Approuter;
