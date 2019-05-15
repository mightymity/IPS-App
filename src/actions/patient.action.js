import { patientConstants } from '../_constants';
import axios from 'axios';
import { db } from '../services/firebase_demo';

import { db2 } from '../services/firebase_demo2';

import { functionTypeAnnotation } from '@babel/types';
import { ActionConst } from 'react-native-router-flux';



export const patientActions = {
    createNewPatient,
    listAllPatients,
    deletePatientByIndex,
    editPatientByIndex,
    selectEditPatient,
    updatePatientList,
    selectHospitalPatient
};

function listAllPatients(data) {
    return {
        type: "LIST_ALL_PATIENTS",
        patients: data
    }
}

//   "01" : {
//     BLE : {
//       building : "IC KMITL",
//       floor : 6,
//       grid : 5,
//       room : 3
//     },
//     GPS : {
//       latitude : 13.666699999999999,
//       longitude : 100.63599833333335
//     },
//     id : id,
//     name : name,
//     status : "in"
//   }
function createNewPatient(id, name, ble, gps) {
    return function () {
        // db.ref('/patients').child(id).set({
        //     id: id,
        //     name: name,
        //     ble: ble,
        //     gps: gps
        //   })

        db.ref('/patients').child(id).set({
            BLE: {
                building: "Building",
                floor: 0,
                grid: 0,
                room: 0,
                name: ble,
            },
            GPS: {
                latitude: 0,
                longitude: 0,
                name: gps,
            },
            id: id,
            name: name,
            status: "in"
        })

        db.ref('/GPS_devices').child(gps).set({
            id: gps,
            patient: id
        })
    }
}

function updatePatientList() {
    return function (dispatch) {
        db.ref('/patients').on("value", function (snapshot) {
            let data = snapshot.val();
            let items = Object.values(data);
            dispatch(listAllPatients(items))
        })
    }
}

function deletePatientByIndex(id) {
    return function () {
        db.ref('/patients').child(id).remove()
    }
}

function selectEditPatient(data) {
    return {
        type: "SELECT_EDIT_PATIENT",
        current: data,
    }
}

function selectHospitalPatient(name, id) {
    return {
        type: "SELECT_HOSPITAL_PATIENT",
        name: name,
        id: id
    }
}

function editPatientByIndex(id, ble, gps) {
    return function (dispatch) {
        if (ble != '') {
            db.ref('/patients').child(id).child('BLE').update({name: ble})
        }
        if (gps != '') {
            db.ref('/patients').child(id).child('GPS').update({name: gps})
        }
        dispatch(selectEditPatient(null))
    }
}

