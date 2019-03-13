
import { caretakerConstants } from '../_constants';

const defaultState = [
  { name: 'John Smith', id: '000', address: 'address', tel: '000', patient: '' },
  { name: 'Sarah Parker', id: '111', address: 'address', tel: '000', patient: ''},
  { name: 'James Black', id: '222', address: 'address', tel: '000', patient: '' },
]

export function caretakers(state = defaultState, action) {
  switch (action.type) {

    case caretakerConstants.CREATE_NEW_CARETAKER: {
      const nextState = [...state, { name: action.name, id: action.id, address: action.address, tel: action.tel, patient: action.patient }];
      return nextState;
    } break;

    case caretakerConstants.DELETE_CARETAKER_BY_INDEX: {
      const nextState = [...state];
      nextState.splice(action.index, 1);
      return nextState;
    } break;

    default:
      return state
  }
}
