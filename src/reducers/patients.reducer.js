import { patientConstants } from '../_constants';
import { db } from '../firebase';
import { Actions } from 'react-native-router-flux';



const defaultState = {
  data: [
    { id: '01', name: 'John Smith', ble: 'BLE', gps: 'GPS' },
    { id: '02', name: 'Sarah Parker', ble: 'BLE', gps: 'GPS' },
    { id: '03', name: 'James Black', ble: 'BLE', gps: 'GPS' },
  ],
  current: 'a',
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

    case "LIST_ALL_PATIENT_SUCCESS": {
      // return [...state, ...action.patients];
      // const nextState = {...state};
      // nextState.data = action.patients;
      // return nextState
      const nextState = { ...state };
      nextState.data = [...action.patients]
      // const nextState = {data:{newData}, current:{...state.current}}
      return nextState;
    } break;

    // case "CREATE_NEW_PATIENT_REQUEST": {

    //   return [...action.patients];
    // }

    case "CREATE_NEW_PATIENT_SUCCESS": {
      const nextState = { ...state };
      nextState.data = [...state.data,
      {
        id: action.data.id,
        name: action.data.name,
        ble: action.data.ble,
        gps: action.data.gps
      }];
      
      // const nextState = [...state, {id: action.data.id, name: action.data.name, ble: action.data.ble, gps: action.data.gps}];
      return nextState;
    } break;

    case "EDIT_PATIENT_BY_INDEX": {
      const updatedItems = {...state}.data.map(item => {
          if(item.id === {...state}.current){
            if (action.ble != '') {
              db.ref('/patients').child({...state}.current).update({ ble: action.ble })
              item.ble = action.ble;
            }
  
            if (action.gps != '') {
              db.ref('/patients').child({...state}.current).update({ gps: action.gps })
              item.gps = action.gps;
            }

          }
          return item
        })
        return {...state, data:updatedItems}
      
    } break;

    // case patientConstants.CREATE_NEW_PATIENT: {
    //   //const nextState = [...state, { avatar: action.avatar, name: action.name, ble: action.ble, gps: action.gps, current: aciton.current }];
    //   const nextState = { ...state };
    //   nextState.data = [...state.data,
    //   {
    //     id: action.data.id,
    //     name: action.data.name,
    //     ble: action.data.ble,
    //     gps: action.data.gps
    //   }];
    //   return nextState;
    // } break;

    case patientConstants.DELETE_PATIENT_BY_INDEX: {
      // const nextState = [...state];
      // nextState.splice(action.index, 1);
      const nextState = { ...state };
      nextState.data.splice(action.index, 1);
      return nextState;
    } break;

    case patientConstants.SET_CURRENT: {
      const newCurrent = { ...state };
      newCurrent.current = action.current;
      return newCurrent;
      // const updatedItems = state.map(item => {
      //   if(item.current === true){
      //     // thisItem = [...item];
      //     // thisItem.ble = action.ble;
      //     // thisItem.gps = action.gps;
      //     // thisItem.current = false;
      //     // item.ble = action.ble;
      //     // item.gps = action.gps;
      //     item.current = false;
      //     //return thisItem
      //   }
      //   return item
      // })
      // return updatedItems
    } break;

    // case patientConstants.EDIT_PATIENT_BY_INDEX: {
    //   console.log('inEdit')
    //   //db.ref('/patients').child('mike').update({'dateOfBirth': moment(value.dateOfBirth).toDate().getTime()})
    //   const nextState = { ...state };
    //   console.log('gsdgasg', nextState);
    //   const updatedItems = nextState.data.map(item => {
    //     if (item.id == nextState.current) {
    //       // thisItem = [...item];
    //       // thisItem.ble = action.ble;
    //       // thisItem.gps = action.gps;
    //       // thisItem.current = false;
    //       if (action.ble != '') {
    //         db.ref('/patients').child(nextState.current).update({ ble: action.ble })
    //         item.ble = action.ble;
    //       }

    //       if (action.gps != '') {
    //         db.ref('/patients').child(nextState.current).update({ gps: action.gps })
    //         item.gps = action.gps;
    //       }
    //       // item.current = false;
    //       //return thisItem
    //     }
        
    //     return item
    //   })
    //   return updatedItems
    //   // const updatedItems = state.map(item => {
    //   //   if(item.current === true){
    //   //     // thisItem = [...item];
    //   //     // thisItem.ble = action.ble;
    //   //     // thisItem.gps = action.gps;
    //   //     // thisItem.current = false;
    //   //     if(action.ble != ''){
    //   //       item.ble = action.ble;
    //   //     }

    //   //     if(action.gps != ''){
    //   //       item.gps = action.gps;
    //   //     }
    //   //     item.current = false;
    //   //     //return thisItem
    //   //   }
    //   //   return item
    //   // })
    //   // return updatedItems
    // } break;


    default:
      return state
  }
}
