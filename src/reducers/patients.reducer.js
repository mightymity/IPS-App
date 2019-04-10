import { patientConstants } from '../_constants';

const defaultState = [
  { avatar: '../assets/images/default.png', name: 'John Smith', ble: 'BLE', gps: 'GPS', current: false },
  { avatar: '../assets/images/default.png', name: 'Sarah Parker', ble: 'BLE', gps: 'GPS', current: false},
  { avatar: '../assets/images/default.png', name: 'James Black', ble: 'BLE', gps: 'GPS', current: false },
]

// const initState = {
//   data: [
//     { avatar: '../assets/images/default.png', name: 'John Smith', ble: 'BLE', gps: 'GPS', current: false },
//     { avatar: '../assets/images/default.png', name: 'Sarah Parker', ble: 'BLE', gps: 'GPS', current: false},
//     { avatar: '../assets/images/default.png', name: 'James Black', ble: 'BLE', gps: 'GPS', current: false },
//   ],
//   currentIndex: null,
// }



export function patients(state = defaultState, action) {
  switch (action.type) {

    case "LIST_ALL_PATIENT_SUCCESS": {
      return [...state, ...action.patients];
    }

    case "CREATE_NEW_PATIENT_SUCCESS": {
      const nextState = [...state, {name: action.data.name, ble: action.data.ble, gps: action.data.gps}];
      return nextState;
    } break;

    case patientConstants.CREATE_NEW_PATIENT: {
      const nextState = [...state, { avatar: action.avatar, name: action.name, ble: action.ble, gps: action.gps, current: aciton.current }];
      return nextState;
    } break;

    case patientConstants.DELETE_PATIENT_BY_INDEX: {
      const nextState = [...state];
      nextState.splice(action.index, 1);
      return nextState;
    } break;

    case patientConstants.SET_CURRENT: {
      const updatedItems = state.map(item => {
        if(item.current === true){
          // thisItem = [...item];
          // thisItem.ble = action.ble;
          // thisItem.gps = action.gps;
          // thisItem.current = false;
          // item.ble = action.ble;
          // item.gps = action.gps;
          item.current = false;
          //return thisItem
        }
        return item
      })
      return updatedItems
    } break;

    case patientConstants.EDIT_PATIENT_BY_INDEX: {
      const updatedItems = state.map(item => {
        if(item.current === true){
          // thisItem = [...item];
          // thisItem.ble = action.ble;
          // thisItem.gps = action.gps;
          // thisItem.current = false;
          if(action.ble != ''){
            item.ble = action.ble;
          }

          if(action.gps != ''){
            item.gps = action.gps;
          }
          item.current = false;
          //return thisItem
        }
        return item
      })
      return updatedItems
    } break;


    default:
      return state
  }
}
