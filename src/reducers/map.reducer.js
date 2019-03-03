import { mapContants } from '../_constants';

const defaultState = [
  
]

export function maps(state = defaultState, action) {
  switch (action.type) {

    case todoContants.CREATE_NEW_TODO: {
      const nextState = [...state, { name: action.name, description: action.description }];
      return nextState;
    } break;

    case todoContants.DELETE_TODO_BY_INDEX: {
      const nextState = [...state];
      nextState.splice(action.index, 1);
      return nextState;
    } break;

    case mapContants.BLE_SHOW_ALL_PATIENT:{

    }break;

    case mapContants.BLE_SHOW_ONE_PATIENT:{

    }break;

    case mapContants.GPS_SHOW_ALL_PATIENT:{

    }break;

    case mapContants.GPS_SHOW_ONE_PATIENT:{

    }break;

    default:
      return state
  }
}
