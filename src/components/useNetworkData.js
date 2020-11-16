import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to xhrHook to maintain a list of request instances as they occur
 */
export default () => {
  const [requests, updateRequest] = useReducer(reducer, []);

  useEffect(() => {
    xhrHook.onChange(updateRequest);
  }, []);

  return requests;
};

const reducer = (requests, event) => {
  const xhr = event.target;

  // If we know about this request use it, otherwise create a new one
  const index = requests.map(request => request.xhr).indexOf(xhr);
  const request = index > -1 ? requests[index] : createRequest(event, xhr);

  // Remove the old one
  if (index > -1) requests.splice(index, 1);

  // Populate fields that change
  if (xhr.readyState === XMLHttpRequest.DONE && !request.endTime) {
    request.endTimeStamp = event.timeStamp;
    request.endTime = request.startTime + (request.endTimeStamp - request.startTimeStamp);
  }
  request.data = xhr._data;
  request.headers = xhr._headers;
  request.headersRaw = Object.keys(xhr._headers)
    .reduce((string, key) => `${string}\n${key}: ${xhr._headers[key].join(',')}`, '')
    .trim();
  request.responseHeadersRaw = xhr.getAllResponseHeaders().trim();
  request.responseHeaders = request.responseHeadersRaw
    .split('\r\n')
    .filter(Boolean)
    .reduce((headers, headerString) => {
      const [key, value] = headerString.split(': ');
      headers[key] = value;
      return headers;
    }, {});
  request.response = xhr.response;
  request.responseText = (xhr.responseType === '' || xhr.responseType === 'text') ? xhr.responseText : null;
  request.responseStatus = (event.type === 'error' || request.responseStatus === -1) ? -1 : xhr.status;
  request.responseType = xhr.responseType;

  // Add this new/updated one to the list
  return [...requests, request];
};

const createRequest = (event, xhr) => {
  return {
    startTime: new Date().getTime(),
    startTimeStamp: event.timeStamp,
    endTime: null,
    method: xhr._method,
    url: xhr._url,
    data: null,
    status: null,
    xhr: xhr,
  };
};
