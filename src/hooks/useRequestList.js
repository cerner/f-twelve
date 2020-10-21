import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to the onOpened event in xhrHook to maintain a list of request instances as they occur
 */
export default () => {
  const reducer = (requests, request) => requests.concat(request);
  const [requests, addRequest] = useReducer(reducer, []);

  useEffect(() => {
    xhrHook.onOpened(xhr => addRequest(xhr));
  }, []);

  return requests;
};
