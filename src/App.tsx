import {createContext, memo, useContext, useMemo, useState} from 'react';
import {Grid, DataRows, Toolbar, SummaryRow, HeaderRow} from './lib';
import './App.css';
import {Column} from './lib/utils';

const initialData = {
  aaa: {name: 'aaa'.repeat(6), age: 20, skills: ['a']},
  bbb: {name: 'bbb', age: 22, skills: ['a', 'b', 'c']},
  ccc: {name: 'ccc', age: 21, skills: ['c']},
  ddd: {name: 'ddd', age: 90, skills: ['b', 'c']},
};

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [, forceUpdate] = useState();
  const [data, setData] = useState(initialData);
  const value = useMemo(() => [data, setData], [data]);

  return (
    <DataContext.Provider value={value}>
      {children}

      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const name = e.currentTarget.value;
            setData((prev) => ({...prev, [name]: {name, age: 99, skills: []}}));
            e.currentTarget.value = '';
          }
        }}
      />
      <button onClick={() => forceUpdate({})}>provider forceUpdate</button>
    </DataContext.Provider>
  );
};
const useData = () => useContext(DataContext);

const columns: Column[] = [
  {
    name: 'id',
    getValue: (rowData, rowId) => rowId[0],
    summary: 'Count',
    sticky: true,
  },
  {name: 'name', type: 'string', editable: true, sticky: true},
  {name: 'age', type: 'number', summary: 'Sum', sticky: true},
  {
    name: 'skillCount',
    type: 'number',
    getValue: (rowData) => rowData.skills.length,
    summary: 'Unique',
    sticky: true,
    width: 160,
  },
  {
    name: 'name2',
    getValue: (rowData) => rowData.name,
    editable: true,
    width: 600,
  },
  {name: 'name3', getValue: (rowData) => rowData.name, editable: true},
  {name: 'name4', getValue: (rowData) => rowData.name, editable: true},
  {
    name: 'name5',
    getValue: (rowData) => `${rowData.name} last`,
    editable: true,
    width: 200,
  },
];

const Demo = memo(() => {
  const [data, setData] = useData();
  const [, forceUpdate] = useState();

  return (
    <div style={{width: 600}}>
      <Grid
        data={data}
        setData={setData}
        columns={columns}
        toolbar={<Toolbar />}
      >
        <div>hello</div>
      </Grid>
      <button onClick={() => forceUpdate({})}>self forceUpdate</button>
    </div>
  );
});

const App = () => {
  const [, forceUpdate] = useState();
  return (
    <DataProvider>
      <div>
        <Demo />
        <button onClick={() => forceUpdate({})}>parent forceUpdate</button>
      </div>
    </DataProvider>
  );
};

export default App;
