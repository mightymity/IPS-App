import { socketConstants } from '../_constants'
import { socketActions, workflowActions } from '../actions'

const domainName = '127.0.0.1:8000';
const socket = new WebSocket(`ws://${domainName}/execute/`);

export const apiMiddleware = store => next => action => {
  next(action);


  switch (action.type) {
    case socketConstants.SEND_MESSAGE: {
      // Payload must contain 'message' key
     
    } break;

 

    default:
      break;
  }
}