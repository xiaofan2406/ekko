/* @flow */
import React from 'react';
import { Provider, connect } from 'react-redux';
import { TextEditor } from 'widgets';
import { Box } from 'nidalee';

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
      <Box level={2}>
        <Provider store={store}>
          <ConnectedGrid decorator={() => connect(mapStateForCell)}>
            <Column
              label="Title"
              getter={rowData => (rowData.gender === 'female' ? 'Ms' : 'Mr')}
            />
            <Column
              label="Name"
              getter={rowData => rowData.name}
              updater={newValue => rowData => ({ ...rowData, name: newValue })}
              editor={TextEditor}
              editorDisplay="popover"
            />
            <Column
              label="Type"
              getter={rowData => rowData.type}
              updater={newValue => rowData => ({ ...rowData, type: newValue })}
              editor={TextEditor}
              editorDisplay="dialog"
            />
            <Column
              label="Gender"
              getter={rowData => rowData.gender}
              updater={newValue => rowData => ({
                ...rowData,
                gender: newValue,
              })}
              editorDisplay="inline"
            />
          </ConnectedGrid>
        </Provider>
      </Box>
    );
  }
}

export default ReduxExample;
