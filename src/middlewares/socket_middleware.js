import { socketConstants } from '../_constants'
import { socketActions, workflowActions } from '../actions'

const domainName = '127.0.0.1:8000';
const socket = new WebSocket(`ws://${domainName}/execute/`);

export const socketMiddleware = store => next => action => {
  next(action);

  socket.onopen = (e) => {
    console.log('Open connection successfully');
  }

  socket.onmessage = (res) => {
    console.log('Got message', res);
  }

  socket.onclose = (res) => {
    console.error('Chat socket closed unexpectedly');
  };

  switch (action.type) {
    case socketConstants.SEND_MESSAGE: {
      // Payload must contain 'message' key
      const payload = JSON.stringify({
        message: {
          type: action.type,
          title: 'My title',
          body: 'Good morning'
        }
      })
      socket.send(payload);
    } break;

    case socketConstants.START_FLOW: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          appName: action.appName
        }
      })
      socket.send(payload);
    } break;

    case socketConstants.NEXT_FORM: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          appName: action.appName
        }
      })
      socket.send(payload);
    } break;

    default:
      break;
  }
}