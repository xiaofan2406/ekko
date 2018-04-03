/* @flow */
import * as React from 'react';
import orderBy from 'lodash.orderby';
import Row from './Row';
import Static from './Static';
import HeaderCell from './HeaderCell';
import { cssGrid } from './styles';

class Grid extends React.Component<GridProps, GridState> {
  state = {
    ids: this.props.ids,
    sortIndex: -1,
    sortOrder: 'none',
  };

  getNextSortOrder = (index: number): GridSortOrder =>
    ({
      asc: 'desc',
      desc: 'none',
      none: 'asc',
    }[index === this.state.sortIndex ? this.state.sortOrder : 'none']);

  // keep data in Grid for calculations not rendering
  storeData = (id: string, index: number, value: mixed) => {
    // console.log('setting store', id);
    this.store[id][index] = value;
  };

  store = this.props.ids.reduce((byId, id) => {
    byId[id] = [];
    return byId;
  }, {});

  handleSort = (index: number) => {
    const order = this.getNextSortOrder(index);

    const ordered =
      order === 'none'
        ? this.props.ids
        : orderBy(
            Object.keys(this.store).map(id => ({
              id,
              value: this.store[id][index],
            })),
            'value',
            order
          ).map(config => config.id);

    return this.setState({
      ids: ordered,
      sortIndex: index,
      sortOrder: order,
    });
  };

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
    const { enhancer, onRowChange, children } = this.props;
    const { ids } = this.state;
    return ids.map(id => (
      <Static key={id}>
        {enhancer(({ data }) => (
          <Row
            data={data[id]}
            id={id}
            onRowChange={onRowChange}
            storeData={this.storeData}
          >
            {children}
          </Row>
        ))}
      </Static>
    ));
  };

  // for higher-order-component usage, e.g. react-redux
  renderDecoratedRows = () => {
    const { decorator, onRowChange, children } = this.props;
    const { ids } = this.state;
    return ids.map(id => {
      const DecoratedRow = decorator()(Row);
      return (
        <DecoratedRow
          key={id}
          id={id}
          onRowChange={onRowChange}
          storeData={this.storeData}
        >
          {children}
        </DecoratedRow>
      );
    });
  };

  render() {
    const { children } = this.props;
    const { ids, sortIndex, sortOrder } = this.state;
    console.log('render Grid');
    return (
      <div
        className={cssGrid}
        style={{
          gridTemplateColumns: `repeat(${React.Children.count(
            children
          )}, auto)`,
          gridTemplateRows: `60px repeat(${ids.length}, auto)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <HeaderCell
            label={child.props.label}
            index={index}
            onSort={this.handleSort}
            sortable={!!child.props.sortable}
            sortOrder={sortIndex === index ? sortOrder : 'none'}
          />
        ))}
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;
