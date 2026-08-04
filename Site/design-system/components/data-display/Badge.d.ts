import { ReactNode } from 'react';
export interface BadgeProps {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'gold';
  children: ReactNode;
}
