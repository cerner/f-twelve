import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to xhrHook to maintain a list of request instances as they occur
 */
export default () => {
  const [requests, updateRequest] = useReducer(reducer, []);

  useEffect(() => {
    xhrHook.onOpened(xhr => updateRequest(xhr));
    xhrHook.onHeadersReceived(xhr => updateRequest(xhr));
    xhrHook.onLoading(xhr => updateRequest(xhr));
    xhrHook.onDone(xhr => updateRequest(xhr));
  }, []);

  return requests;
};

const reducer = (requests, xhr) => {
  const index = requests.findIndex(request => request.xhr === xhr);
  const request = index > -1 ? requests[index] : createRequest(xhr);
  if (index > -1) requests.splice(index, 1);
  switch (xhr.readyState) {
    case XMLHttpRequest.OPENED:
      request.status = 'Opened';
      break;
    case XMLHttpRequest.HEADERS_RECEIVED:
      request.status = 'Headers received';
      break;
    case XMLHttpRequest.LOADING:
      request.status = 'Loading';
      break;
    case XMLHttpRequest.DONE:
      request.status = 'Done';
      request.endTime = new Date().getTime();
      break;
  }
  return [...requests, request];
};

const createRequest = (xhr) => {
  return {
    startTime: new Date().getTime(),
    endTime: null,
    method: xhr._method,
    url: xhr._url,
    data: xhr._data,
    status: null,
    xhr: xhr,
  };
};
