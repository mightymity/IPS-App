import { bleConstants } from '../_constants';
import users from '../services/demo_users'

const defaultState = {
  selected_gps: null,
  data_gps: null,
}

export function gps(state = defaultState, action) {
  switch (action.type) {

    case 'LIST_ALL_PATIENTS_GPS': {
      const nextState = {...state, data_gps: action.items}
      return nextState
    } break;

    case 'SELECT_PATIENT_TO_TRACK_GPS': {
      const nextState = {...state, selected_gps: action.key}
      return nextState
    } break;

    case 'CANCEL_SELECTED_TRACKING_GPS': {
      const nextState = {...state, selected_gps: null}
      return nextState
    } break;

    default:
      return state
  }
}