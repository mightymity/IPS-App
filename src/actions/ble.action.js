import { bleConstants } from '../_constants';
import { db }  from '../services/firebase_demo'


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

// export function updateData(items){
//     return {
//         type: bleConstants.UPDATE_DATA,
//         items: items
//     }
// }

export function updateAllPatient(){
    return function(dispatch){
        db.ref('/patients').on("value", function(snapshot){
            let data = snapshot.val()
            let items = Object.values(data)
            dispatch(listAllBlePatients2(items))
        })
    }
}


export function updateTrackingPatient(key){
    return function(dispatch){
        db.ref('/patients').child(key).on('value', function(snapshot){
            let item = snapshot.val()
            dispatch(trackingSelectedBlePatient2(item))
        })
    }
}

export function selectPatientToTrack(key){
    return {
        type: 'SELECT_PATIENT_TO_TRACK',
        key: key
    }
}

export function cancelSelectedTracking(){
    return {
        type: 'CANCEL_SELECTED_TRACKING'
    }
}