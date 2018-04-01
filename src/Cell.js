/* @flow */
import React from 'react';
import { Dropdown, Dialog, InlineEdit } from 'nidalee';

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

  validateProps = () => {
    const { value, render } = this.props;
    if (typeof value === 'object' && !render) {
      console.warn(
        'Ekko:',
        'No render is specified for complex type value. `JSON.stringify` will be used'
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

  get stringifiedValue(): string {
    const { value } = this.props;
    return typeof value === 'string' || typeof value === 'number'
      ? `${value}`
      : JSON.stringify(value);
  }

  renderValue = (canEdit: boolean = true) => {
    const { value, render } = this.props;

    const editHandler = canEdit ? { onDoubleClick: this.startEditing } : {};
    return (
      <div tabIndex={0} role="textbox" className="ekko-cell" {...editHandler}>
        {render ? render(value) : this.stringifiedValue}
      </div>
    );
  };

  render() {
    const { value, editor, editorDisplay, render } = this.props;
    console.log('render Cell', value);

    if (editorDisplay === 'dropdown' && editor && editor !== 'inline') {
      // TODO Dropdown isnt really working correclty
      return (
        <Dropdown
          open={this.state.isEditing}
          opener={this.renderValue()}
          tabIndex={0}
          role="textbox"
          className="ekko-cell"
          align="right"
          direction="bottom"
        >
          {editor({
            value,
            handleChange: this.handleChange,
          })}
        </Dropdown>
      );
    }

    if (editorDisplay === 'dialog' && editor && editor !== 'inline') {
      return (
        <Dialog
          open={this.state.isEditing}
          opener={this.renderValue()}
          showOverlay
        >
          {editor({
            value,
            handleChange: this.handleChange,
          })}
        </Dialog>
      );
    }

    if (
      editor === 'inline' &&
      (typeof value === 'string' || typeof value === 'number')
    ) {
      return (
        <InlineEdit
          value={this.stringifiedValue}
          render={render}
          onSave={this.handleChange}
          className="ekko-cell"
          tabIndex={0}
          role="textbox"
        />
      );
    }
    // inline, but object?

    return this.renderValue(false);
  }
}

export default Cell;
