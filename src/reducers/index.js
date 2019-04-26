import { combineReducers } from 'redux';
import { todos } from './todos.reducer';
import { patients } from './patients.reducer';
import { ble } from './ble.reducer'
import { gps } from './gps.reducer'

const rootReducer = combineReducers({
  todos,
  patients,
  ble,
  gps
});

export default rootReducer;