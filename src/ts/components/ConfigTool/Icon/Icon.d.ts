import { ReactElement } from 'react';

export interface IconComponent {
  type: string;
}
export type IconsList = {
  [iconName: string]: ReactElement;
}
