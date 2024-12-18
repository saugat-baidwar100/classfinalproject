// import {
//   Input as NUIInput,
//   InputProps as NUIInputProps,
// } from '@nextui-org/react';
// import { ReactNode } from 'react';

// interface InputProps extends Omit<NUIInputProps, 'labelPlacement'> {
//   label: ReactNode;
// }

// export function Input(props: InputProps) {
//   return <NUIInput labelPlacement="outside" {...props} />;
// }

import {
  InputProps as NUIInputProps,
  Input as NUIInput,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface InputProps extends NUIInputProps {
  label: ReactNode;
  
}

export function Input(props: InputProps) {
  return (
    <NUIInput
      
      
      isRequired
      {...props}
    />
  );
}
