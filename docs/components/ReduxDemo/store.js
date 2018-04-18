import { createStore } from 'redux';
import champions from '../lolChampions2';

const initialState = {
  byId: champions.reduce((byId, champion) => {
    byId[champion.id] = champion;
    return byId;
  }, {}),
  ids: champions.map(champion => champion.id),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: action.rowData,
        },
      };
    default:
      return state;
  }
};

const updateRow = (id, rowData) => ({
  type: 'update',
  id,
  rowData,
});

const getIds = state => state.ids;

const store = createStore(reducer);

export const actions = {
  updateRow,
};

export const selectors = {
  getIds,
};

export default store;
