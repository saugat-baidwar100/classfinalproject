import { Checkbox } from '@nextui-org/react';
type T = {
  title: string;
};

export const CheckBoxInput = ({ title }: T) => {
  return (
    <div >
      <Checkbox>
        <span className="text-lg font-poppins">{title}</span>
      </Checkbox>
    </div>
  );
};
