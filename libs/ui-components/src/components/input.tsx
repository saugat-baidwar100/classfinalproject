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

function InputWithRef(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  return <NUIInput labelPlacement="outside" ref={ref} {...props} />;
}

export const Input = forwardRef(InputWithRef);
