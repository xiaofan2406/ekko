import { createStore } from 'redux';

const initialState = {
  byId: {
    1: { name: 'Ezreal', gender: 'male', type: 'ADC' },
    2: { name: 'Syndra', gender: 'female', type: 'Mage' },
  },
  ids: ['1', '2'],
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
