import { bleConstants } from '../_constants';
import users from '../services/demo_users'

// const defaultState = {
//   selected: null,
//   selected2: null,
//   data: users,
//   data2: null,
//   selectedData: null
// }

const defaultState = {
  selected_ble: null,
  data_ble: null,
  selected_data_ble: null
}

export function ble(state = defaultState, action) {
  switch (action.type) {

    case 'TRACKING_SELECTED_PATIENT_BLE': {
      const nextState = {...state, selected_data_ble: action.item}
      return nextState;
    } break;

    case 'LIST_ALL_PATIENTS_BLE': {
      const nextState = {...state, data_ble: action.items}
      return nextState
    } break;

    case 'SELECT_PATIENT_TO_TRACK_BLE': {
      const nextState = {...state, selected_ble: action.key}
      return nextState
    } break;

    case 'CANCEL_SELECTED_TRACKING_BLE': {
      const nextState = {...state, selected_ble: null, selected_data_ble: null}
      return nextState
    } break;

    default:
      return state
  }
}