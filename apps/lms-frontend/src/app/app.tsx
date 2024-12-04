<<<<<<< HEAD
import { Course } from './Course';
import { Home } from './Home';
import NxWelcome from './nx-welcome';
import { Route, Routes } from 'react-router';
import { Button, NextUIProvider } from '@nextui-org/react';
import Counter from './counter';
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  NavLink,
} from 'react-router-dom';
export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/page-2',
      element: <Course />,
    },
  ]);
  return (
    <div>
      <NxWelcome title="lms-frontend" />

      {/* START: routes */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/page-2">Page 2</NavLink>
          </li>
          <li>
            <Link to="/counter">Counter</Link>{' '}
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
        <Route path="/counter" element={<Counter />} />{' '}
      </Routes>
      <NextUIProvider>
        <div>
          <Button color="primary">Click Me</Button>
        </div>
      </NextUIProvider>
      <RouterProvider router={router} />
    </div>
=======
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentDashoard from '../pages/Student';
import InstructorDashoard from '../pages/Instructor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Counter from '../components/Counter';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <StudentDashoard />
        <Counter />
      </>
    ),
  },
  {
    path: '/instructor',
    element: (
      <>
        <Navbar />
        <InstructorDashoard />
      </>
    ),
  },
]);

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
>>>>>>> 94bc266f6658a65dcbbfd75692e31a1c521d0dca
  );
}

export default App;
