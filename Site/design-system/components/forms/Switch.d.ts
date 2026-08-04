import { ChangeEventHandler } from 'react';
export interface SwitchProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  disabled?: boolean;
}
