import { ReactNode, MouseEventHandler } from 'react';
export interface TagProps {
  children: ReactNode;
  onRemove?: MouseEventHandler;
}
