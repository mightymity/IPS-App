import { bleConstants } from '../_constants';
import { db } from '../services/firebase_demo'


export function listAllPatientsBle(items) {
    return {
        type: 'LIST_ALL_PATIENTS_BLE',
        items: items
    }
}

export function loadMap(items){
    const initialBuildingIndex = 1
    const initialfloorNumber = Object.keys(items[initialBuildingIndex].floors)[0]
    return {
        type: 'LOAD_MAP',
        items: items,
        index: initialBuildingIndex,
        number: initialfloorNumber
    }
}

export function setCurrentBuilding(index){
    return {
        type: 'SET_CURRENT_BUILDING',
        index: index
    }
}

export function setCurrentFloor(number){
    return {
        type: 'SET_CURRENT_FLOOR',
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
