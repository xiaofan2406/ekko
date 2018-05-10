import { combineReducers } from 'redux';
import actionTypes from './actions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD:
    case actionTypes.UPDATE:
      return {
        ...state,
        [action.id]: action.champion,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return [...state, action.id];
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
});
