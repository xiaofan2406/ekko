/* @flow */
import * as React from 'react';
import Row, { GridRow } from './Row';
import { GridProvider, GridConsumer } from './Context';

class Grid extends React.Component<GridProps> {
  componentWillReceiveProps(nextProps: GridProps) {
    console.table(nextProps.children);
    console.table(this.props.children);
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`${key} changed`);
      }
    });
  }

  shouldComponentUpdate(nextProps: GridProps) {
    return Object.keys(nextProps)
      .filter(key => key === 'initialRecordsById')
      .some(key => nextProps[key] !== this.props[key]);
  }

  renderRow = id => (
    <GridConsumer key={id}>
      {({ byId, updateRecord }) => (
        <Row id={id} data={byId[id]} onChange={updateRecord}>
          {this.props.children}
        </Row>
      )}
    </GridConsumer>
  );

  render() {
    const { initialRecordsById, onRecordChange, children } = this.props;
    console.log('render Grid');
    return (
      <GridProvider byId={initialRecordsById} onRecordChange={onRecordChange}>
        <div className="this-is-grid">
          <div className="this-is-header">
            {React.Children.map(children, child => (
              <span>{child.props.label}</span>
            ))}
          </div>
          <GridConsumer>
            {({ byId }) => Object.keys(byId).map(this.renderRow)}
          </GridConsumer>
        </div>
      </GridProvider>
    );
  }
}

export default Grid;
