import { ChangeEventHandler } from 'react';
export interface RadioProps {
  label?: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  disabled?: boolean;
}
