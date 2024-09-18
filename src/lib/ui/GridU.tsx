import {ReactNode} from 'react';
import './GridU.css';

export const GridU = ({children}: {children: ReactNode}) => {
  return <div className="grid">{children}</div>;
};
