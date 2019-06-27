import React from 'react';
import DataContext, { DataProvider } from './DataContext';
import Demo from './Demo';

const Child = () => {
  console.log('Child');
  const { addData } = React.useContext(DataContext);
  return (
    <div>
      Child<button onClick={() => addData()}>add</button>
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Demo />
      <Child />
    </DataProvider>
  );
}

export default App;
