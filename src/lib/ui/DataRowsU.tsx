import {ReactNode} from 'react';
import './DataRowsU.css';

export const DataRowsU = ({children}: {children: ReactNode}) => {
  return <div className="data-rows">{children}</div>;
};
