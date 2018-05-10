/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.PureComponent<RowProps> {
  componentWillReceiveProps(nextProps: RowProps) {
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`\t[Row]: Prop ${key} changed`);
      }
    });
  }

  handleRowChange = (value: mixed, updater: CellUpdater) => {
    const { id, onRowChange, data } = this.props;
    if (onRowChange) {
      onRowChange(id, updater(value, data));
    }
  };

  render() {
    const { columns, data } = this.props;
    console.log('[Row]: render');

    return columns.map(column => (
      <Cell
        key={column.name}
        value={column.getter(data)}
        render={column.render}
        updater={column.updater}
        editor={column.editor}
        editorDisplay={column.editorDisplay}
        onCellUpdate={this.handleRowChange}
      />
    ));
  }
}

export default Row;
