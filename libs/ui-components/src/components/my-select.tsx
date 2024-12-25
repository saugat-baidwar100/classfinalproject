import {
  Select,
  SelectItem,
  SelectProps as NUISelectProps,
} from '@nextui-org/react';
import { ReactNode } from 'react';

type TOption = {
  key: string;
  label: string;
};

interface SelectProps
  extends Omit<NUISelectProps, 'labelPlacement' | 'children'> {
  label: ReactNode;
  options: TOption[];
}

export function MySelect(props: SelectProps) {
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      <Select labelPlacement="outside" {...props}>
        {props.options.map((opt) => (
          <SelectItem key={opt.key}>{opt.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
