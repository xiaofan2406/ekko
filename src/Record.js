/* eslint-disable */
/* @flow */
import React from 'react';
import Cell from './Cell';

class Record extends React.Component<RecordProps> {
  render() {
    const { id, children, onChange, data } = this.props;
    return (
      <div className="this-is-a-Record">
        {React.Children.map(children, child => (
          <Cell
            data={child.props.valueGetter(data)}
            onChange={newValue =>
              onChange(id, child.props.onChange(newValue, data))
            }
            editor={child.props.editor}
          />
        ))}
      </div>
    );
  }
}

export default Record;
