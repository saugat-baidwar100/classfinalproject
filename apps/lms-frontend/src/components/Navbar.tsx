import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  logoSrc: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#000000] text-[#ffffff] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-3 md:py-4 flex justify-between items-center font-poppins relative">
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
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <button
          className="text-medium-size text-[#31B991] border-b-2 border-[#31B991] pb-1 font-semibold"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="text-medium-size hover:text-[#31b991] transition-colors duration-300 font-medium"
          onClick={() => navigate('/courses')}
        >
          Courses
        </button>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
        <button
          className="border-2 border-[#31b991] text-small-size text-[#31b991] px-3 lg:px-4 py-1 lg:py-2 rounded-lg font-semibold hover:text-[#ffffff] hover:bg-[#31b991] transition duration-300"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="bg-[#31b991] px-3 lg:px-4 py-1 lg:py-2 rounded-lg font-semibold text-small-size text-[#ffffff] hover:bg-[#289675] transition duration-300"
          onClick={() => navigate('/signup')}
        >
          Signup
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#ffffff] focus:outline-none"
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
        className={`absolute top-16 left-0 w-full bg-[#000000] text-[#ffffff] flex flex-col items-center space-y-3 py-4 md:hidden font-poppins transition-all duration-300 z-50 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          className="text-[#31b991] font-medium"
          onClick={() => {
            navigate('/');
            setIsMenuOpen(false);
          }}
        >
          Home
        </button>
        <button
          className="hover:text-[#31b991] transition duration-300 font-medium"
          onClick={() => {
            navigate('/courses');
            setIsMenuOpen(false);
          }}
        >
          Courses
        </button>
        <button
          className="border-2 border-[#31b991] text-[#31b991] px-4 py-1 rounded-lg font-semibold hover:text-[#ffffff] hover:bg-[#31b991] transition duration-300"
          onClick={() => {
            navigate('/login');
            setIsMenuOpen(false);
          }}
        >
          Login
        </button>
        <button
          className="bg-[#31b991] px-4 py-1 rounded-lg font-semibold text-white hover:bg-[#289675] transition duration-300"
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
