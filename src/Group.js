/* @flow */
import * as React from 'react';

import Row from './Row';

type GroupProps = {
  label: string,
  columns: Column[],
  data: { [string]: mixed },
  onRowChange: RowChangeHandler,
};

type GroupState = {};

class Group extends React.Component<GroupProps, GroupState> {
  state = {};

  render() {
    const { columns, data, onRowChange, label } = this.props;
    return (
      <>
        <div
          style={{
            gridColumn: '1 / -1',
          }}
        >
          {label}
        </div>
        {Object.keys(data).map(id => (
          <>
            <Row
              key={id}
              id={id}
              onRowChange={onRowChange}
              data={data[id]}
              columns={columns}
            />
            <div />
          </>
        ))}
      </>
    );
  }
}

export default Group;
