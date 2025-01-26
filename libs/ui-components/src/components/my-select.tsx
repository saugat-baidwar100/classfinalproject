import {
  Select as NUISelect,
  SelectItem,
  SelectProps as NUISelectProps,
} from '@nextui-org/react';
import { ReactNode, forwardRef } from 'react';

type TOption = {
  key: string;
  label: string;
};

interface SelectProps
  extends Omit<NUISelectProps, 'labelPlacement' | 'children'> {
  label: ReactNode;
  options: TOption[];
}

// Using forwardRef for MySelect
function SelectWithRef(props: SelectProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div ref={ref}>
      <NUISelect labelPlacement="outside" {...props}>
        {props.options.map((opt) => (
          <SelectItem key={opt.key}>{opt.label}</SelectItem>
        ))}
      </NUISelect>
    </div>
  );
}

export const Select = forwardRef(SelectWithRef);
