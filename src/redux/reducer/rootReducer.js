import {combineReducers} from 'redux';

import {authReducer} from './authReducer';
import {addTaskReducer} from './addTaskReducer';

const reducers = combineReducers({
  authReducer: authReducer,
  addTaskReducer: addTaskReducer,
});

export default reducers;
