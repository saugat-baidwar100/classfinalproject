import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from './pages/home';

import { LoginPage } from './pages/login-page';

import { ResetPassword } from './modules/auth/reset-password';
import { ForgotPassword } from './modules/auth/forget-password';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        {/* <Navbar/> */}
        <Home />
      </>
    ),
  },
  {
    path: '/instructor',
    // element: <Navbar />,
  },

  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/forgetpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
  },
]);
function Approuter() {
  return <RouterProvider router={router} />;
}

