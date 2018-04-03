/* @flow */
import * as React from 'react';

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
    // console.log('render header cell', sortable, index);
    const classNames = ['ekko-cell', sortable && 'sortable']
      .filter(Boolean)
      .join(' ')
      .trim();
    return (
      <div
        className={classNames}
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
