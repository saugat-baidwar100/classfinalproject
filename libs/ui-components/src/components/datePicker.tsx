import { DatePicker as NUIDatePicker ,DatePickerProps as NUIDatePickerProps} from '@nextui-org/react';
import { ReactNode } from 'react';
interface DatePickerProps extends NUIDatePickerProps{
    label?:string
    description?:ReactNode
    errorMassage?:string
}

export function DatePicker({label,description,errorMessage, ...props}:DatePickerProps) {
  return <NUIDatePicker {...props}/>;
}
