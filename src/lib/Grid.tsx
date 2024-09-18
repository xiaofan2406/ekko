import {ReactNode} from 'react';
import {useRenderTrace, Column, Data, SetData} from './utils';
import {GridU} from './ui/GridU';
import {GridProvider} from './GridContext';
import {DataRows} from './DataRows';

function setDataDefault() {
  throw new Error(`'setData' is required to edit`);
}

export const Grid = ({
  data,
  setData = setDataDefault,
  columns,
  toolbar,
  children,
}: {
  data: Data;
  setData: SetData;
  columns: Column[];
  toolbar?: ReactNode;
  children?: ReactNode;
}) => {
  useRenderTrace({data, setData, columns, children}, 'Grid');
  return (
    <GridProvider data={data} setData={setData} columns={columns}>
      <GridU>
        {toolbar}
        <DataRows />
        {children}
      </GridU>
    </GridProvider>
  );
};
