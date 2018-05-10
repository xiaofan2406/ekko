import actionTypes from './actions';

export default (state = {}, action) => {
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
