/* @flow */
import React from 'react';
import { Provider, connect } from 'react-redux';
import { DialogEditor } from 'widgets';
import { Grid, Column } from 'ekko';
import store, { actions, selectors } from './store';

const mapStateForGrid = state => ({
  ids: selectors.getIds(state),
});

const mapStateForCell = (state, { id }) => ({
  data: state.byId[id],
});

const ConnectedGrid = connect(mapStateForGrid, {
  onRowChange: actions.updateRow,
})(Grid);

class ReduxExample extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedGrid decorator={() => connect(mapStateForCell)}>
          <Column
            label="Name"
            valueGetter={rowData => rowData.name}
            onChange={newValue => rowData => ({ ...rowData, name: newValue })}
            editor={({ value, handleChange }) => (
              <DialogEditor data={value} onChange={handleChange} />
            )}
          />
          <Column
            label="Gender"
            valueGetter={rowData => rowData.gender}
            onChange={newValue => rowData => ({
              ...rowData,
              gender: newValue,
            })}
          />
        </ConnectedGrid>
      </Provider>
    );
  }
}

export default ReduxExample;
