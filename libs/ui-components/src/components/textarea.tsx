// import {
//   Textarea as NUITextarea,
//   TextAreaProps as NUITextareaProps,
// } from '@nextui-org/react';
// import { ReactNode } from 'react';

// interface TextAreaProps extends Omit<NUITextareaProps, 'labelPlacement'> {
//   label: ReactNode;
//   rows: number;
// }

// export function TextArea(props: TextAreaProps) {
//   return <NUITextarea labelPlacement="outside" {...props} />;
// }

// MyReusableTextArea.tsx
import { extendVariants, Textarea } from '@nextui-org/react';

export const MyTextArea = extendVariants(Textarea, {
  variants: {
    color: {
      default: {
        inputWrapper: [
          'bg-white',
          'border',
          'transition-colors',
          'data-[hover=true]:border-blue-500', // Border turns blue on hover
          'focus-within:border-blue-500', // Border turns blue on focus
          'focus-within:ring-2',
          'focus-within:ring-blue-500', // Blue ring on focus
        ],
        input: [
          'text-black',
          'placeholder:text-gray-500',
          'px-4',
          'py-2',
          'w-full',
          'rounded-md',
        ],
      },
    },
    error: {
      true: {
        inputWrapper: 'border-red-500', // Red border for error state
      },
      false: {
        inputWrapper: 'border-gray-500',
      },
    },
    size: {
      md: {
        inputWrapper: 'h-auto',
        input: 'text-base',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    error: false,
    size: 'md',
  },
});
