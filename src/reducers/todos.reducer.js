import { todoContants } from '../_constants';

const defaultState = [
  { name: 'TODO#1', description: 'DESCRIPTION#1' },
  { name: 'TODO#2', description: 'DESCRIPTION#2' },
  { name: 'TODO#3', description: 'DESCRIPTION#3' },
]

export function todos(state = defaultState, action) {
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

    default:
      return state
  }
}
