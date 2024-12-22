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
  const baseClasses = 'px-6 py-2.5 rounded-md font-medium transition-colors mx-2';
  const variantClasses = variant === 'default' 
    ? 'bg-[#31b991] text-white font-poppins border border-[#31b991]' 
    : 'bg-white text-black font-poppins border border-[#31b991] hover:text-white hover:bg-[#31b991]';

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};