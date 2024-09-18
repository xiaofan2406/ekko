import {createContext, ReactNode, useEffect, useRef, useState} from 'react';
import {createStore} from 'ryze';
import {
  Cache,
  Column,
  Data,
  getRowsState,
  GridState,
  SetData,
  useCallbackRef,
  useStore,
} from './utils';

export const GridContext = createContext(
  {} as ReturnType<typeof createStore<GridState>>
);

const SyncProps = ({data, columns}: {data: Data; columns: Column[]}) => {
  const store = useStore();

  useEffect(() => {
    store.setState((prev) => ({
      ...prev,
      data,
    }));
  }, [store, data]);

  useEffect(() => {
    store.setState((prev) => ({
      ...prev,
      columns,
    }));
  }, [store, columns]);

  return null;
};

export const GridProvider = ({
  data,
  setData,
  columns,
  children,
}: {
  data: Data;
  setData: SetData;
  columns: Column[];
  children: ReactNode;
}) => {
  const cacheRef = useRef({} as Cache);
  const setDataRef = useCallbackRef(setData);

  const [value] = useState(() =>
    createStore(() => ({
      rows: getRowsState(data, columns, cacheRef, setDataRef),
      cacheRef,
      setDataRef,
      data,
      columns,
      // selections: [],
      // filters: [],
      // sorting: {},
      // grouping: {},
    }))
  );

  return (
    <GridContext.Provider value={value}>
      <SyncProps data={data} columns={columns} />
      {children}
    </GridContext.Provider>
  );
};
