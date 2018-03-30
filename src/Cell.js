/* @flow */
import React from 'react';
import { Editable } from 'nidalee';

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    isEditing: false,
  };

  componentDidMount() {
    this.validateProps();
  }

  componentDidUpdate() {
    this.validateProps();
  }

  get value(): string {
    const { value, formatter } = this.props;
    if (formatter) {
      return formatter(value);
    }
    if (
      (!formatter && typeof value === 'string') ||
      typeof value === 'number'
    ) {
      return `${value}`;
    }
    return JSON.stringify(value);
  }

  validateProps = () => {
    const { value, editor, formatter } = this.props;
    if (typeof value === 'object' && !formatter) {
      console.warn(
        'Ekko:',
        'No formatter is specified for complex type value. `JSON.stringify` will be used'
      );
    }
    if (typeof value === 'object' && !editor) {
      console.warn(
        'Ekko:',
        'No editor is specified for complex type value. WHAT will be used'
      );
    }
  };

  handleChange = (newValue: mixed) => {
    const { updater, handleRowChange } = this.props;

    if (updater) {
      handleRowChange(updater(newValue));
    }

    console.log('finish editing');
  };

  startEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  renderContent = () => {
    const { value, editor } = this.props;
    if ((!editor && typeof value === 'string') || typeof value === 'number') {
      return <Editable value={this.value} onSave={this.handleChange} inline />;
    }

    return (
      <span tabIndex={0} role="textbox" onDoubleClick={this.startEditing}>
        <span>{this.value}</span>
        {this.state.isEditing &&
          editor &&
          editor({
            value,
            handleChange: this.handleChange,
          })}
      </span>
    );
  };

  render() {
    console.log('render Cell');

    return <span className="ekko-cell">{this.renderContent()}</span>;
  }
}

export default Cell;
