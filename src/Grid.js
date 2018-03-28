/* @flow */
import * as React from 'react';
import Row from './Row';
import Static from './Static';

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
          // for children as function usage
          if (rowEnhancer) {
            return (
              <Static key={id}>
                {rowEnhancer(({ data }) => (
                  <Row data={data[id]} id={id} onChange={onRowChange}>
                    {children}
                  </Row>
                ))}
              </Static>
            );
          }
          // for higher-order-component usage
          if (rowDecorator) {
            const EnhancedRow = rowDecorator()(Row);
            return (
              <EnhancedRow key={id} id={id} onChange={onRowChange}>
                {children}
              </EnhancedRow>
            );
          }

          // TODO take props.data and simply display it?
          return null;
        })}
      </div>
    );
  }
}

export default Grid;
