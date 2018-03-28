import React from 'react';
import PropTypes from 'prop-types';

const GridContext = React.createContext({});

export class GridProvider extends React.Component {
  static propTypes = {
    // byId initialization purpose
    byId: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onRecordChange: PropTypes.func.isRequired,
  };

  state = {
    byId: this.props.byId || {},
    ids: [],
  };

  updateRecord = (recordId, record) => {
    this.setState({
      byId: {
        ...this.state.byId,
        [recordId]: record,
      },
    });
    // The moment talk back to redux, byId changes
    // then the whole grid changes
    // this.props.onRecordChange(recordId, record);
  };

  render() {
    return (
      <GridContext.Provider
        value={{ ...this.state, updateRecord: this.updateRecord }}
      >
        {this.props.children}
      </GridContext.Provider>
    );
  }
}
export const GridConsumer = GridContext.Consumer;
