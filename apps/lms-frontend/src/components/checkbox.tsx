import { Checkbox } from '@nextui-org/react';
type T = {
  title: string;
};

export const CheckBoxInput = ({ title }: T) => {
  return <Checkbox>{title}</Checkbox>;
};
