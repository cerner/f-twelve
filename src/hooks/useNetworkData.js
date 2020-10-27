import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to xhrHook to maintain a list of request instances as they occur
 */
export default () => {
  const [requests, updateRequest] = useReducer(reducer, []);

  useEffect(() => {
    xhrHook.onChange(xhr => updateRequest(xhr));
  }, []);

  return requests;
};

const reducer = (requests, xhr) => {
  // If we know about this request use it, otherwise create a new one
  const index = requests.findIndex(request => request.xhr === xhr);
  const request = index > -1 ? requests[index] : createRequest(xhr);

  // Remove the old one
  if (index > -1) requests.splice(index, 1);

  // Populate fields that change
  if (xhr.readyState === XMLHttpRequest.DONE) {
    request.endTime = new Date().getTime();
  }
  request.headers = xhr._headers;
  request.headersRaw = Object.keys(xhr._headers)
    .reduce((string, key) => `${string}\n${key}:${xhr._headers[key].join(',')}`, '');
  request.response = xhr.response;
  request.responseHeaders = xhr
    .getAllResponseHeaders()
    .split('\r\n')
    .filter(Boolean)
    .reduce((headers, headerString) => {
      const parts = headerString.split(': ');
      headers[parts[0]] = parts[1];
      return headers;
    }, {});
  request.responseHeadersRaw = xhr.getAllResponseHeaders();
  request.responseStatus = xhr.status;
  request.responseText = xhr.responseText;
  request.responseType = xhr.responseType;

  // Add this new/updated one to the list
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
