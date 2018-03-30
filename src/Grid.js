/* @flow */
import * as React from 'react';
import Row from './Row';
import Static from './Static';

class Grid extends React.Component<GridProps> {
  renderRows = () => {
    const { enhancer, decorator } = this.props;
    // TODO warning for conflics?
    if (enhancer) {
      return this.renderEnhancedRows();
    }
    if (decorator) {
      return this.renderDecoratedRows();
    }
    // TODO take props.data and simply display it?
    return null;
  };

  // for render-prop usage, e.g. new context
  // not really working due to any new reference will re-render
  renderEnhancedRows = () => {
    const { ids, enhancer, onRowChange, children } = this.props;
    return ids.map(id => (
      <Static key={id}>
        {enhancer(({ data }) => (
          <Row data={data[id]} id={id} onRowChange={onRowChange}>
            {children}
          </Row>
        ))}
      </Static>
    ));
  };

  // for higher-order-component usage, e.g. react-redux
  renderDecoratedRows = () => {
    const { ids, decorator, onRowChange, children } = this.props;
    return ids.map(id => {
      const DecoratedRow = decorator()(Row);
      return (
        <DecoratedRow key={id} id={id} onRowChange={onRowChange}>
          {children}
        </DecoratedRow>
      );
    });
  };

  render() {
    const { children } = this.props;
    console.log('render Grid');
    return (
      <div className="ekko-grid">
        <div className="ekko-header">
          {React.Children.map(children, child => (
            <span>{child.props.label}</span>
          ))}
        </div>
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;
