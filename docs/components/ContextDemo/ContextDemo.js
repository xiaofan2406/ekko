// /* @flow */
// import * as React from 'react';
// import { TextEditor } from 'widgets';
// import { Grid, Column } from 'ekko';
// import { GridProvider, GridConsumer } from './Context';

// const round = value => (Math.round(+value * 1000) / 1000).toFixed(3);

// class ContextDemo extends React.Component<{}> {
//   rowDecorator = (Component: React.ComponentType<any>) => (props: {
//     id: string,
//   }) => (
//     <GridConsumer>
//       {({ byId }) => <Component {...props} data={byId[props.id]} />}
//     </GridConsumer>
//   );

//   makeUpdater = (key: string) => (newValue: mixed) => (rowData: Object) => ({
//     ...rowData,
//     [key]: newValue,
//   });

//   makeStatsUpdater = (key: string) => (newValue: mixed) => (
//     rowData: Object
//   ) => ({
//     ...rowData,
//     stats: {
//       ...rowData.stats,
//       [key]: +newValue,
//     },
//   });

//   columns = [
//     { name: 'id', label: 'ID', getter: rowData => rowData.key },
//     {
//       name: 'icon',
//       label: 'Icon',
//       getter: rowData => rowData.icon,
//       updater: this.columnUpdaters.icon,
//       render: this.iconRender,
//       editor: TextEditor,
//       editorDisplay: 'dialog',
//     },
//     {
//       name: 'name',
//       label: 'Name',
//       getter: rowData => rowData.name,
//       updater: this.columnUpdaters.name,
//       editor: 'inline',
//       sortable: true,
//     },
//     {
//       name: 'title',
//       label: 'Title',
//       getter: rowData => rowData.title,
//       updater: this.columnUpdaters.title,
//       editor: 'inline',
//     },
//     {
//       name: 'tags',
//       label: 'Tags',
//       getter: rowData => rowData.tags.join(','),
//       updater: this.columnUpdaters.tags,
//       editor: TextEditor,
//       editorDisplay: 'dialog',
//     },
//     {
//       name: 'attackdamage',
//       label: 'AD',
//       getter: rowData => rowData.stats.attackdamage,
//       updater: this.columnUpdaters.attackdamage,
//       editor: 'inline',
//     },
//     {
//       name: 'attackdamageperlevel',
//       label: 'AD at level 18',
//       getter: rowData =>
//         round(
//           rowData.stats.attackdamage + 17 * rowData.stats.attackdamageperlevel
//         ),
//     },
//     {
//       name: 'description',
//       label: 'Description',
//       getter: rowData => rowData.description,
//       updater: this.columnUpdaters.description,
//       editor: TextEditor,
//       editorDisplay: 'popover',
//     },
//   ];

//   render() {
//     return (
//       <GridProvider>
//         <GridConsumer>
//           {({ ids, updateRow }) => (
//             <Grid
//               ids={ids}
//               onRowChange={updateRow}
//               decorator={this.rowDecorator}
//             >
//               <Column label="ID" getter={rowData => rowData.key} />
//               <Column
//                 label="Icon"
//                 getter={rowData => rowData.icon}
//                 updater={this.makeUpdater('icon')}
//                 render={value => (
//                   <img src={value} alt={value} style={{ width: '50px' }} />
//                 )}
//                 editor="inline"
//               />
//               <Column
//                 label="Name"
//                 getter={rowData => rowData.name}
//                 updater={this.makeUpdater('name')}
//                 editor="inline"
//                 sortable
//               />
//               <Column
//                 label="Title"
//                 getter={rowData => rowData.title}
//                 updater={this.makeUpdater('title')}
//                 editor="inline"
//               />
//               <Column
//                 label="Tags"
//                 getter={rowData => rowData.tags.join(',')}
//                 updater={newValue => rowData => ({
//                   ...rowData,
//                   tags: newValue.split(','),
//                 })}
//                 editor={TextEditor}
//                 editorDisplay="dialog"
//               />
//               <Column
//                 label="HP"
//                 getter={rowData => rowData.stats.hp}
//                 updater={this.makeStatsUpdater('hp')}
//                 editor="inline"
//                 sortable
//               />
//               <Column
//                 label="HP at level 18"
//                 getter={rowData =>
//                   rowData.stats.hp + 17 * rowData.stats.hpperlevel
//                 }
//               />
//               <Column
//                 label="MP"
//                 getter={rowData => rowData.stats.mp}
//                 updater={this.makeStatsUpdater('mp')}
//                 editor="inline"
//               />
//               <Column
//                 label="MP at level 18"
//                 getter={rowData =>
//                   round(rowData.stats.mp + 17 * rowData.stats.mpperlevel)
//                 }
//               />
//               <Column
//                 label="AD"
//                 getter={rowData => rowData.stats.attackdamage}
//                 updater={this.makeStatsUpdater('attackdamage')}
//                 editor="inline"
//               />
//               <Column
//                 label="AD at level 18"
//                 getter={rowData =>
//                   round(
//                     rowData.stats.attackdamage +
//                       17 * rowData.stats.attackdamageperlevel
//                   )
//                 }
//               />
//               <Column
//                 label="Description"
//                 getter={rowData => rowData.description}
//                 updater={this.makeUpdater('description')}
//                 editor={TextEditor}
//                 editorDisplay="popover"
//               />
//             </Grid>
//           )}
//         </GridConsumer>
//       </GridProvider>
//     );
//   }
// }

// export default ContextDemo;
