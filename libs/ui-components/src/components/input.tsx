import {
  Input as NUIInput,
  InputProps as NUIInputProps,
} from '@nextui-org/react';
import { forwardRef, ReactNode } from 'react';

interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
  label: React.ReactNode;
  errorMessage?: React.ReactNode;
  endContent?: ReactNode; // Add this for rendering custom elements
}

function InputWithRef(
  { endContent, errorMessage, ...props }: InputProps,
  ref: any
) {
  return (
    <div>
      <NUIInput
        labelPlacement="outside"
        ref={ref}
        {...props}
        endContent={endContent} // Pass endContent to the Input
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

export const Input = forwardRef(InputWithRef);
