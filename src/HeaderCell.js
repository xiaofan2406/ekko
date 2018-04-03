/* @flow */
import * as React from 'react';
import { cx } from 'react-emotion';
import { cssCell } from './styles';

type HeaderCellProps = {
  label: $PropertyType<ColumnProps, 'label'>,
  index: number,
  sortable: boolean,
  sortOrder: GridSortOrder,
  onSort: (index: number) => void,
};

type HeaderCellState = {};

class HeaderCell extends React.Component<HeaderCellProps, HeaderCellState> {
  state = {};

  handleSort = () => {
    const { sortable, index, onSort } = this.props;
    if (sortable) {
      onSort(index);
    }
  };

  handKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (event.which === 13) {
      this.handleSort();
    }
  };

  render() {
    const { sortable, label, sortOrder } = this.props;
    return (
      <div
        className={cx([cssCell, { sortable }])}
        tabIndex={0}
        role="textbox"
        onClick={this.handleSort}
        onKeyDown={this.handKeyDown}
      >
        {label}
        {sortOrder === 'none' ? null : sortOrder === 'asc' ? '^' : 'v'}
      </div>
    );
  }
}

export default HeaderCell;
