// import {
//   Input as NUIInput,
//   InputProps as NUIInputProps,
// } from '@nextui-org/react';
// import { ReactNode } from 'react';

// interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
//   label: ReactNode;
// }

// export function Input(props: InputProps) {
//   return (
//     <NUIInput
//       className="focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500"
//       labelPlacement="outside"
//       {...props}
//     />
//   );
// }

// // MyInput.tsx
// import { extendVariants, Input } from '@nextui-org/react';

// export const MyInput = extendVariants(Input, {
//   variants: {
//     // <- modify/add variants
//     color: {
//       stone: {
//         inputWrapper: [
//           // <- Input wrapper slot
//           'bg-white',
//           'border',
//           'w-full',

//           'focus-outline:outline-none',
//           'focus:ring-2',
//           'focus:ring-blue-500',
//           'rounded-md',
//         ],
//         input: [
//           // <- Input element slot
//           'text-black',
//           'placeholder:text-gray-500',
//         ],
//       },
//     },
//     size: {
//       xl: {
//         inputWrapper: 'h-14 min-h-14',
//         input: 'text-medium',
//       },
//     },
//     radius: {
//       md: {
//         inputWrapper: 'rounded-md',
//       },
//     },
//     textSize: {},
//   },
//   defaultVariants: {
//     color: 'stone',
//   },
// });
// // MyCustomInput.tsx
import { extendVariants, Input } from '@nextui-org/react';

export const MyInput = extendVariants(Input, {
  variants: {
    color: {
      white: {
        // Custom white background and black text variant
        inputWrapper: [
          'bg-white',
          'border',
          'shadow',
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
