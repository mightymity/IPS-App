import { mapContants } from '../_constants';

export const mapActions = {
    renderAllPatientBLE,
    renderOnePatientBLE,
    renderAllPatientGPS,
    renderOnePatientGPS
    
};

function renderAllPatientBLE() {
    return {
        type: mapContants.BLE_SHOW_ALL_PATIENT,
        
    }
}

function renderOnePatientBLE() {
    return {
        type: mapContants.BLE_SHOW_ONE_PATIENT
    }
}

function renderAllPatientGPS(index) {
    return {
        type: mapContants.GPS_SHOW_ALL_PATIENT,
        
    }
}

function renderAllPatientGPS(index) {
    return {
        type: mapContants.GPS_SHOW_ONE_PATIENT,
        
    }
}