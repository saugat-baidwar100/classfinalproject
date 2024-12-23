import {
  Input as NUIInput,
  InputProps as NUIInputProps,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
  label: ReactNode;
}

export function Input(props: InputProps) {
  return <NUIInput labelPlacement="outside" {...props} />;
}
