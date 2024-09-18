import {createContext, ReactNode, useEffect, useState} from 'react';
import {
  Column,
  getRowState,
  GridState,
  RowData,
  RowId,
  useCacheRef,
  useRenderTrace,
  useSetDataRef,
  useStore,
} from './utils';

export const RowIdContext = createContext('' as RowId);

export const RowProvider = ({
  rowId,
  rowData,
  columns,
  children,
}: {
  rowId: string;
  rowData: RowData;
  columns: Column[];
  children: ReactNode;
}) => {
  const [inited, setInited] = useState(false);
  const store = useStore();
  const cacheRef = useCacheRef();
  const setDataRef = useSetDataRef();

  useEffect(() => {
    const rowState = getRowState(rowId, rowData, columns, cacheRef, setDataRef);

    store.setState((prev: GridState) => ({
      ...prev,
      rows: {
        ...prev.rows,
        [rowId]: rowState,
      },
    }));

    setInited(true);
  }, [store, rowId, rowData, columns, cacheRef, setDataRef]);

  useRenderTrace(
    {columns, rowId, children, inited, store, rowData},
    `RowProvider`
  );
  return !inited ? null : (
    <RowIdContext.Provider value={rowId}>{children}</RowIdContext.Provider>
  );
};
