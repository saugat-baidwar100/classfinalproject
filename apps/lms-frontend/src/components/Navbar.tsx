import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-black p-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-red-500 px-4' : 'text-white px-4'
        }
      >
        Student
      </NavLink>
      <NavLink
        to="/instructor"
        className={({ isActive }) =>
          isActive ? 'text-red-500 px-4' : 'text-white px-4'
        }
      >
        Instructor
      </NavLink>
    </nav>
  );
};


