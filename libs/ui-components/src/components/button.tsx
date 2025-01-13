import {
  Button as NUIButton,
  ButtonProps as NUIButtonProps,
} from '@nextui-org/react';
import React from 'react';

interface ButtonProps extends NUIButtonProps {
  name: string;
  icon?: React.ReactNode;
}

export function Button({ name, icon, ...props }: ButtonProps) {
  return (
    <NUIButton {...props}>
      {icon && <span>{icon}</span>}
      {name}
    </NUIButton>
  );
}
