/* @flow */
import React from 'react';
import { Popover, Dialog, InlineEdit } from 'nidalee';

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

  renderValue = (canEdit: boolean = true) => {
    const { value, render } = this.props;
    const displayValue = render
      ? render(value)
      : typeof value === 'string' || typeof value === 'number'
        ? `${value}`
        : JSON.stringify(value);

    const editHandler = canEdit ? { onDoubleClick: this.startEditing } : {};
    return (
      <div tabIndex={0} role="textbox" className="ekko-cell" {...editHandler}>
        {displayValue}
      </div>
    );
  };

  render() {
    console.log('render Cell');
    const { value, editor, editorDisplay } = this.props;

    if (editorDisplay === 'popover' && editor && editor !== 'inline') {
      // TODO Popover isnt really working correclty
      return (
        <Popover
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
        </Popover>
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
      // TODO better inline edit
      return this.renderValue();
      // return (
      //   <InlineEdit
      //     defaultValue={this.value}
      //     onSave={this.handleChange}
      //     className="ekko-cell"
      //   />
      // );
    }

    return this.renderValue(false);
  }
}

export default Cell;
