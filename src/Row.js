/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.Component<RowProps> {
  storeValue = (index: number, value: mixed) => {
    const { id, storeData } = this.props;
    storeData(id, index, value);
  };

  handleRowChange = (handler: CellChangeHandler) => {
    const { id, onRowChange, data } = this.props;
    onRowChange(id, handler(data));
  };

  render() {
    const { id, children, data } = this.props;
    console.log('render Row', id);

    // TODO maybe cell props validation happens here
    return React.Children.map(children, (child, index) => (
      <Cell
        value={child.props.getter(data)}
        render={child.props.render}
        updater={child.props.updater}
        editor={child.props.editor}
        editorDisplay={child.props.editorDisplay}
        handleRowChange={this.handleRowChange}
        index={index}
        storeValue={this.storeValue}
      />
    ));
  }
}

export default Row;
