/* @flow */
import React from 'react';
import { Editable, Popover, Dialog, Button } from 'nidalee';

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
    this.setState({
      isEditing: false,
    });

    console.log('finish editing');
  };

  startEditing = () => {
    const { editor } = this.props;
    if (editor) {
      this.setState({
        isEditing: true,
      });
    }
  };

  render() {
    console.log('render Cell');
    const { value, editor, editorDisplay } = this.props;

    if (editorDisplay === 'popover' && editor) {
      return (
        <Popover
          open={this.state.isEditing}
          opener={
            <Button onDoubleClick={this.startEditing}>{this.value}</Button>
          }
          align="right"
          direction="bottom"
        >
          {editor({
            value,
            handleChange: this.handleChange,
          })}
        </Popover>
      );
    }

    if (editorDisplay === 'dialog' && editor) {
      return (
        <Dialog
          open={this.state.isEditing}
          opener={
            <Button onDoubleClick={this.startEditing}>{this.value}</Button>
          }
          showOverlay
        >
          {editor({
            value,
            handleChange: this.handleChange,
          })}
        </Dialog>
      );
    }

    if (editorDisplay === 'inline') {
      return editor ? (
        <Editable value={this.value} onSave={this.handleChange} inline />
      ) : (
        <span>inline eidt</span>
      );
    }

    return <span className="ekko-cell">{this.value}</span>;
  }
}

export default Cell;
