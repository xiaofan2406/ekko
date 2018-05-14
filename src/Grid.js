/* @flow */
import * as React from 'react';
// import orderBy from 'lodash.orderby';
import HeaderCell from './HeaderCell';
import Group from './Group';
import { groupBy, GROUP_DEFAULT_KEY } from './helpers';
import { cssGrid } from './styles';

class Grid extends React.Component<GridProps, GridState> {
  static defaultProps = {
    onRowChange: () => {},
  };

  state = {
    sortIndex: -1,
    sortOrder: 'none',
    groupKey: '',
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

  getStyle = () => {
    const { columns, data } = this.props;
    return {
      gridTemplateColumns: `repeat(${columns.length + 1}, auto)`,
      gridTemplateRows: `60px repeat(${Object.keys(data).length}, auto)`,
    };
  };

  getGroups = () => {
    const { data, columns } = this.props;
    const { groupKey } = this.state;
    return groupKey
      ? // $FlowFixMe
        groupBy(data, columns.find(column => column.name === groupKey).groupBy)
      : { [GROUP_DEFAULT_KEY]: data };
  };

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

  handleGroup = (groupKey: string) => {
    if (groupKey !== this.state.groupKey) {
      this.setState({ groupKey });
    }
  };

  render() {
    const { columns, onRowChange } = this.props;
    const { sortIndex, sortOrder } = this.state;
    const groups = this.getGroups();
    console.log('[Grid]: render');
    console.log(groups);
    return (
      <>
        <div className={cssGrid} style={this.getStyle()}>
          <div
            style={{
              gridColumn: '1 / -1',
            }}
          >
            {columns.map(
              column =>
                column.groupBy ? (
                  <button
                    key={column.name}
                    onClick={() => {
                      this.handleGroup(column.name);
                    }}
                  >
                    {column.label}
                  </button>
                ) : null
            )}
            <button
              onClick={() => {
                this.handleGroup('');
              }}
            >
              Clear
            </button>
          </div>
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
          {Object.keys(groups).map(label => (
            <Group
              key={label}
              label={label}
              data={groups[label]}
              columns={columns}
              onRowChange={((onRowChange: any): RowChangeHandler)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Grid;
