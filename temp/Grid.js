import React from 'react';
import { useWhyDidYouUpdate } from './hooks';
// import PropTypes from 'prop-types';

const Cell = props => {
  console.log('Cell');
  const { rowData, column, onChange, rowKey } = props;

  const cellValue = column.getter(rowData);

  const handleCellChange = newValue => {
    onChange({
      [rowKey]: {
        ...rowData,
        ...column.updater(newValue),
      },
    });
  };

  return (
    <input
      defaultValue={cellValue}
      onChange={event => {
        handleCellChange(event.target.value);
      }}
    />
  );
};

const areCellPropsEqual = (prev, next) => {
  if (prev.column !== next.column) {
    console.log('column diff');
    return true;
  }

  if (prev.rowData !== next.rowData) {
    console.log('row data diff');

    return next.column.memoizer(prev.rowData, next.rowData);
  }

  return false;
};

const CellM = React.memo(Cell, areCellPropsEqual);

const Row = props => {
  const { rowData, rowKey, columns, onChange } = props;
  useWhyDidYouUpdate('Row', props);

  return (
    <div>
      {Object.keys(columns).map(columnKey => {
        return (
          <CellM
            key={columnKey}
            rowKey={rowKey}
            rowData={rowData}
            column={columns[columnKey]}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

const RowM = React.memo(Row);

const Grid = ({ columns, useData, useDataChange }) => {
  console.log('Grid');
  const data = useData();
  const onChange = useDataChange();
  return (
    <div>
      {Object.keys(data).map(rowKey => (
        <RowM
          rowData={data[rowKey]}
          onChange={onChange}
          key={rowKey}
          rowKey={rowKey}
          columns={columns}
        />
      ))}
    </div>
  );
};

// Grid.propTypes = {}

export default Grid;
