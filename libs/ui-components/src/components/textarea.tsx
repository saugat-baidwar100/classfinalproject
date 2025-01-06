// import {
//   Textarea as NUITextarea,
//   TextAreaProps as NUITextareaProps,
// } from '@nextui-org/react';
// import { ReactNode } from 'react';

// interface TextAreaProps extends Omit<NUITextareaProps, 'labelPlacement'> {
//   label: ReactNode;
//   rows: number;
//   errorMessage: React.ReactNode;
// }

// export function TextArea(props: TextAreaProps) {
//   return <NUITextarea labelPlacement="outside" {...props} />;
// }

import React, { forwardRef, ReactNode } from 'react';
import {
  Textarea as NUITextarea,
  TextAreaProps as NUITextareaProps,
} from '@nextui-org/react';

interface TextAreaProps extends Omit<NUITextareaProps, 'labelPlacement'> {
  label: ReactNode;
  rows: number;
  errorMessage: React.ReactNode;
}

function TextareaWithRef({ label, rows, ...props }: TextAreaProps, ref: any) {
  return (
    <NUITextarea
      labelPlacement="outside"
      label={label}
      rows={rows}
      ref={ref}
      {...props}
    />
  );
}

export const TextArea = forwardRef(TextareaWithRef);
