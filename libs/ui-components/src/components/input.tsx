import {
  Input as NUIInput,
  InputProps as NUIInputProps,
} from '@nextui-org/react';

import { forwardRef } from 'react';

interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
  label: React.ReactNode;
  errorMessage: React.ReactNode;
}

function InputWithRef(props: InputProps, ref: React.Ref<HTMLInputElement>) {
  return <NUIInput labelPlacement="outside" ref={ref} {...props} />;
}

export const Input = forwardRef(InputWithRef);
