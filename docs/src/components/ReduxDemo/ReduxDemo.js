import React from 'react';
import { Provider, connect } from 'react-redux';
import Button from 'material-ui/Button';
import { DialogEditor } from 'widgets';
import { Grid, Column } from 'ekko';
import store, { actions, selectors } from './store';

const mapState = state => ({
  byId: selectors.getById(state),
});

class MyGrid extends React.Component {
  componentWillReceiveProps(nextProps) {
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] !== this.props[key]) {
        console.log(`${key} changed`);
      }
    });
  }
  render() {
    const { byId, onRecordChange } = this.props;
    return (
      <Grid initialRecordsById={byId} onRecordChange={onRecordChange}>
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
      </Grid>
    );
  }
}

const ConnectedGrid = connect(mapState, {
  onRecordChange: actions.updateRow,
})(MyGrid);

class ReduxExample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedGrid />
      </Provider>
    );
  }
}

export default ReduxExample;
