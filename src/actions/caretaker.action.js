import { caretakerConstants } from '../_constants';

export const caretakerActions = {
    createNewCaretaker,
    listAllCaretakers,
    deleteCaretakerByIndex,
};

function createNewCaretaker(name, id, address, tel, patient) {
    return {
        type: caretakerConstants.CREATE_NEW_CARETAKER,
        name: name,
        id: id,
        address: address,
        tel: tel,
        patient: patient
    }
}

function listAllCaretakers() {
    return {
        type: caretakerConstants.LIST_ALL_CARETAKERS
    }
}

function deleteCaretakerByIndex(index) {
    return {
        type: caretakerConstants.DELETE_CARETAKER_BY_INDEX,
        index: index
    }
} 