// MyReusableOption.tsx
import React from 'react';

interface MyReusableOptionProps {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
}

export const MyOption: React.FC<MyReusableOptionProps> = ({
  value,
  children,
  selected = false,
}) => {
  return (
    <option
      value={value}
      className={`px-4 py-2 rounded-md cursor-pointer ${
        selected ? 'bg-blue-500 text-white font-semibold' : 'text-black'
      } hover:bg-blue-100 hover:text-blue-600`}
    >
      {children}
    </option>
  );
};
