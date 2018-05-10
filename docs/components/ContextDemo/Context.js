// /* eslint-disable react/sort-comp */
// import React from 'react';
// import PropTypes from 'prop-types';
// import champions from 'utils/lolChampions2';

// const GridContext = React.createContext({});

// export class GridProvider extends React.Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//   };

//   updateRow = (rowId, rowData) => {
//     this.setState({
//       context: {
//         ...this.state.context,
//         byId: {
//           ...this.state.context.byId,
//           [rowId]: rowData,
//         },
//       },
//     });
//   };

//   state = {
//     context: {
//       byId: champions.reduce((byId, champion) => {
//         byId[champion.id] = champion;
//         return byId;
//       }, {}),
//       ids: champions.map(champion => champion.id),
//       updateRow: this.updateRow,
//     },
//   };

//   render() {
//     return (
//       <GridContext.Provider value={this.state.context}>
//         {this.props.children}
//       </GridContext.Provider>
//     );
//   }
// }
// export const GridConsumer = GridContext.Consumer;
