/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Column } from 'ekko';
import { TextEditor } from 'widgets';
import { actions, selectors } from 'store/champions';

const round = value => (Math.round(+value * 1000) / 1000).toFixed(3);

type ReduxExampleProps = {
  champions: { [string]: {} },
  updateChampion: (id: string, champion: {}) => mixed,
};

class ReduxExample extends React.Component<ReduxExampleProps> {
  makeUpdater = (key: string) => (newValue: mixed) => (rowData: {}) => ({
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

  columnUpdaters = {
    icon: this.makeUpdater('icon'),
    name: this.makeUpdater('name'),
    title: this.makeUpdater('title'),
    tags: newValue => rowData => ({
      ...rowData,
      tags: newValue.split(','),
    }),
    attackdamage: this.makeStatsUpdater('attackdamage'),
    description: this.makeUpdater('description'),
  };

  iconRender = value => (
    <img src={value} alt={value} style={{ width: '50px' }} />
  );

  columns = [
    <Column name="id" label="ID" getter={rowData => rowData.key} />,
    <Column
      name="icon"
      label="Icon"
      getter={rowData => rowData.icon}
      updater={this.columnUpdaters.icon}
      render={this.iconRender}
      editor={TextEditor}
      editorDisplay="dialog"
    />,
    <Column
      name="name"
      label="Name"
      getter={rowData => rowData.name}
      updater={this.columnUpdaters.name}
      editor="inline"
      sortable
    />,
    <Column
      name="title"
      label="Title"
      getter={rowData => rowData.title}
      updater={this.columnUpdaters.title}
      editor="inline"
    />,
    <Column
      name="tags"
      label="Tags"
      getter={rowData => rowData.tags.join(',')}
      updater={this.columnUpdaters.tags}
      editor={TextEditor}
      editorDisplay="dialog"
    />,
    <Column
      name="attackdamage"
      label="AD"
      getter={rowData => rowData.stats.attackdamage}
      updater={this.columnUpdaters.attackdamage}
      editor="inline"
    />,
    <Column
      name="attackdamageperlevel"
      label="AD at level 18"
      getter={rowData =>
        round(
          rowData.stats.attackdamage + 17 * rowData.stats.attackdamageperlevel
        )
      }
    />,
    <Column
      name="description"
      label="Description"
      getter={rowData => rowData.description}
      updater={this.columnUpdaters.description}
      editor={TextEditor}
      editorDisplay="popover"
    />,
  ];

  render() {
    const { champions, updateChampion } = this.props;
    return (
      <Grid
        data={champions}
        onRowChange={updateChampion}
        columns={this.columns}
      />
    );
  }
}

const mapState = state => ({
  champions: selectors.getChampions(state),
});

export default connect(mapState, {
  updateChampion: actions.updateChampion,
})(ReduxExample);
