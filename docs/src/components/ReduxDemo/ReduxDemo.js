import React from 'react';
import { Provider, connect } from 'react-redux';
import Button from 'material-ui/Button';
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

class ReduxExample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedGrid decorator={() => connect(mapStateForCell)}>
          <Column
            label="Name"
            valueGetter={rowData => rowData.name}
            onChange={(newValue, rowData) => ({ ...rowData, name: newValue })}
            editor={({ data, handleChange }) => (
              <DialogEditor data={data} onChange={handleChange} />
            )}
          />
          <Column
            label="Gender"
            valueGetter={rowData => rowData.gender}
            onChange={(newValue, rowData) => ({
              ...rowData,
              gender: newValue,
            })}
            editor={({ data, handleChange }) => {
              let input;
              return (
                <span>
                  <input
                    defaultValue={data}
                    ref={ref => {
                      input = ref;
                    }}
                  />
                  <Button
                    onClick={() => {
                      handleChange(input.value);
                    }}
                  >
                    Update
                  </Button>
                </span>
              );
            }}
          />
        </ConnectedGrid>
      </Provider>
    );
  }
}

export default ReduxExample;
