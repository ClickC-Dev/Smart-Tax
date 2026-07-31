import { ReactNode, MouseEventHandler } from 'react';
export interface DialogProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose?: MouseEventHandler;
  actions?: ReactNode;
}
