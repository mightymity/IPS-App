import { patientConstants } from '../_constants';

const defaultState = [
  { avatar: '../assets/images/default.png', name: 'John Smith', ble: 'BLE', gps: 'GPS' },
  { avatar: '../assets/images/default.png', name: 'Sarah Parker', ble: 'BLE', gps: 'GPS'},
  { avatar: '../assets/images/default.png', name: 'James Black', ble: 'BLE', gps: 'GPS' },
]

export function patients(state = defaultState, action) {
  switch (action.type) {

    case patientConstants.CREATE_NEW_PATIENT: {
      const nextState = [...state, { avatar: action.avatar, name: action.name, ble: action.ble, gps: action.gps }];
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
