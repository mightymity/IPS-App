import { bleConstants } from '../_constants';
//import users from '../services/demo_users'

const defaultState = {
  selected_ble: null,
  data_ble: null,
  ble_map: null,
  building_index: null,
  floor_number: null,
}

export function ble(state = defaultState, action) {
  switch (action.type) {

    case 'LIST_ALL_PATIENTS_BLE': {
      const nextState = { ...state, data_ble: action.items }
      return nextState
    } break;

    case 'SELECT_PATIENT_TO_TRACK_BLE': {
      const nextState = { ...state, selected_ble: action.key }
      return nextState
    } break;

    case 'CANCEL_SELECTED_TRACKING_BLE': {
      const nextState = { ...state, selected_ble: null }
      return nextState
    } break;

    case 'LOAD_MAP': {
      if (state.building_index === null && state.floor_number === null) {
        const nextState = { ...state, ble_map: action.items, building_index: action.index, floor_number: action.number }
        return nextState
      }
      else{
        const nextState = { ...state, ble_map: action.items }
        return nextState
      }
    } break;

    case 'SET_CURRENT_BUILDING': {
      const nextState = { ...state, building_index: action.index }
      return nextState
    } break;

    case 'SET_CURRENT_FLOOR': {
      const nextState = { ...state, floor_number: action.number }
      return nextState
    } break;

    default:
      return state
  }
}