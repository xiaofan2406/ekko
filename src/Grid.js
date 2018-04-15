/* @flow */
import * as React from 'react';
import orderBy from 'lodash.orderby';
import Row from './Row';
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
    const { decorator, onRowChange, children } = this.props;
    const { ids } = this.state;
    const DecoratedRow = decorator(Row);
    return ids.map(id => (
      <DecoratedRow
        key={id}
        id={id}
        onRowChange={onRowChange}
        storeData={this.storeData}
      >
        {children}
      </DecoratedRow>
    ));
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
