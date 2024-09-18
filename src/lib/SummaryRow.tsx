import {memo} from 'react';
import {
  useColumns,
  useSlice,
  GridState,
  Summary,
  summaryCount,
  summarySum,
  summaryUnique,
} from './utils';
import {RowU} from './ui/RowU';
import {CellU} from './ui/CellU';

function getSummaryFunc(summary: Summary) {
  switch (summary) {
    case 'Unique':
      return summaryUnique;
    case 'Sum':
      return summarySum;
    case 'Count':
      return summaryCount;
    default:
      return summary;
  }
}

export const SummaryRow = memo(function SummaryRow_() {
  const columns = useColumns();
  const gridState: GridState = useSlice();

  return (
    <RowU>
      {columns.map((column) => {
        if (!column.summary) return <CellU key={column.name} column={column} />;

        const summaryFn = getSummaryFunc(column.summary);
        const result = summaryFn({
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
