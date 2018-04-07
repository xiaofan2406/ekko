import React from 'react';
import { Box } from 'nidalee';
import { TextEditor } from 'widgets';
import { Grid, Column } from 'ekko';
import { GridProvider, GridConsumer } from './Context';

const enhancer = render => (
  <GridConsumer>{({ byId }) => render({ data: byId })}</GridConsumer>
);

const ContextDemo = () => (
  <Box>
    <GridProvider>
      <GridConsumer>
        {({ byId, updateRow }) => (
          <Grid
            ids={Object.keys(byId)}
            onRowChange={updateRow}
            enhancer={enhancer}
          >
            <Column
              label="Title"
              getter={rowData => (rowData.gender === 'female' ? 'Ms' : 'Mr')}
            />
            <Column
              label="Name"
              getter={rowData => rowData.name}
              updater={newValue => rowData => ({ ...rowData, name: newValue })}
              editor={TextEditor}
              editorDisplay="popover"
            />
            <Column
              label="Type"
              getter={rowData => rowData.type}
              updater={newValue => rowData => ({ ...rowData, type: newValue })}
              editor={TextEditor}
              editorDisplay="dialog"
            />
            <Column
              label="Gender"
              getter={rowData => rowData.gender}
              updater={newValue => rowData => ({
                ...rowData,
                gender: newValue,
              })}
              editorDisplay="inline"
            />
          </Grid>
        )}
      </GridConsumer>
    </GridProvider>
  </Box>
);

export default ContextDemo;
