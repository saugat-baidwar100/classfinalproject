import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  logoSrc: string;
}

export const Footer: React.FC<FooterProps> = ({ logoSrc }) => {
  return (
    <footer className="bg-custom-black text-white font-poppins py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <Link to="/">
              <img src={logoSrc} alt="SkillPrompt Logo" className="h-10 sm:h-12" />
            </Link>
            <p className="mt-6 text-sm sm:text-base text-custom-white leading-relaxed">
              We aim to provide the best platform to learn the skills <br />
              that are required to get the job in the current market and <br />
              help individuals to build and succeed in their career.
            </p>
          </div>

          {/* Information Column */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-custom-teal text-[16px] sm:text-[18px] font-semibold mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Web Development Column */}
          <div className="md:col-span-2">
            <h3 className="text-custom-teal text-[16px] sm:text-[18px] font-semibold mb-4">
              Web Development
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/javascript"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  Javascript
                </Link>
              </li>
              <li>
                <Link
                  to="/react"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  React Js
                </Link>
              </li>
              <li>
                <Link
                  to="/python"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  Python
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover Column */}
          <div className="md:col-span-2">
            <h3 className="text-custom-teal text-[16px] sm:text-[18px] font-semibold mb-4">
              Discover
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/teach"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  Teach on SkillPrompt
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-custom-white hover:text-custom-teal text-sm sm:text-base"
                >
                  Plans and Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-custom-teal my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm sm:text-base text-custom-white text-center">
            © SkillPrompt Pvt Ltd. 2024. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            <Link
              to="/about"
              className="text-[14px] sm:text-base text-custom-white hover:text-custom-teal"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-[14px] sm:text-base text-custom-white hover:text-custom-teal"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-[14px] sm:text-base text-custom-white hover:text-custom-teal"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[14px] sm:text-base text-custom-white hover:text-custom-teal"
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
