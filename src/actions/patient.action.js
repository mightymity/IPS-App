import { patientConstants } from '../_constants';
import axios from 'axios';
import { db } from '../firebase';



export const patientActions = {
    createNewPatient,
    listAllPatients,
    deletePatientByIndex,
    editPatientByIndex,
    setCurrent,
};

function createNewPatient(id, name, ble, gps, current) {
    // return {
    //     type: patientConstants.CREATE_NEW_PATIENT,
    //     name: name,
    //     ble: ble,
    //     gps: gps,
    //     current: current,
    // }

    //--------------------------

    // return dispatch => {

    //     //dispatch(request())

    //     axios.post('http://10.0.2.2:3000/patients/', {
    //         name: name,
    //         ble: ble,
    //         gps: gps
    //     }, 
    //         {
    //         headers:{
    //             "Content-Type": "application/json"
    //         },
    //         validateStatus: (status) => {
    //             return true; // I'm always returning true, you may want to do it depending on the status received
    //           },
    //     }).then(res => {
    //         // console.log("response");
    //         if (res.data == "success") {
    //             const data = { name, ble, gps };
    //             dispatch(success(data));
    //         }
    //     }
    //     ).catch(err => {
    //         console.log(err);
    //         //dispatch(failure())
    //     })

    //     // console.log("100")

    //     // return {
    //     //     type: patientConstants.CREATE_NEW_PATIENT,
    //     //     //avatar: avatar,
    //     //     name: name,
    //     //     ble: ble,
    //     //     gps: gps,
    //     //     current: current,
    //     // }
    // }

    // function request() {
    //     return {
    //         type: "CREATE_NEW_PATIENT_REQUEST",
    //     }
    // }

    // function success(data) {
    //     return {
    //         type: "CREATE_NEW_PATIENT_SUCCESS",
    //         data: data,
    //     }
    // }

    // function failure() {
    //     return {
    //         type: "CREATE_NEW_PATIENT_FAILURE"
    //     }
    // }

    // db.ref('/patients').push({
    //     name: name,
    //     ble: ble,
    //     gps: gps
    //   })


    const data = { id, name, ble, gps };
    return dispatch => {
        db.ref('/patients').child(id).set({
            id: id,
            name: name,
            ble: ble,
            gps: gps
          })
        .then(() => 
            dispatch(success(data)))
        }

    function success(data) {
        return {
            type: "CREATE_NEW_PATIENT_SUCCESS",
            data: data,
        }
    }

}

function listAllPatients() {
    // return {
    //     type: patientConstants.LIST_ALL_PATIENTS
    // }
    //https://5cad900001a0b80014dcd82e.mockapi.io/patients

    // return dispatch => {

    //     axios.get('http://10.0.2.2:3000/patients')
    //         .then(res => {
    //             dispatch(success(res.data))

    //         })
    // }

    return dispatch => {db.ref('/patients').on("value", snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        console.log('this is items: ',items)
        dispatch(success(items))
      });

    function success(data) {
        return {
            type: "LIST_ALL_PATIENT_SUCCESS",
            patients: data
        }
    }
}
}

function setCurrent(current) {
    return {
        type: patientConstants.SET_CURRENT,
        current: current,
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
        type: "EDIT_PATIENT_BY_INDEX",
        ble: ble,
        gps: gps,
    }
} 