import { caretakerConstants } from '../_constants';
import { db } from '../services/firebase_demo';
export const caretakerActions = {
    createNewCaretaker,
    listAllCaretakers,
    deleteCaretakerByIndex,
    editCaretakerByIndex,
    selectEditCaretaker,
    updateCaretakerList,
};

function listAllCaretakers(data) {
    return {
        type: "LIST_ALL_CARETAKERS",
        caretakers: data
    }
  }
  
  
function createNewCaretaker(id, name, patient) {
    return function(){
    db.ref('/caretakers').child(id).set({
        id: id,
        name: name,
        patient: patient,
      })
    }
}

function updateCaretakerList(){
    return function(dispatch){
    db.ref('/caretakers').on("value", function(snapshot){
        let data = snapshot.val();
        let items = Object.values(data);
        dispatch(listAllCaretakers(items))
        })
    }
}

function deleteCaretakerByIndex(id){
    return function(){
        db.ref('/caretakers').child(id).remove()
    }
}

function selectEditCaretaker(data){
    return {
        type: "SELECT_EDIT_CARETAKER",
        current: data,
    }
}

function editCaretakerByIndex(id, name, patient){
    return function(dispatch){
        if (name != ''){
        db.ref('/caretakers').child(id).update({name: name})
        }
        if (patient != ''){
        db.ref('/caretakers').child(id).update({patient: patient})
        }
        dispatch(selectEditCaretaker(null))
    }
}

