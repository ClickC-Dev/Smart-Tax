import { CSSProperties, ChangeEventHandler, ReactNode } from 'react';
export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  prefix?: ReactNode;
  style?: CSSProperties;
}
