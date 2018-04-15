/* @flow */
import React from 'react';
import { Popover, Dialog, InlineEdit, Menu } from 'nidalee';
import { cssCell } from './styles';

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    isEditing: false,
    isMenuOpen: false,
    previousValue: this.props.value,
  };

  componentDidMount() {
    this.validateProps();
    const { index, value, storeValue } = this.props;
    storeValue(index, value);
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

  finishEditing = () => {
    const { editor } = this.props;
    if (editor) {
      this.setState({
        isEditing: false,
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
    this.setState({
      isMenuOpen: false,
    });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (event.which === 13) {
      this.startEditing();
    }
  };

  openMenu = () => {
    this.setState({
      isMenuOpen: true,
    });
  };

  closeMenu = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  renderValue = () => {
    const { value, render } = this.props;

    return (
      <div className="value" tabIndex={-1}>
        {render ? render(value) : this.stringifiedValue}
      </div>
    );
  };

  renderEditor = () => {
    const { value, editor, editorDisplay, render } = this.props;
    // console.log('render Cell', value);

    if (editorDisplay === 'popover' && editor && editor !== 'inline') {
      // TODO Popover isnt really working correclty
      return (
        <Popover
          expand={this.state.isEditing}
          onExpand={this.startEditing}
          trigger="onDoubleClick"
          onCollapse={this.finishEditing}
          expander={this.renderValue()}
          align="right"
          direction="bottom"
          className="editor"
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
          onOpen={this.startEditing}
          onClose={this.finishEditing}
          trigger="onDoubleClick"
          opener={this.renderValue()}
          showOverlay
          className="editor"
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
          className="editor"
        />
      );
    }
    // inline, but object?

    return this.renderValue();
  };

  renderActions = () => {
    const { updater } = this.props;
    const { isMenuOpen } = this.state;
    return updater ? (
      <Popover
        expand={isMenuOpen}
        expander={<span tabIndex={-1}>...</span>}
        trigger="onClick"
        onExpand={this.openMenu}
        onCollapse={this.closeMenu}
        className="menu"
        align="right"
        direction="bottom"
      >
        <Menu>
          <Menu.Item onClick={this.handleUndo}>Undo</Menu.Item>
        </Menu>
      </Popover>
    ) : null;
  };

  render() {
    console.log('render Cell');
    return (
      <div
        tabIndex={0}
        role="textbox"
        className={cssCell}
        onKeyDown={this.handleKeyDown}
      >
        {this.renderEditor()}
        {this.renderActions()}
      </div>
    );
  }
}

export default Cell;
