/* @flow */
import * as React from 'react';
import sortBy from 'lodash.sortby';
import Row from './Row';
import Static from './Static';
import HeaderCell from './HeaderCell';

type GridState = {
  ids: string[],
  sortIndex: number,
  sortOrder: number,
};

class Grid extends React.Component<GridProps, GridState> {
  state = {
    ids: this.props.ids,
    sortIndex: -1,
    sortOrder: 1,
  };

  // keep data in Grid for calculations not rendering
  setDataInStore = (id: string, index: number, data: Object) => {
    // console.log('setting store', id);
    this.store[id][index] = data;
  };

  store = this.props.ids.reduce((byId, id) => {
    byId[id] = [];
    return byId;
  }, {});

  handleSort = (index: number) => {
    console.log('will sort by index', index);
    if (this.state.sortOrder % 3 === 0) {
      console.log('reset sort');
      return this.setState(prevState => ({
        ids: this.props.ids,
        sortIndex: -1,
        sortOrder: prevState.sortOrder + 1,
      }));
    }
    const sorted = sortBy(
      Object.keys(this.store).map(id => ({
        id,
        value: this.store[id][index],
      })),
      'value'
    ).map(config => config.id);

    return this.setState(prevState => ({
      ids: prevState.sortOrder % 3 === 1 ? sorted : sorted.reverse(),
      sortIndex: index,
      sortOrder: prevState.sortOrder + 1,
    }));
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
          <Row data={data[id]} id={id} onRowChange={onRowChange}>
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
          setDataInStore={this.setDataInStore}
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
        className="ekko-grid"
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
            sortStatus={sortIndex === index ? sortOrder % 3 : 1}
          />
        ))}
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;
