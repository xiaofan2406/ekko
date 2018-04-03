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

const round = value => (Math.round(+value * 1000) / 1000).toFixed(3);

class ReduxExample extends React.Component<{}> {
  makeUpdater = (key: string) => (newValue: mixed) => (rowData: Object) => ({
    ...rowData,
    [key]: newValue,
  });

  makeStatsUpdater = (key: string) => (newValue: mixed) => (
    rowData: Object
  ) => ({
    ...rowData,
    stats: {
      ...rowData.stats,
      [key]: +newValue,
    },
  });

  render() {
    return (
      <Box level={2}>
        <Provider store={store}>
          <ConnectedGrid decorator={() => connect(mapStateForCell)}>
            <Column label="ID" getter={rowData => rowData.key} />
            <Column
              label="Icon"
              getter={rowData => rowData.icon}
              updater={this.makeUpdater('icon')}
              render={value => (
                <img src={value} alt={value} style={{ width: '50px' }} />
              )}
              editor="inline"
            />
            <Column
              label="Name"
              getter={rowData => rowData.name}
              updater={this.makeUpdater('name')}
              editor="inline"
              sortable
            />
            <Column
              label="Title"
              getter={rowData => rowData.title}
              updater={this.makeUpdater('title')}
              editor="inline"
            />
            <Column
              label="Tags"
              getter={rowData => rowData.tags.join(',')}
              updater={newValue => rowData => ({
                ...rowData,
                tags: newValue.split(','),
              })}
              editor={TextEditor}
              editorDisplay="dialog"
            />
            <Column
              label="HP"
              getter={rowData => rowData.stats.hp}
              updater={this.makeStatsUpdater('hp')}
              editor="inline"
              sortable
            />
            <Column
              label="HP at level 18"
              getter={rowData =>
                rowData.stats.hp + 17 * rowData.stats.hpperlevel
              }
            />
            <Column
              label="MP"
              getter={rowData => rowData.stats.mp}
              updater={this.makeStatsUpdater('mp')}
              editor="inline"
            />
            <Column
              label="MP at level 18"
              getter={rowData =>
                round(rowData.stats.mp + 17 * rowData.stats.mpperlevel)
              }
            />
            <Column
              label="AD"
              getter={rowData => rowData.stats.attackdamage}
              updater={this.makeStatsUpdater('attackdamage')}
              editor="inline"
            />
            <Column
              label="AD at level 18"
              getter={rowData =>
                round(
                  rowData.stats.attackdamage +
                    17 * rowData.stats.attackdamageperlevel
                )
              }
            />
            <Column
              label="Description"
              getter={rowData => rowData.description}
              updater={this.makeUpdater('description')}
              editor={TextEditor}
              editorDisplay="dropdown"
            />
          </ConnectedGrid>
        </Provider>
      </Box>
    );
  }
}

export default ReduxExample;
