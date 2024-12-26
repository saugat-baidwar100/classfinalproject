import {
  Textarea as NUITextarea,
  TextAreaProps as NUITextareaProps,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface TextAreaProps extends Omit<NUITextareaProps, 'labelPlacement'> {
  label: ReactNode;
  rows: number;
}

export function TextArea(props: TextAreaProps) {
  return <NUITextarea labelPlacement="outside" {...props} />;
}
