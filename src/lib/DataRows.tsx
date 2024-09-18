import {memo, ReactNode} from 'react';
import {
  useRenderTrace,
  useData,
  useCell,
  RowData,
  CellName,
  useColumns,
  useRowId,
  useToggle,
} from './utils';
import {RowU} from './ui/RowU';
import {CellU} from './ui/CellU';
import {RowProvider} from './RowContext';
import {DataRowsU} from './ui/DataRowsU';
import {HeaderRow} from './HeaderRow';
import {SummaryRow} from './SummaryRow';

const LastCell = () => {
  return null;
};

const Cell = memo(function Cell_({name}: {name: CellName}) {
  const rowId = useRowId();
  const cell = useCell(name, rowId);
  const [editing, {on, off}] = useToggle(false);

  console.log('cell');
  useRenderTrace({name, cell, editing}, 'Cell');
  return (
    <>
      <CellU
        onClick={() => {
          if (cell.editable) {
            on();
          }
        }}
        column={cell.column}
      >
        {cell.value as ReactNode}
      </CellU>
      {!editing ? null : (
        <input
          defaultValue={cell.value as string}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              off();
              cell.onEdit(e.currentTarget.value);
            }
          }}
        />
      )}
    </>
  );
});

const Row = memo(function Row_({
  rowId,
  rowData,
}: {
  rowId: string;
  rowData: RowData;
}) {
  const columns = useColumns();

  useRenderTrace({rowId, columns}, 'Row');
  return (
    <RowProvider rowId={rowId} rowData={rowData} columns={columns}>
      <RowU>
        {columns.map(({name}) => (
          <Cell key={name} name={name} />
        ))}
        <LastCell />
      </RowU>
    </RowProvider>
  );
});

export const DataRows = memo(function DataRow_() {
  const data = useData();

  return (
    <DataRowsU>
      <HeaderRow />
      {Object.keys(data).map((rowId) => (
        <Row key={rowId} rowId={rowId} rowData={data[rowId]} />
      ))}
      <SummaryRow />
    </DataRowsU>
  );
});
