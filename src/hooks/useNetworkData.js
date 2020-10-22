import { useEffect, useReducer } from 'preact/hooks';
import xhrHook from '../utilities/xhrHook';

/**
 * Subscribe to xhrHook to maintain a list of request instances as they occur
 */
export default () => {
  const [requests, updateRequest] = useReducer(reducer, []);

  useEffect(() => {
    xhrHook.onReadyStateChange(xhr => updateRequest(xhr));
  }, []);

  return requests;
};

const reducer = (requests, xhr) => {
  // If we know about this request use it, otherwise create a new one
  const index = requests.findIndex(request => request.xhr === xhr);
  const request = index > -1 ? requests[index] : createRequest(xhr);

  // Remove the old one
  if (index > -1) requests.splice(index, 1);

  // Populate fields that change on readystatechange
  request.status = xhr.status;

  if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
    request.headersRaw = xhr._headers.toString(); // TODO: Convert object to object
    request.headers = xhr._headers;
  }

  if (xhr.readyState === XMLHttpRequest.DONE) {
    request.endTime = new Date().getTime();
    request.responseHeadersRaw = xhr.getAllResponseHeaders();
    request.responseHeaders = xhr.getAllResponseHeaders().replace(/\r/g, '').split('\n'); // TODO: Convert string to object
  }

  /*
  TODO: Some fields to grab
  response: "{"message":"https:\/\/images.dog.ceo\/breeds\/ridgeback-rhodesian\/n02087394_1336.jpg","status":"success"}"
  responseText: "{"message":"https:\/\/images.dog.ceo\/breeds\/ridgeback-rhodesian\/n02087394_1336.jpg","status":"success"}"
  responseType: ""
  responseURL: "https://dog.ceo/api/breeds/image/random"
  responseXML: null
  */

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
