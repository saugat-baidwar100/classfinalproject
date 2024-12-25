import {
  Input as NUIInput,
  InputProps as NUIInputProps,
} from '@nextui-org/react';
import { ReactNode } from 'react';
import { extendVariants } from '@nextui-org/react';

interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
  label: ReactNode;
}

export function Input(props: InputProps) {
  return <NUIInput labelPlacement="outside" {...props} />;
}

export const MyInput = extendVariants(NUIInput, {
  variants: {
    color: {
      white: {
        // Custom white background and black text variant
        inputWrapper: [
          'bg-white',
          'border',

          'transition-colors',
          'data-[hover=true]:border-blue-500', // Border turns blue on hover
          'focus-within:border-blue-700', // Border stays blue when focused
          'focus-within:ring-2',
          'focus-within:ring-blue-700', // Blue ring on focus
          'data-[hover=true]:bg-white',
          'group-data-[focus=true]:border-blue-7700',
        ],
        input: ['text-black', 'placeholder:text-gray-500'],
      },
    },
    size: {
      sm: {
        inputWrapper: 'h-8 min-h-8 px-2',
        input: 'text-sm',
      },
      lg: {
        inputWrapper: 'h-12 min-h-12 px-4',
        input: 'text-lg',
      },
    },
    radius: {
      md: {
        inputWrapper: 'rounded-md',
      },
      lg: {
        inputWrapper: 'rounded-lg',
      },
    },
    textSize: {
      sm: {
        input: 'text-sm',
      },
      lg: {
        input: 'text-lg',
      },
    },
    removeLabel: {
      true: {
        label: 'hidden',
      },
      false: {},
    },
  },
  defaultVariants: {
    color: 'white',
    size: 'lg',
    radius: 'md',
    textSize: 'lg',
    removeLabel: true,
  },
});
