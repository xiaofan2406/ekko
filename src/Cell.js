/* @flow */
import React from 'react';
import { Popover, Dialog, InlineEdit, Menu } from 'nidalee';
import { cssCell, cssCellValue, cssCellMenu } from './styles';

class Cell extends React.PureComponent<CellProps, CellState> {
  state = {
    isEditing: false,
    menuPostion: null,
    previousValue: this.props.value,
  };

  componentDidMount() {
    this.validateProps();
  }

  componentWillReceiveProps(nextProps: CellProps) {
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`\t[Cell] Prop ${key} changed`);
      }
    });
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

  setMenuPosition = (mousePos: { x: number, y: number }) => {
    // TODO better algorithm to determin the position
    // assume for now menu is 120px w, 80px h;
    const menuWith = 120;
    const menuHeight = 80;
    const menuPostion = {};
    if (mousePos.x + menuWith > window.innerWidth + window.pageXOffset) {
      menuPostion.x = mousePos.x - menuWith;
    } else {
      menuPostion.x = mousePos.x;
    }

    if (mousePos.y + menuHeight > window.innerHeight + window.pageYOffset) {
      menuPostion.y = mousePos.y - menuHeight;
    } else {
      menuPostion.y = mousePos.y;
    }
    this.setState({
      menuPostion,
    });
    console.log(menuPostion);
  };

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
      this.setState({ isEditing: true });
    }
  };

  finishEditing = () => {
    const { editor } = this.props;
    if (editor) {
      this.setState({ isEditing: false });
    }
  };

  handleUpdate = (newValue: mixed) => {
    const { updater, onCellUpdate, value } = this.props;

    if (updater) {
      onCellUpdate(newValue, updater);
    }
    this.setState({
      isEditing: false,
      previousValue: value,
    });
  };

  handleUndo = (event: SyntheticMouseEvent<any>) => {
    event.stopPropagation();
    const { updater, onCellUpdate } = this.props;

    if (updater) {
      onCellUpdate(this.state.previousValue, updater);
    }
    this.closeMenu();
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (event.which === 13) {
      this.startEditing();
    }
  };

  handleClick = () => {
    // clicking anywhere closes the menu
    // TODO this is hacky, need a better soluton
    this.closeMenu();
  };
  handleBlur = () => {
    // this.closeMenu();
  };

  toggleEditing = (isEditing: boolean) => {
    this.setState({ isEditing });
  };

  handleContextMenu = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.setMenuPosition({ x: event.pageX, y: event.pageY });
  };

  closeMenu = () => {
    // shouldn't show menu if it is editing for now
    if (!this.state.isEditing) {
      this.setState({
        menuPostion: null,
      });
    }
  };

  renderValue = () => {
    const { value, render } = this.props;

    return (
      <div className={cssCellValue} tabIndex={-1}>
        {render ? render(value) : this.stringifiedValue}
      </div>
    );
  };

  renderEditor = () => {
    const { value, editor, editorDisplay, render } = this.props;
    // console.log('render Cell', value);

    if (editorDisplay === 'popover' && editor && editor !== 'inline') {
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
            onUpdate: this.handleUpdate,
            onCancel: this.finishEditing,
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
            onUpdate: this.handleUpdate,
            onCancel: this.finishEditing,
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
          tabIndex={-1}
          defaultValue={this.stringifiedValue}
          editing={this.state.isEditing}
          render={render}
          toggleEditing={this.toggleEditing}
          onSave={this.handleUpdate}
          className="editor"
        />
      );
    }
    // inline, but object?

    return this.renderValue();
  };

  renderContextMenu = () => {
    const { updater } = this.props;
    const { menuPostion } = this.state;
    return updater && menuPostion ? (
      <Menu
        style={{
          left: menuPostion.x,
          top: menuPostion.y,
        }}
        className={cssCellMenu}
      >
        <Menu.Item onClick={this.handleUndo}>Undo</Menu.Item>
      </Menu>
    ) : null;
  };

  render() {
    console.log('[Cell]: render');
    return (
      <div
        tabIndex={0}
        role="textbox"
        className={cssCell}
        onKeyDown={this.handleKeyDown}
        onContextMenu={this.handleContextMenu}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
      >
        {this.renderEditor()}
        {this.renderContextMenu()}
      </div>
    );
  }
}

export default Cell;
