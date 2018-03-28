import React from 'react';
// import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { DialogEditor } from 'widgets';
import { Grid, Column } from 'ekko';
import { GridProvider, GridConsumer } from './Context';

const enhancer = render => (
  <GridConsumer>{({ byId }) => render({ data: byId })}</GridConsumer>
);

const ContextDemo = () => (
  <GridProvider>
    <GridConsumer>
      {({ byId, updateRow }) => (
        <Grid
          ids={Object.keys(byId)}
          onRowChange={updateRow}
          enhancer={enhancer}
        >
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
      )}
    </GridConsumer>
  </GridProvider>
);

export default ContextDemo;
