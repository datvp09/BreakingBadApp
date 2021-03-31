import {combineReducers} from 'redux';
import listReducer from './listReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  list: listReducer,
  data: appReducer,
});

export default rootReducer;
