// Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  logoSrc: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-custom-black text-custom-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-3 md:py-4 flex justify-between items-center font-poppins relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <button onClick={() => navigate('/')}>
          <img
            src={logoSrc}
            alt="Logo"
            className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto mr-2 sm:mr-3"
          />
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <button
          className="text-base lg:text-medium-size text-custom-teal border-b-2 border-custom-teal pb-1 font-semibold"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="text-base lg:text-medium-size hover:text-custom-teal transition-colors duration-300 font-medium"
          onClick={() => navigate('/courses')}
        >
          Courses
        </button>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-5">
        <button
          className="border-2 border-custom-teal text-sm sm:text-base lg:text-small-size text-custom-teal px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-semibold hover:text-custom-white hover:bg-custom-teal transition duration-300"
          onClick={() => navigate('/auth/login')}
        >
          Login
        </button>
        <button
          className="bg-custom-teal px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg font-semibold text-sm sm:text-base lg:text-small-size text-custom-white hover:bg-custom-teal transition duration-300"
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-custom-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isMenuOpen ? 'rotate-90' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-custom-teal text-custom-white flex flex-col items-center space-y-4 py-4 md:hidden font-poppins transition-all duration-300 z-50 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          className="text-custom-teal font-medium"
          onClick={() => {
            navigate('/');
            setIsMenuOpen(false);
          }}
        >
          Home
        </button>
        <button
          className="hover:text-custom-teal transition duration-300 font-medium"
          onClick={() => {
            navigate('/courses');
            setIsMenuOpen(false);
          }}
        >
          Courses
        </button>
        <button
          className="border-1 border-custom-teal text-custom-teal px-5 py-1.5 rounded-lg font-semibold hover:text-custom-white hover:bg-custom-teal transition duration-300"
          onClick={() => {
            navigate('/login');
            setIsMenuOpen(false);
          }}
        >
          Login
        </button>
        <button
          className="bg-custom-teal px-5 py-1.5 rounded-lg font-semibold text-white hover:bg-custom-teal transition duration-300"
          onClick={() => {
            navigate('/signup');
            setIsMenuOpen(false);
          }}
        >
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;