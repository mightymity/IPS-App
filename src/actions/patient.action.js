import { patientConstants } from '../_constants';
import axios from 'axios';
import { db } from '../firebase';
import { functionTypeAnnotation } from '@babel/types';
import { ActionConst } from 'react-native-router-flux';



export const patientActions = {
    createNewPatient,
    listAllPatients,
    deletePatientByIndex,
    editPatientByIndex,
    selectEditPatient,
    updatePatientList,
};

function listAllPatients(data) {
    return {
        type: "LIST_ALL_PATIENT_SUCCESS",
        patients: data
    }
  }
  
  
function createNewPatient(id, name, ble, gps) {
    return function(){
    db.ref('/patients').child(id).set({
        id: id,
        name: name,
        ble: ble,
        gps: gps
      })
    }
}

function updatePatientList(){
    return function(dispatch){
    db.ref('/patients').on("value", function(snapshot){
        let data = snapshot.val();
        let items = Object.values(data);
        dispatch(listAllPatients(items))
        })
    }
}

function deletePatientByIndex(id){
    return function(){
        db.ref('/patients').child(id).remove()
    }
}

function selectEditPatient(data){
    return {
        type: "SELECT_EDIT_PATIENT",
        current: data,
    }
}

function editPatientByIndex(id, ble, gps){
    return function(dispatch){
        if (ble != ''){
        db.ref('/patients').child(id).update({ble: ble})
        }
        if (gps != ''){
        db.ref('/patients').child(id).update({gps: gps})
        }
        dispatch(selectEditPatient(null))
    }
}

