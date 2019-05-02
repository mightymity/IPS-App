import { patientConstants } from '../_constants';
import { db } from '../firebase';
import { Actions } from 'react-native-router-flux';




const defaultState = {
  current: null,
  data: null,
  selectedName: '',
  selectedId: null
}

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

    case "LIST_ALL_PATIENTS": {
      const nextState = {current:{...state}.current, data: action.patients };
      // nextState.data = [...action.patients]
      // const nextState = {data:{newData}, current:{...state.current}}
      return nextState;
    } break;

    case "SELECT_EDIT_PATIENT": {
      const nextState = {current: action.current, data: {...state.data}}
      return nextState;
    } break;

    case "SELECT_HOSPITAL_PATIENT": {
      const nextState = {current: {...state.current}, data: {...state.data}, selectedName: action.name, selectedId: action.id}
      return nextState;
    } break;


    default:
      return state
  }
}




