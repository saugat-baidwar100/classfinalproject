import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoSrc: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
  ];

  const getNavItemClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm lg:text-[20px] transition-colors duration-300 ${
      location.pathname === path
        ? 'text-custom-teal font-semibold'
        : 'text-custom-white hover:text-custom-teal'
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-custom-black text-custom-white py-2 md:py-3 lg:py-4 font-poppins transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-teal rounded-md"
        >
          <img
            src={logoSrc}
            alt="Logo"
            className="h-8 sm:h-10 md:h-12 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={getNavItemClass(item.path)}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <button
            className="border-2 border-[#31B991] text-[#31B991] px-3 py-1.5 rounded-md text-sm lg:text-base font-semibold hover:bg-[#31B991] hover:text-custom-white transition duration-300"
            onClick={() => navigate('/auth/login')}
          >
            Login
          </button>
          <button
            className="bg-[#3EBD98] text-custom-white px-3 py-1.5 rounded-md text-sm lg:text-base font-semibold hover:bg-[#289675]  transition duration-300"
            onClick={() => navigate('/auth/register')}
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-custom-white focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-teal rounded-md"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-custom-black absolute left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`text-left px-3 py-2 rounded-md text-base transition-colors duration-300 ${
                location.pathname === item.path
                  ? 'text-custom-teal font-semibold'
                  : 'text-custom-white hover:text-custom-teal'
              }`}
              onClick={() => {
                navigate(item.path);
                closeMenu();
              }}
            >
              {item.name}
            </button>
          ))}
          <button
            className="w-full border-2 border-[#31B991] text-[#31B991] px-3 py-2 rounded-md text-base font-semibold hover:bg-[#31B991] hover:text-custom-white transition duration-300"
            onClick={() => {
              navigate('/auth/login');
              closeMenu();
            }}
          >
            Login
          </button>
          <button
            className="w-full bg-[#3EBD98] text-custom-white px-3 py-2 rounded-md text-base font-semibold hover:bg-custom-teal-dark transition duration-300"
            onClick={() => {
              navigate('/auth/register');
              closeMenu();
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
