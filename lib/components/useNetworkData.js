"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _hooks = require("preact/hooks");

var _xhrHook = _interopRequireDefault(require("../utilities/xhrHook"));

/**
 * Subscribe to xhrHook to maintain a list of request instances as they occur
 */
var _default = function _default() {
  var _useReducer = (0, _hooks.useReducer)(reducer, []),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      requests = _useReducer2[0],
      updateRequest = _useReducer2[1];

  (0, _hooks.useEffect)(function () {
    _xhrHook["default"].onChange(updateRequest);
  }, []);
  return requests;
};

exports["default"] = _default;

var reducer = function reducer(requests, event) {
  var xhr = event.target; // If we know about this request use it, otherwise create a new one

  var index = requests.map(function (request) {
    return request.xhr;
  }).indexOf(xhr);
  var request = index > -1 ? requests[index] : createRequest(event, xhr); // Remove the old one

  if (index > -1) requests.splice(index, 1); // Populate fields that change

  if (xhr.readyState === XMLHttpRequest.DONE && !request.endTime) {
    request.endTimeStamp = event.timeStamp;
    request.endTime = request.startTime + (request.endTimeStamp - request.startTimeStamp);
  }

  request.data = xhr._data;
  request.headers = xhr._headers;
  request.headersRaw = Object.keys(xhr._headers).reduce(function (string, key) {
    return "".concat(string, "\n").concat(key, ": ").concat(xhr._headers[key].join(','));
  }, '').trim();
  request.responseHeadersRaw = xhr.getAllResponseHeaders().trim();
  request.responseHeaders = request.responseHeadersRaw.split('\r\n').filter(Boolean).reduce(function (headers, headerString) {
    var _headerString$split = headerString.split(': '),
        _headerString$split2 = (0, _slicedToArray2["default"])(_headerString$split, 2),
        key = _headerString$split2[0],
        value = _headerString$split2[1];

    headers[key] = value;
    return headers;
  }, {});
  request.response = xhr.response;
  request.responseText = xhr.responseType === '' || xhr.responseType === 'text' ? xhr.responseText : null;
  request.responseStatus = event.type === 'error' || request.responseStatus === -1 ? -1 : xhr.status;
  request.responseType = xhr.responseType; // Add this new/updated one to the list

  return [].concat((0, _toConsumableArray2["default"])(requests), [request]);
};

var createRequest = function createRequest(event, xhr) {
  return {
    startTime: new Date().getTime(),
    startTimeStamp: event.timeStamp,
    endTime: null,
    method: xhr._method,
    url: xhr._url,
    data: null,
    status: null,
    xhr: xhr
  };
};