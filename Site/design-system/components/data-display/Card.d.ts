import { ReactNode, CSSProperties } from 'react';
export interface CardProps {
  children: ReactNode;
  padding?: number | string;
  elevated?: boolean;
  style?: CSSProperties;
}
