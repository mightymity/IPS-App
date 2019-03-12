import { patientConstants } from '../_constants';

export const patientActions = {
    createNewPatient,
    listAllPatients,
    deletePatientByIndex,
};

function createNewPatient(name, ble, gps) {
    return {
        type: patientConstants.CREATE_NEW_PATIENT,
        name: name,
        ble: ble,
        gps: gps
    }
}

function listAllPatients() {
    return {
        type: patientConstants.LIST_ALL_PATIENTS
    }
}

function deletePatientByIndex(index) {
    return {
        type: patientConstants.DELETE_PATIENT_BY_INDEX,
        index: index
    }
} 