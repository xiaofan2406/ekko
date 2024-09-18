import {memo} from 'react';
import {useColumns, useSlice, GridState} from './utils';
import {RowU} from './ui/RowU';
import {CellU} from './ui/CellU';

export const HeaderRow = memo(function HeaderRow_() {
  const columns = useColumns();
  const gridState: GridState = useSlice();

  return (
    <RowU>
      {columns.map((column) => {
        if (!column.summary) return <CellU key={column.name} column={column} />;

        const headerFn = column.header ?? (() => column.name);
        const result = headerFn({
          column,
          values: Object.keys(gridState.rows).map((rowId) => {
            const rowState = gridState.rows[rowId];
            return rowState.cells[column.name].value;
          }),
        });
        return (
          <CellU key={column.name} column={column}>
            {result}
          </CellU>
        );
      })}
    </RowU>
  );
});
