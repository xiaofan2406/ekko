import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {GridContext} from './GridContext';
import {RowIdContext} from './RowContext';

export type CellName = string;
export type CellValue = unknown;
export type RowData = Record<CellName, unknown>;
export type RowId = string;
export type Data = Record<RowId, RowData>;
export type SetData = React.Dispatch<React.SetStateAction<Data>>;

export type ColumnPropFn<T> =
  | T
  | ((prop: {value: CellValue; rowData: RowData}) => T);

export type SummaryFnArgs = {
  column: Column;
  values: CellValue[];
};

export type Summary =
  | 'Unique'
  | 'Sum'
  | 'Count'
  | ((arg: SummaryFnArgs) => ReactNode);

export type Column = {
  name: CellName;
  getValue?: (rowData: RowData, rwoId: RowId) => CellValue;

  editable?: ColumnPropFn<boolean>;
  onEdit?: (newValue: CellValue) => void;

  summary?: Summary;
  header?: (arg: SummaryFnArgs) => ReactNode;

  sticky: boolean;
};

export type CellState = {
  column: Column;

  value: CellValue;
  editable: boolean;
  onEdit: (newValue: CellValue) => void;
};

export type RowState = {
  rowId: RowId;
  rowData: RowData;
  cells: Record<CellName, CellState>;
};

export type RowCache = [RowData, Column[], RowState];
export type Cache = Record<RowId, RowCache>;

export type GridState = {
  rows: Record<RowId, RowState>;
  cacheRef: MutableRefObject<Cache>;
  setDataRef: MutableRefObject<SetData>;
  data: Data;
  columns: Column[];
  // selections: unknown[];
  // filters: unknown[];
  // sorting: object;
  // grouping: object;
};

export function useStore() {
  const {store} = useContext(GridContext);
  return store;
}

export function useSlice<Slice>(
  selector?: keyof GridState | ((state: GridState) => Slice)
) {
  const {useSlice: useCtxSlice} = useContext(GridContext);
  return useCtxSlice(selector);
}

export function useCacheRef(): GridState['cacheRef'] {
  return useSlice('cacheRef');
}

export function useSetDataRef(): GridState['setDataRef'] {
  return useSlice('setDataRef');
}

export function useColumns(): GridState['columns'] {
  return useSlice('columns');
}

export function useData(): GridState['data'] {
  return useSlice('data');
}

export function useRowId() {
  return useContext(RowIdContext);
}

export function useRow({rowId}: {rowId: RowId}) {
  const getRow = useCallback(
    (state: GridState) => {
      return state.rows[rowId];
    },
    [rowId]
  );
  return useSlice(getRow);
}

export function useCell(name: CellName, rowId: RowId) {
  const getCell = useCallback(
    (state: GridState) => {
      return state.rows[rowId]?.cells[name];
    },
    [name, rowId]
  );

  const cell = useSlice(getCell);
  return cell;
}

export function getRowsState(
  data: Data,
  columns: Column[],
  cacheRef: GridState['cacheRef'],
  setDataRef: GridState['setDataRef']
) {
  const array = Object.keys(data).map((rowId) => {
    const rowData = data[rowId];
    return getRowState(rowId, rowData, columns, cacheRef, setDataRef);
  });

  return keyBy(array, (entry: RowState) => entry.rowId);
}

export function getRowState(
  rowId: RowId,
  rowData: RowData,
  columns: Column[],
  cacheRef: GridState['cacheRef'],
  setDataRef: GridState['setDataRef']
) {
  let cacheEntry = cacheRef.current[rowId];
  const shouldUseCache =
    cacheEntry &&
    Object.is(cacheEntry[0], rowData) &&
    Object.is(cacheEntry[1], columns);
  if (shouldUseCache) return cacheEntry[2];

  const cells = keyBy(
    columns.map((column) => {
      const getValue = column.getValue ?? (() => rowData[column.name]);
      const value = getValue(rowData, rowId);

      const editable =
        typeof column.editable === 'function'
          ? column.editable({value, rowData})
          : !!column.editable;

      const onEditDefault = (newValue: CellValue) => {
        setDataRef.current((prev) => ({
          ...prev,
          [rowId]: {
            ...prev[rowId],
            [column.name]: newValue,
          },
        }));
      };
      const onEdit = column.onEdit ?? onEditDefault;

      return {
        column,
        value,
        editable,
        onEdit,
      };
    }),
    (entry) => entry.column.name
  );

  const result = {rowId, rowData, cells};
  cacheEntry = [rowData, columns, result];
  return result;
}

export function summaryUnique({values}: SummaryFnArgs) {
  const map = new Map();
  values.forEach((entry) => {
    if (!map.has(entry)) {
      map.set(entry, entry);
    }
  });
  return map.size;
}

export function summarySum({values}: SummaryFnArgs) {
  let total = typeof values[0] === 'string' ? '' : 0;
  values.forEach((entry) => {
    // @ts-expect-error += should work on string and number
    total += entry as string | number;
  });
  return total;
}

export function summaryCount({values}: SummaryFnArgs) {
  return values.length;
}

export function useIsFirstRender() {
  const renderRef = useRef(true);

  if (renderRef.current === true) {
    renderRef.current = false;
    return true;
  }

  return renderRef.current;
}

type Dependencies = Record<string, unknown>;

export function useRenderTrace(deps: Dependencies, componentName = 'Comp') {
  const prevDeps = useRef<Dependencies>({});
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (prevDeps.current) {
      const allKeys = Object.keys({...prevDeps.current, ...deps});
      const changedDeps: Dependencies = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevDeps.current[key], deps[key])) {
          changedDeps[key] = {
            from: prevDeps.current[key],
            to: deps[key],
          };
        }
      });

      if (!isFirst) {
        if (Object.keys(changedDeps).length > 0) {
          console.log('[useRenderTrace]', componentName, changedDeps);
        } else {
          console.log(
            '[useRenderTrace]',
            `${componentName} rendered. Either parent rerendered or some other dependencies are not provided.`
          );
        }
      }
    }

    prevDeps.current = deps;
  });
}

export function useCallbackRef<T>(callback: T) {
  const ref = useRef(callback);

  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return ref;
}

export function useToggle(initialState: boolean | (() => boolean)) {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);

  return [value, {toggle, on, off}] as const;
}

export function keyBy<T>(array: T[], predicate: (entry: T) => string) {
  return array.reduce(
    (prev, current) => {
      const key = predicate(current);
      prev[key] = current;
      return prev;
    },
    {} as Record<string, T>
  );
}
