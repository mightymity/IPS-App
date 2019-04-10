import { patientConstants } from '../_constants';
import axios from 'axios';

export const patientActions = {
    createNewPatient,
    listAllPatients,
    deletePatientByIndex,
    editPatientByIndex,
    setCurrent,
};

function createNewPatient(name, ble, gps, current) {
    // return {
    //     type: patientConstants.CREATE_NEW_PATIENT,
    //     name: name,
    //     ble: ble,
    //     gps: gps,
    //     current: current,
    // }
    return (dispatch) => {

        dispatch(request())

        axios.post('http://localhost:3000/patients', {
            name: name,
            ble: ble,
            gps: gps,
        }).then(res => {
            // console.log("response");
            if (res.data == "success") {
                const data = { name, ble, gps };
                dispatch(success(data));
            }
        }
        ).catch(err => {
            dispatch(failure())
        })

        // console.log("100")

        // return {
        //     type: patientConstants.CREATE_NEW_PATIENT,
        //     //avatar: avatar,
        //     name: name,
        //     ble: ble,
        //     gps: gps,
        //     current: current,
        // }
    }

    function request() {
        return {
            type: "CREATE_NEW_PATIENT_REQUEST",
        }
    }

    function success(data) {
        return {
            type: "CREATE_NEW_PATIENT_SUCCESS",
            data: data,
        }
    }

    function failure() {
        return {
            type: "CREATE_NEW_PATIENT_FAILURE"
        }
    }

}

function listAllPatients() {
    // return {
    //     type: patientConstants.LIST_ALL_PATIENTS
    // }

    return dispatch => {

        axios.get('https://5cad900001a0b80014dcd82e.mockapi.io/patients')
            .then(res => {
                dispatch(success(res.data))

            })

        
    }

    function success(data) {
        return {
            type: "LIST_ALL_PATIENT_SUCCESS",
            patients: data
        }
    }

}

function setCurrent() {
    return {
        type: patientConstants.SET_CURRENT
    }
}


function deletePatientByIndex(index) {
    return {
        type: patientConstants.DELETE_PATIENT_BY_INDEX,
        index: index
    }
}

function editPatientByIndex(ble, gps) {
    return {
        type: patientConstants.EDIT_PATIENT_BY_INDEX,
        ble: ble,
        gps: gps,
    }
} 