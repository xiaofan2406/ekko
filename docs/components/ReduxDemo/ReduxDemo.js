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
            <Column label="ID" getter={rowData => rowData.key} />
            <Column
              label="Name"
              getter={rowData => rowData.name}
              updater={newValue => rowData => ({ ...rowData, name: newValue })}
              editor={TextEditor}
              editorDisplay="popover"
            />
            <Column
              label="Title"
              getter={rowData => rowData.title}
              updater={newValue => rowData => ({ ...rowData, title: newValue })}
              editor="inline"
            />
            <Column
              label="Tags"
              getter={rowData => rowData.tags.join(',')}
              updater={newValue => rowData => ({
                ...rowData,
                gender: newValue,
              })}
              editor={TextEditor}
              editorDisplay="dialog"
            />
            <Column
              label="Icon"
              getter={rowData => rowData.icon}
              render={value => <img src={value} alt={value} />}
            />
            <Column
              label="Description"
              getter={rowData => rowData.description}
              editor="inline"
            />
            <Column
              label="HP"
              getter={rowData => rowData.stats.hp}
              editor="inline"
            />
            <Column
              label="HP at level 18"
              getter={rowData =>
                rowData.stats.hp + 17 * rowData.stats.hpperlevel
              }
              editor="inline"
            />
            <Column
              label="MP"
              getter={rowData => rowData.stats.mp}
              editor="inline"
            />
            <Column
              label="MP at level 18"
              getter={rowData =>
                rowData.stats.mp + 17 * rowData.stats.mpperlevel
              }
              editor="inline"
            />
            <Column
              label="AD"
              getter={rowData => rowData.stats.attackdamage}
              editor="inline"
            />
            <Column
              label="AD at level 18"
              getter={rowData =>
                rowData.stats.attackdamage +
                17 * rowData.stats.attackdamageperlevel
              }
              editor="inline"
            />
          </ConnectedGrid>
        </Provider>
      </Box>
    );
  }
}

export default ReduxExample;
