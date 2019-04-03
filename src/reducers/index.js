import { combineReducers } from 'redux';
import { todos } from './todos.reducer';
import { patients } from './patients.reducer';
import { caretakers } from './caretakers.reducer';

const rootReducer = combineReducers({
  todos,
  patients,
  caretakers
});

export default rootReducer;