import { bleConstants } from '../_constants';
import { db } from '../services/firebase_demo'


export function listAllPatientsBle(items) {
    return {
        type: 'LIST_ALL_PATIENTS_BLE',
        items: items
    }
}

export function loadMap(items){
    const initialBuildingName = items[1].name
    const initialfloorNumber = Object.keys(items[1].floors)[0]
    return {
        type: 'LOAD_MAP',
        items: items,
        name: initialBuildingName,
        number: initialfloorNumber
    }
}

export function setCurrentLocation(name, number){
    return {
        type: 'SET_CURRENT_LOCATION',
        name: name,
        number: number
    }
}

export function updateAllPatientBle() {
    return function (dispatch) {
        db.ref('/patients').orderByChild('/status').equalTo('in').on('value', snapshot => {
            let data = snapshot.val()
            let items = Object.values(data);
            dispatch(listAllPatientsBle(items))
        })
    }
}

export function updateTrackingPatientBle(key) {
    return function (dispatch) {
        db.ref('/patients').child(key).on('value', function (snapshot) {
            let item = snapshot.val()
            dispatch(trackingSelectedPatientBle(item))
        })
    }
}

export function updateMap() {
    return function (dispatch) {
        db.ref('/buildings').on("value", function (snapshot) {
            let data = snapshot.val()
            let items = Object.values(data)
            dispatch(loadMap(items))
        })
    }
}

export function selectPatientToTrackBle(key) {
    return {
        type: 'SELECT_PATIENT_TO_TRACK_BLE',
        key: key
    }
}

export function cancelSelectedTrackingBle() {
    return {
        type: 'CANCEL_SELECTED_TRACKING_BLE'
    }
}
