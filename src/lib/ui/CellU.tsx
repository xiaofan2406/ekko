import {HTMLAttributes, DetailedHTMLProps} from 'react';
import './CellU.css';
import {Column} from '../utils';

type CellUProps = {
  column: Column;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CellU = ({children, column, ...rest}: CellUProps) => {
  return (
    <div
      className={`cell ${column.sticky ? 'sticky' : ''}`}
      style={column.width ? {width: column.width} : {}}
      {...rest}
    >
      {children}
    </div>
  );
};
