import {
  Button as NUIButton,
  ButtonProps as NUIButtonProps,
} from '@nextui-org/react';

interface ButtonProps extends NUIButtonProps {
  name: string;
}

export function Button(props: ButtonProps) {
  return <NUIButton {...props}>{props.name}</NUIButton>;
}
