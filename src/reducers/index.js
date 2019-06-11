import { combineReducers } from 'redux';
import { todos } from './todos.reducer';
import { patients } from './patients.reducer';
import { caretakers } from './caretakers.reducer';
import { ble } from './ble.reducer'
import { gps } from './gps.reducer'


const rootReducer = combineReducers({
  todos,
  patients,
  caretakers,
  ble,
  gps,

});

export default rootReducer;