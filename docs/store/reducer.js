import { combineReducers } from 'redux';

import championsReducer from './champions/reducer';

export default combineReducers({
  champions: championsReducer,
});
