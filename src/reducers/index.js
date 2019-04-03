import { combineReducers } from 'redux';
import { todos } from './todos.reducer';
import { patients } from './patients.reducer';

const rootReducer = combineReducers({
  todos,
  patients
});

export default rootReducer;