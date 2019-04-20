
import { caretakerConstants } from '../_constants';

const defaultState = {
  current: null,
  data: null
}

export function caretakers(state = defaultState, action) {
  switch (action.type) {

    case "LIST_ALL_CARETAKERS": {
      const nextState = {current:{...state.current}, data: action.caretakers };
      return nextState;
    } break;

    case "SELECT_EDIT_CARETAKER": {
      const nextState = {current: action.current, data: {...state.data}}
      return nextState;
    } break;


    default:
      return state
  }
}