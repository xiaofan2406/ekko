/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.Component<RowProps> {
  render() {
    const { id, children, onRowChange, data } = this.props;
    console.log('render Row', id);
    return (
      <div className="this-is-a-row">
        {React.Children.map(children, child => (
          <Cell
            data={child.props.valueGetter(data)}
            onChange={newValue =>
              onRowChange(id, child.props.onChange(newValue, data))
            }
            editor={child.props.editor}
          />
        ))}
      </div>
    );
  }
}

export default Row;
