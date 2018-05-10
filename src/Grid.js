/* @flow */
import * as React from 'react';
// import orderBy from 'lodash.orderby';
import Row from './Row';
import HeaderCell from './HeaderCell';
import { cssGrid } from './styles';

class Grid extends React.Component<GridProps, GridState> {
  static defaultProps = {
    onRowChange: () => {},
  };

  state = {
    sortIndex: -1,
    sortOrder: 'none',
  };

  shouldComponentUpdate(nextProps: GridProps, nextState: GridState) {
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`\t[Grid] Prop ${key} changed`);
      }
    });
    Object.keys(nextState).forEach(key => {
      if (nextState[key] !== this.state[key]) {
        console.log(`\t[Grid] State ${key} changed`);
      }
    });
    return true;
  }

  getNextSortOrder = (index: number): SortOrder =>
    ({
      asc: 'desc',
      desc: 'none',
      none: 'asc',
    }[index === this.state.sortIndex ? this.state.sortOrder : 'none']);

  handleSort = () => {
    // const order = this.getNextSortOrder(index);
    // const ordered =
    //   order === 'none'
    //     ? this.props.ids
    //     : orderBy(
    //         Object.keys(this.store).map(id => ({
    //           id,
    //           value: this.store[id][index],
    //         })),
    //         'value',
    //         order
    //       ).map(config => config.id);
    // return this.setState({
    //   ids: ordered,
    //   sortIndex: index,
    //   sortOrder: order,
    // });
  };

  renderRows = () => {
    const { onRowChange, columns, data } = this.props;

    return Object.keys(data).map(id => (
      <Row
        key={id}
        id={id}
        onRowChange={onRowChange}
        data={data[id]}
        columns={columns}
      />
    ));
  };

  render() {
    const { columns, data } = this.props;
    const { sortIndex, sortOrder } = this.state;
    console.log('[Grid]: render');
    return (
      <div
        className={cssGrid}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
          gridTemplateRows: `60px repeat(${Object.keys(data).length}, auto)`,
        }}
      >
        {columns.map((column, index) => (
          <HeaderCell
            key={column.name}
            label={column.label}
            index={index}
            onSort={this.handleSort}
            sortable={!!column.sortable}
            sortOrder={sortIndex === index ? sortOrder : 'none'}
          />
        ))}
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;
