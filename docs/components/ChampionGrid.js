/* @flow */
import React from 'react';
import { Grid } from 'ekko';
import { TextEditor } from 'widgets';

const round = value => (Math.round(+value * 1000) / 1000).toFixed(3);

type ChampionGridProps = {
  champions: { [string]: {} },
  updateChampion: (id: string, champion: {}) => mixed,
};

type Champion = {
  id: string,
  key: string,
  name: string,
  title: string,
  icon: string,
  tags: string[],
  stats: {
    attackdamage: number,
    attackdamageperlevel: number,
  },
  description: string,
};

class ChampionGrid extends React.Component<ChampionGridProps> {
  makeUpdater = (key: string) => (newValue: mixed, rowData: {}) => ({
    ...rowData,
    [key]: newValue,
  });

  makeStatsUpdater = (key: string) => (newValue: mixed, rowData: Object) => ({
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
    tags: (newValue: string, rowData: {}) => ({
      ...rowData,
      tags: newValue.split(','),
    }),
    attackdamage: this.makeStatsUpdater('attackdamage'),
    description: this.makeUpdater('description'),
  };

  iconRender = (value: string) => (
    <img src={value} alt={value} style={{ width: '50px' }} />
  );

  columns = [
    { name: 'id', label: 'ID', getter: (rowData: Champion) => rowData.key },
    {
      name: 'icon',
      label: 'Icon',
      getter: (rowData: Champion) => rowData.icon,
      updater: this.columnUpdaters.icon,
      render: this.iconRender,
      editor: TextEditor,
      editorDisplay: 'dialog',
    },
    {
      name: 'name',
      label: 'Name',
      getter: (rowData: Champion) => rowData.name,
      updater: this.columnUpdaters.name,
      editor: 'inline',
      sortable: true,
    },
    {
      name: 'title',
      label: 'Title',
      getter: (rowData: Champion) => rowData.title,
      updater: this.columnUpdaters.title,
      editor: 'inline',
    },
    {
      name: 'tags',
      label: 'Tags',
      getter: (rowData: Champion) => rowData.tags.join(','),
      updater: this.columnUpdaters.tags,
      editor: TextEditor,
      editorDisplay: 'dialog',
    },
    {
      name: 'attackdamage',
      label: 'AD',
      getter: (rowData: Champion) => rowData.stats.attackdamage,
      updater: this.columnUpdaters.attackdamage,
      editor: 'inline',
      groupBy: (rowData: Champion) =>
        rowData.stats.attackdamage > 52 ? 'Strong' : 'Weak',
    },
    {
      name: 'attackdamageperlevel',
      label: 'AD at level 18',
      getter: (rowData: Champion) =>
        round(
          rowData.stats.attackdamage + 17 * rowData.stats.attackdamageperlevel
        ),
    },
    {
      name: 'description',
      label: 'Description',
      getter: (rowData: Champion) => rowData.description,
      updater: this.columnUpdaters.description,
      editor: TextEditor,
      editorDisplay: 'popover',
    },
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

export default ChampionGrid;
