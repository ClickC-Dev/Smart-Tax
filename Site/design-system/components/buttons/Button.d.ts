import { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'gold' | 'secondary' | 'ghost' | 'outlineInverse';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
}
