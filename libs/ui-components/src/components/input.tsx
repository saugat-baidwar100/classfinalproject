import {
  Input as NUIInput,
  InputProps as NUIInputProps,
} from '@nextui-org/react';
import { error } from 'console';

import { forwardRef, ReactNode } from 'react';

interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
  label: React.ReactNode;
  errorMessage: React.ReactNode;
}

function InputWithRef(props: InputProps, ref: any) {
  return <NUIInput labelPlacement="outside" ref={ref} {...props} />;
}

export const Input = forwardRef(InputWithRef);
