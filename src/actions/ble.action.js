import { bleConstants } from '../_constants';
// import {db} from '../services/firebase_demo'

// export const bleActions = {
//     trackingSelectedBlePatient,
//     listAllBlePatients
// };

export function trackingSelectedBlePatient(item) {
    return {
        type: bleConstants.TRACKING_SELECTED_BLE_PATIENT,
        item: item
    }
}

export function trackingSelectedBlePatient2(item) {
    return {
        type: 'TRACKING_SELECTED_BLE_PATIENT2',
        item: item
    }
} 

export function listAllBlePatients() {
    return {
        type: bleConstants.LIST_ALL_BLE_PATIENTS,
    }
}

export function listAllBlePatients2(items) {
    return {
        type: 'LIST_ALL_BLE_PATIENTS2',
        items: items
    }
}

export function updateData(items){
    return {
        type: bleConstants.UPDATE_DATA,
        items: items
    }
}

export function updateTrackedPatientLocation(item){
    return choosePatient(item)
}

// export function updateAllPatientLocation(){
//     return function(dispatch){
//         db.ref('/patient').child(item.id).on("value", function(snapshot){
//             let data = snapshot.val()
//             let items = Object.values(data)
//             dispatch(listAllBlePatients(items))
//         })
//     }
// }

// function choosePatient(item, dispatch = dispatch){
//     db.ref('/patient').child(item.id).on("value", function(snapshot){
//         let data = snapshot.val()
//         let item = Object.values(data)
//         dispatch(trackingSelectedBlePatient2(item))
//     })
// }