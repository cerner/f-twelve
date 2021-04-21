"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _preact = require("preact");

var _assert = _interopRequireDefault(require("assert"));

var _preact2 = require("@testing-library/preact");

var _RequestDetails = _interopRequireDefault(require("./RequestDetails"));

var request = {
  data: null,
  endTime: new Date().getTime() + 1000,
  endTimeStamp: 0,
  headers: {
    'accept': 'application/json'
  },
  headersRaw: '',
  method: 'GET',
  response: {},
  responseHeaders: {
    'content-type': 'application/json'
  },
  responseHeadersRaw: '',
  responseStatus: 200,
  responseText: 'data',
  responseType: 'responseType',
  startTime: new Date().getTime(),
  startTimeStamp: 1000,
  url: 'http://localhost',
  xhr: 'xhr'
};
describe('RequestDetails', function () {
  it('should render successfully', function () {
    var _render = (0, _preact2.render)((0, _preact.h)(_RequestDetails["default"], {
      request: request
    })),
        container = _render.container;

    (0, _assert["default"])(container.childNodes[0].classList.contains('details'));
  });
});