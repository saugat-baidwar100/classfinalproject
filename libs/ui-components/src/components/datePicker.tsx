import {
  DatePickerProps as NUIDatePickerProps,
  DatePicker as NUIDatePicker,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface DatePickerProps extends Omit<NUIDatePickerProps, 'labelPlacement'> {
  label: ReactNode;
}

export function DatePicker(props: DatePickerProps) {
  return <NUIDatePicker  labelPlacement="outside-left" {...props} />;
}
