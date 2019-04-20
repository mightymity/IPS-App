import { combineReducers } from 'redux';
import { todos } from './todos.reducer';
import { patients } from './patients.reducer';
import { ble } from './ble.reducer'

const rootReducer = combineReducers({
  todos,
  patients,
  ble
});

export default rootReducer;