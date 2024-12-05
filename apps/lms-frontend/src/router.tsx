
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './pages/login-page';
import { Home } from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />

        <LoginPage/>
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
]);
function Approuter() {
  return <RouterProvider router={router} />;
}
export default Approuter;
