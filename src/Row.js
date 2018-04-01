/* @flow */
import React from 'react';
import Cell from './Cell';

class Row extends React.Component<RowProps> {
  shouldComponentUpdate(nextProps: RowProps) {
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`${key} is different`);
      }
    });
    return true;
  }

  componentWillUnmount() {
    console.log('imgone');
  }

  setDataInStore = (index: number, data: mixed) => {
    const { id } = this.props;
    this.props.setDataInStore(id, index, data);
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
        setDataInStore={this.setDataInStore}
      />
    ));
  }
}

export default Row;
