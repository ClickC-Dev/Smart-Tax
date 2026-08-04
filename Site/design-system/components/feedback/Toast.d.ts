import { ReactNode, MouseEventHandler } from 'react';
export interface ToastProps {
  tone?: 'success' | 'warning' | 'danger' | 'neutral';
  children: ReactNode;
  onClose?: MouseEventHandler;
}
