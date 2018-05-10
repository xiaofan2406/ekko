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

  handleRowChange = (handler: CellChangeHandler) => {
    const { id, onRowChange, data } = this.props;
    onRowChange(id, handler(data));
  };

  render() {
    const { columns, data } = this.props;
    console.log('[Row]: render');

    // TODO maybe cell props validation happens here
    return columns.map((column, index) => (
      <Cell
        key={column.props.name}
        value={column.props.getter(data)}
        render={column.props.render}
        updater={column.props.updater}
        editor={column.props.editor}
        editorDisplay={column.props.editorDisplay}
        handleRowChange={this.handleRowChange}
        index={index}
      />
    ));
  }
}

export default Row;
