import React from 'react';
import PropTypes from 'prop-types';

const GridContext = React.createContext({});

export class GridProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    byId: {
      1: { name: 'hei', gender: 'wha' },
      2: { name: 'lol', gender: 'yea' },
    },
  };

  updateRow = (rowId, rowData) => {
    this.setState({
      byId: {
        ...this.state.byId,
        [rowId]: rowData,
      },
    });
  };

  render() {
    return (
      <GridContext.Provider
        value={{ ...this.state, updateRow: this.updateRow }}
      >
        {this.props.children}
      </GridContext.Provider>
    );
  }
}
export const GridConsumer = GridContext.Consumer;
