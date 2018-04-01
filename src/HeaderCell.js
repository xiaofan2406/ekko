/* @flow */
import * as React from 'react';

type HeaderCellProps = {
  label: $PropertyType<ColumnProps, 'label'>,
  sortable: boolean,
  index: number,
  onSort: (index: number) => void,
};

type HeaderCellState = {};

class HeaderCell extends React.Component<HeaderCellProps, HeaderCellState> {
  state = {};

  handleClick = () => {
    const { sortable, index, onSort } = this.props;
    if (sortable) {
      onSort(index);
    }
  };

  render() {
    const { sortable, label, index } = this.props;
    console.log('render header cell', sortable, index);
    const classNames = ['ekko-cell', sortable && 'sortable']
      .filter(Boolean)
      .join(' ')
      .trim();
    return (
      <div
        className={classNames}
        tabIndex={0}
        role="textbox"
        onClick={this.handleClick}
      >
        {label}
      </div>
    );
  }
}

export default HeaderCell;
