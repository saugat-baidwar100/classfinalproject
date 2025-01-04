import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  logoSrc: string;
}

export const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="bg-custom-black text-white font-poppins py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <Link to="/">
              <img
                src={logoSrc}
                alt="SkillPrompt Logo"
                className="h-8 sm:h-10"
              />
            </Link>
            <p className="mt-4 text-xs sm:text-[16px] text-custom-white leading-relaxed">
              We aim to provide the best platform to learn the skills that are
              required to get the job in the current market and help individuals
              to build and succeed in their career.
            </p>
          </div>

          {/* Information Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-custom-teal text-sm sm:text-[18px] font-semibold mb-4">
              Information
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Web Development Column */}
          <div className="lg:col-span-2">
            <h3 className="text-custom-teal text-sm sm:text-[18px] font-semibold mb-4">
              Web Development
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/javascript"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  Javascript
                </Link>
              </li>
              <li>
                <Link
                  to="/react"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  React Js
                </Link>
              </li>
              <li>
                <Link
                  to="/python"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  Python
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover Column */}
          <div className="lg:col-span-2">
            <h3 className="text-custom-teal text-sm sm:text-[18px] font-semibold mb-4">
              Discover
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/teach"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  Teach on SkillPrompt
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-custom-white hover:text-custom-teal text-xs sm:text-[16px]"
                >
                  Plans and Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-custom-teal my-6 sm:my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs sm:text-[16px] text-custom-white text-center">
            © SkillPrompt Pvt Ltd. 2024. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6">
            <Link
              to="/about"
              className="text-xs sm:text-sm text-custom-white hover:text-custom-teal"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-xs sm:text-sm text-custom-white hover:text-custom-teal"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-xs sm:text-sm text-custom-white hover:text-custom-teal"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs sm:text-sm text-custom-white hover:text-custom-teal"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
