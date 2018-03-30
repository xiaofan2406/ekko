/* @flow */
import React from 'react';
import { Editable } from 'nidalee';

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    isEditing: false,
  };

  handleChange = (newValue: mixed) => {
    const { onChange, handleRowChange } = this.props;

    handleRowChange(onChange(newValue));
    this.setState({
      isEditing: false,
    });
    console.log('finish editing');
  };

  render() {
    const { value, editor } = this.props;
    console.log('render Cell', this.state.isEditing, value);

    return (
      <span>
        <Editable value={`${value}`} onSave={this.handleChange} inline />
        <span
          onClick={() => {
            this.setState({
              isEditing: true,
            });
          }}
        >
          {JSON.stringify(value)}
        </span>
        {this.state.isEditing &&
          editor({
            value,
            handleChange: this.handleChange,
          })}
      </span>
    );
  }
}

export default Cell;
