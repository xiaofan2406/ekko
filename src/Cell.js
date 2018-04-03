/* @flow */
import React from 'react';
import { Dropdown, Dialog, InlineEdit, Button } from 'nidalee';

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    isEditing: false,
    previousValue: this.props.value,
  };

  componentDidMount() {
    this.validateProps();
    const { index, value, setDataInStore } = this.props;
    setDataInStore(index, value);
  }

  componentDidUpdate() {
    this.validateProps();
  }

  get stringifiedValue(): string {
    const { value } = this.props;
    return typeof value === 'string' || typeof value === 'number'
      ? `${value}`
      : JSON.stringify(value);
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

  startEditing = () => {
    const { editor } = this.props;
    if (editor) {
      this.setState({
        isEditing: true,
      });
    }
  };

  handleChange = (newValue: mixed) => {
    const { updater, handleRowChange, value } = this.props;

    if (updater) {
      handleRowChange(updater(newValue));
    }
    this.setState({
      isEditing: false,
      previousValue: value,
    });

    console.log('finish editing');
  };

  handleUndo = () => {
    const { updater, handleRowChange } = this.props;
    console.log('undo with: ', this.state.previousValue);
    if (updater && handleRowChange) {
      handleRowChange(updater(this.state.previousValue));
    }
  };

  renderValue = (canEdit: boolean = true) => {
    const { value, render } = this.props;

    const editHandler = canEdit ? { onDoubleClick: this.startEditing } : {};
    return (
      <div
        tabIndex={0}
        role="textbox"
        className="ekko-cell-editor"
        {...editHandler}
      >
        {render ? render(value) : this.stringifiedValue}
      </div>
    );
  };

  renderEditor = () => {
    const { value, editor, editorDisplay, render } = this.props;
    // console.log('render Cell', value);

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
  };

  renderActions = () => {
    const { updater } = this.props;
    return updater ? (
      <Dropdown
        opener="..."
        tabIndex={0}
        role="button"
        className="ekko-cell-menu"
        align="right"
        direction="bottom"
      >
        <Button onClick={this.handleUndo}>Undo</Button>
      </Dropdown>
    ) : null;
  };

  render() {
    return (
      <div tabIndex={0} role="textbox" className="ekko-cell">
        {this.renderEditor()}
        {this.renderActions()}
      </div>
    );
  }
}

export default Cell;
