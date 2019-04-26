import { bleConstants } from '../_constants';
import users from '../services/demo_users'

const defaultState = {
  selected2: null,
  data2: null,
  selectedData: null
}

export function gps(state = defaultState, action) {
  switch (action.type) {

    case 'TRACKING_SELECTED_PATIENT_GPS': {
      const nextState = {...state, selected2: state.selected2, selectedData: action.item}
      return nextState;
    } break;


    case 'LIST_ALL_PATIENTS_GPS': {
      const nextState = {...state, data2: action.items}
      return nextState
    } break;


    case 'SELECT_PATIENT_TO_TRACK_GPS': {
      const nextState = {...state, selected: null, selected2: action.key}
      return nextState
    } break;

    case 'CANCEL_SELECTED_TRACKING_GPS': {
      const nextState = {...state, selected2: null, selectedData: null}
      return nextState
    } break;

    default:
      return state
  }
}