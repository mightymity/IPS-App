import { patientConstants } from '../_constants';
import { db } from '../services/firebase_demo';
import { Actions } from 'react-native-router-flux';




const defaultState = {
  current: null,
  data: null,
  selectedName: null,
  selectedId: null,
  ble: null,
  gps: null,
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
      const patients = action.patients;

      const newArray = patients.map((patient, index) => {
        return {
          name: patient.name,
          id: patient.id,
          ble: patient.BLE.name,
          gps: patient.GPS.name,
        }
      });


      //nextState.data = newArray;

      
      // const p = {
      //     name: patient.name,
      //     id: patient.id,
      //     ble: patient.ble.name,
      //     gps: patient.gps.name,

      // }

      const nextState = {...state, data: newArray};
      // nextState.data = [...action.patients]
      // const nextState = {data:{newData}, current:{...state.current}}
      return nextState;
    } break;

    case "LIST_ALL_BLE": {
      const bles = action.ble;

      const newArray = bles.map((ble, index) => {
        return ble.id
      });


      const nextState = {...state, ble: action.ble};
      // nextState.data = [...action.patients]
      // const nextState = {data:{newData}, current:{...state.current}}
      return nextState;
    } break;

    case "LIST_ALL_GPS": {
      const gpss = action.gps;

      const newArray = gpss.map((gps, index) => {
        return gps.id
      });

      //nextState.data = newArray;

      
      // const p = {
      //     name: patient.name,
      //     id: patient.id,
      //     ble: patient.ble.name,
      //     gps: patient.gps.name,

      // }

      const nextState = {...state, gps: action.gps};
      // nextState.data = [...action.patients]
      // const nextState = {data:{newData}, current:{...state.current}}
      return nextState;
    } break;

    case "SELECT_EDIT_PATIENT": {
      const nextState = {...state, current: action.current}
      return nextState;
    } break;

    case "SELECT_HOSPITAL_PATIENT": {
      const nextState = {...state, selectedName: action.name, selectedId: action.id}
      return nextState;
    } break;


    default:
      return state
  }
}




