/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.Component<RowProps> {
  handleRowChange = (handler: CellChangeHandler) => {
    const { id, onRowChange, data } = this.props;
    onRowChange(id, handler(data));
  };

  render() {
    const { id, children, data } = this.props;
    console.log('render Row', id);
    return React.Children.map(children, child => (
      <Cell
        value={child.props.getter(data)}
        updater={child.props.updater}
        formatter={child.props.formatter}
        editor={child.props.editor}
        editorDisplay={child.props.editorDisplay}
        handleRowChange={this.handleRowChange}
      />
    ));
  }
}

export default Row;
