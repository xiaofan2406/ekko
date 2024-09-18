import {ReactNode} from 'react';
import './RowU.css';

export const RowU = ({children}: {children: ReactNode}) => {
  return <div className="row">{children}</div>;
};
