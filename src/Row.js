/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.Component<RowProps> {
  handleRowChange = handler => {
    const { id, onRowChange, data } = this.props;
    onRowChange(id, handler(data));
  };

  render() {
    const { id, children, data } = this.props;
    console.log('render Row', id);
    return (
      <div className="this-is-a-row">
        {React.Children.map(children, child => (
          <Cell
            value={child.props.valueGetter(data)}
            onChange={child.props.onChange}
            handleRowChange={this.handleRowChange}
            editor={child.props.editor}
          />
        ))}
      </div>
    );
  }
}

export default Row;
