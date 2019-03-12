import { patientConstants } from '../_constants';

const defaultState = [
  { name: 'John Smith', ble: 'BLE', gps: 'GPS' },
  { name: 'Sarah Parker', ble: 'BLE', gps: 'GPS'},
  { name: 'James Black', ble: 'BLE', gps: 'GPS' },
]

export function patients(state = defaultState, action) {
  switch (action.type) {

    case patientConstants.CREATE_NEW_PATIENT: {
      const nextState = [...state, { name: action.name, ble: action.ble, gps: action.gps }];
      return nextState;
    } break;

    case patientConstants.DELETE_PATIENT_BY_INDEX: {
      const nextState = [...state];
      nextState.splice(action.index, 1);
      return nextState;
    } break;

    default:
      return state
  }
}
