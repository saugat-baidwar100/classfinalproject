// MyReusableSelect.tsx
import { extendVariants, Select } from '@nextui-org/react';

export const MySelect = extendVariants(Select, {
  variants: {
    color: {
      default: {
        trigger: [
          'bg-white',
          'border',
          'transition-colors',
          'data-[hover=true]:border-blue-500', // Border turns blue on hover
          'focus-within:border-blue-500', // Border turns blue on focus
          'focus-within:ring-2',
          'focus-within:ring-blue-500', // Blue ring on focus
          'text-black',
          'placeholder:text-gray-500',
          'px-4',
          'py-2',
          'rounded-md',
        ],
      },
    },
    error: {
      true: {
        trigger: 'border-red-500', // Red border for error state
      },
      false: {
        trigger: 'border-customGray', // Default border color
      },
    },
    size: {
      md: {
        trigger: 'text-base',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    error: false,
    size: 'md',
  },
});
