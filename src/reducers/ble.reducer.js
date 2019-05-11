import { bleConstants } from '../_constants';
//import users from '../services/demo_users'

const defaultState = {
  selected_ble: null,
  data_ble: null,
}

export function ble(state = defaultState, action) {
  switch (action.type) {

    case 'LIST_ALL_PATIENTS_BLE': {
      const nextState = {...state, data_ble: action.items}
      return nextState
    } break;

    case 'SELECT_PATIENT_TO_TRACK_BLE': {
      const nextState = {...state, selected_ble: action.key}
      return nextState
    } break;

    case 'CANCEL_SELECTED_TRACKING_BLE': {
      const nextState = {...state, selected_ble: null}
      return nextState
    } break;

    default:
      return state
  }
}