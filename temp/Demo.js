import React from 'react';
import { useData, useDataChange } from './DataContext';
import Grid from './Grid';
// import PropTypes from 'prop-types';

const Demo = () => {
  return (
    <div>
      <Grid
        columns={{
          name: {
            label: 'Name',
            getter: row => `${row.firstName} ${row.lastName}`,
            memoizer: (prevRow, nextRow) =>
              prevRow.firstName !== nextRow.firstName &&
              prevRow.lastName !== nextRow.lastName,
          },
          email: {
            label: 'Email',
            getter: row => row.email,
            updater: email => ({ email }),
            memoizer: (prevRow, nextRow) => prevRow.email !== nextRow.email,
          },
        }}
        useData={useData}
        useDataChange={useDataChange}
      />
    </div>
  );
};

// Demo.propTypes = {}

export default Demo;
