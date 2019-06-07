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
    selectHospitalPatient,
    updateBle,
    updateGps,
    listAllBle,
    listAllGps
};

function listAllPatients(data) {
    return {
        type: "LIST_ALL_PATIENTS",
        patients: data
    }
}

function listAllBle(data) {
    return {
        type: "LIST_ALL_BLE",
        ble: data
    }
}

function listAllGps(data) {
    return {
        type: "LIST_ALL_GPS",
        gps: data
    }
}

function createNewPatient(id, name, ble, gps) {
    // var allowed = "0369cf".split( '' ), s = "#";
    // while ( s.length < 4 ) {
    //     s += allowed.splice( Math.floor( ( Math.random() * allowed.length ) ), 1 );
    // }
    var markerColor = ['red', 'tomato', 'orange', 'yellow',
        'gold', 'wheat', 'tan', 'linen', 'green', 'aqua', 'violet', 'indigo'];


    // for (var i = 0; i < 12; i++){
    var s = markerColor[Math.floor(Math.random() * markerColor.length)];

    //     db.ref('/colors').orderByChild('/id').equalTo(s).on('value', snapshot => {
    //         let data = snapshot.val()
    //         //console.log('this is color: ', s)
    //         if ((data == null)) {
    //             console.log('in')
    //             return s
    //         }
    //         else if (i == 11){
    //             return s
    //         }

    //     })

    // }



    // db.ref('/colors').on("value", function (snapshot) {
    //     let data = snapshot.val();
    //     //let items = Object.values(data);
    //     return items = Object.values(data);
    // })
    // console.log('this is item',items)

    //return s;
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
                latitude: 13.729954171728675,
                longitude: 100.77549254874613,
                name: gps,
            },
            color: s,
            id: id,
            name: name,
            status: "out"
        })

        // db.ref('/colors').child(id).set({
        //     id: s,
        //     patient: id
        // })

        db.ref('/GPS_devices').child(gps).set({
            id: gps,
            patient: id
        })

        db.ref('/BLE_devices').child(ble).set({
            id: ble,
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

function deletePatientByIndex(id, ble, gps) {
    console.log('gps: ', gps)
    return function () {
        db.ref('/patients').child(id).remove()
        db.ref('/BLE_devices').child(ble).update({ patient: 'n/a' })
        db.ref('/GPS_devices').child(gps).update({ patient: 'n/a' })
        // db.ref('/colors').child(id).remove()

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
            db.ref('/patients').child(id).child('BLE').update({ name: ble })
        }
        if (gps != '') {
            db.ref('/patients').child(id).child('GPS').update({ name: gps })
        }
        dispatch(selectEditPatient(null))
    }
}



function updateBle() {
    return function (dispatch) {
        db.ref('/BLE_devices').orderByChild('/patient').equalTo('n/a').on('value', snapshot => {
            let data = snapshot.val()
            if (data !== null) {
                let items = Object.values(data);
                dispatch(listAllBle(items))
            }
            else {
                const items = 'N/A'
                dispatch(listAllBle(items))
            }
        })
    }
}

function updateGps() {
    return function (dispatch) {
        db.ref('/GPS_devices').orderByChild('/patient').equalTo('n/a').on('value', snapshot => {
            let data = snapshot.val()
            if (data !== null) {
                let items = Object.values(data);
                dispatch(listAllGps(items))
            }
            else {
                const items = 'N/A'
                dispatch(listAllGps(items))
            }
        })
    }
}

