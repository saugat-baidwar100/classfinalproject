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
            className="h-6 sm:h-8 md:h-10 w-auto mr-2 sm:mr-3"
          />
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <button
          className="text-sm lg:text-medium-size text-custom-teal border-b-2 border-custom-teal pb-1 font-semibold"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="text-sm lg:text-medium-size hover:text-custom-teal transition-colors duration-300 font-medium"
          onClick={() => navigate('/courses')}
        >
          Courses
        </button>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
        <button
          className="border-2 border-custom-teal text-xs sm:text-sm lg:text-base text-custom-teal px-3 lg:px-4 py-1 lg:py-1.5 rounded-lg font-semibold hover:text-custom-white hover:bg-custom-teal transition duration-300"
          onClick={() => navigate('/auth/login')}
        >
          Login
        </button>
        <button
          className="bg-custom-teal px-3 lg:px-4 py-1 lg:py-1.5 rounded-lg font-semibold text-xs sm:text-sm lg:text-base text-custom-white hover:bg-custom-teal transition duration-300"
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
        className={`absolute top-full left-0 w-full bg-custom-teal text-custom-white flex flex-col items-center py-6 md:hidden font-poppins transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'
        } z-50`}
      >
        {/* Centered Image */}
        <div className="flex justify-center items-center mb-4">
          <img
            src={logoSrc}
            alt="Menu Logo"
            className="w-16 h-16 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Menu Items */}
        <button
          className="text-base font-medium hover:bg-[#2ca386] hover:scale-105 transition-all px-4 py-2 rounded-lg w-11/12 text-center mb-2"
          onClick={() => {
            navigate('/');
            setIsMenuOpen(false);
          }}
        >
          Home
        </button>
        <button
          className="text-base font-medium hover:bg-[#2ca386] hover:scale-105 transition-all px-4 py-2 rounded-lg w-11/12 text-center mb-2"
          onClick={() => {
            navigate('/courses');
            setIsMenuOpen(false);
          }}
        >
          Courses
        </button>
        <button
          className="text-base font-medium border-2 border-white hover:bg-white hover:text-custom-teal transition-all px-4 py-2 rounded-lg w-11/12 text-center mb-2"
          onClick={() => {
            navigate('/auth/login');
            setIsMenuOpen(false);
          }}
        >
          Login
        </button>
        <button
          className="text-base font-medium bg-white text-custom-teal hover:bg-[#2ca386] hover:text-white transition-all px-4 py-2 rounded-lg w-11/12 text-center"
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

