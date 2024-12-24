import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-4 py-2 rounded-md font-medium transition-colors mx-2 focus:outline-none focus-visible:ring focus-visible:ring-offset-2';
  const variantClasses =
    variant === 'default'
      ? 'bg-[#31b991] text-white font-poppins border border-[#31b991] hover:bg-emerald-600'
      : 'bg-white text-black font-poppins border border-[#31b991] hover:text-white hover:bg-[#31b991]';
  const responsiveClasses = 'sm:px-6 sm:py-2.5 text-sm sm:text-base';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${responsiveClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
