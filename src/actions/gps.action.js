import { db } from '../services/firebase_demo'


export function listAllPatientsGps(items) {
    return {
        type: 'LIST_ALL_PATIENTS_GPS',
        items: items
    }
}

export function updateAllPatientGps() {
    return function (dispatch) {
        db.ref('/patients').orderByChild('/status').equalTo('out').on('value', snapshot => {
            let data = snapshot.val()
            if (data !== null) {
                let items = Object.values(data);
                dispatch(listAllPatientsGps(items))
            }
            else {
                const items = 'no'
                dispatch(listAllPatientsGps(items))
            }
        })
    }
}

export function updateTrackingPatientGps(key) {
    return function (dispatch) {
        db.ref('/patients').child(key).on('value', function (snapshot) {
            let item = snapshot.val()
            dispatch(trackingSelectedPatientGps(item))
        })
    }
}

export function selectPatientToTrackGps(key) {
    return {
        type: 'SELECT_PATIENT_TO_TRACK_GPS',
        key: key
    }
}

export function cancelSelectedTrackingGps() {
    return {
        type: 'CANCEL_SELECTED_TRACKING_GPS'
    }
}
