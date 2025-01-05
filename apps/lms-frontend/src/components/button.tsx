import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  'aria-label'?: string; // For accessibility
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  type = 'button', // Default to 'button' to avoid form submission issues
  ...props
}) => {
  const baseClasses =
    'px-2 py-1.5 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-xs';
  const variantClasses =
    variant === 'default'
      ? 'bg-[#31b991] text-white border border-[#31b991] hover:bg-emerald-600'
      : 'bg-white text-black border border-[#31b991] hover:text-white hover:bg-[#31b991]';
  const responsiveClasses =
    'sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-2.5 md:text-base w-full sm:w-auto font-poppins';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${responsiveClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
