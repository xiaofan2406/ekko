/* @flow */
import * as React from 'react';
import Row, { GridRow } from './Row';

class Grid extends React.Component<GridProps> {
  render() {
    const {
      ids,
      onRowChange,
      children,
      rowEnhancer,
      rowDecorator,
    } = this.props;
    console.log('render Grid');
    return (
      <div className="this-is-grid">
        <div className="this-is-header">
          {React.Children.map(children, child => (
            <span>{child.props.label}</span>
          ))}
        </div>
        {ids.map(id => {
          // For both hoc usage and rener-prop usage
          if (rowEnhancer) {
            console.log('using rowEnhancer');
            return (
              <GridRow key={id}>
                {rowEnhancer(({ data }) => (
                  <Row data={data[id]} id={id} onChange={onRowChange}>
                    {children}
                  </Row>
                ))}
              </GridRow>
            );
          }

          if (rowDecorator) {
            console.log('using rowDecorator');
            const EnhancedRow = rowDecorator()(Row);
            return (
              <EnhancedRow key={id} id={id} onChange={onRowChange}>
                {children}
              </EnhancedRow>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

export default Grid;
