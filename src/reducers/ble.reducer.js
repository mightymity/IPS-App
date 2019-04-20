import { bleConstants } from '../_constants';
import users from '../services/demo_users'

const defaultState = {
  selected: null,
  selected2: null,
  data: users,
  data2: null
}

export function ble(state = defaultState, action) {
  switch (action.type) {

    case bleConstants.TRACKING_SELECTED_BLE_PATIENT: {
      const nextState = {selected: action.item, selected2: null, data: [...state.data], data2: [...state.data2]}
      return nextState;
    } break;

    case 'TRACKING_SELECTED_BLE_PATIENT2': {
      const nextState = {selected: [...state.selected], selected2: action.item, data: [...state.data], data2: [...state.data2]}
      return nextState;
    } break;

    case bleConstants.LIST_ALL_BLE_PATIENTS: {
      const nextState = {selected: null, selected2: null, data: [...state.data], data2: [...state.data2]}
      return nextState
    } break;

    case 'LIST_ALL_BLE_PATIENTS2': {
      const nextState = {selected: null, selected2: null, data: [...state.data], data2: action.items}
      return nextState
    } break;

    case bleConstants.UPDATE_DATA:{
      const nextState = {selected: null, data:[...state.data], data2: action.items}
      return nextState
    }break;

    default:
      return state
  }
}