"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _hooks = require("preact/hooks");

var _RequestDetails = _interopRequireDefault(require("./RequestDetails"));

var _NetworkModule = _interopRequireDefault(require("./Network.module.scss"));

var _className = _interopRequireDefault(require("../../../utilities/className"));

var _ResponseStatus = _interopRequireDefault(require("./ResponseStatus"));

/**
 * The content and logic for the Network tab
 */
var _default = function _default(_ref) {
  var networkData = _ref.networkData;

  var _useState = (0, _hooks.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedRequest = _useState2[0],
      setSelectedRequest = _useState2[1];

  var onSelectRequest = function onSelectRequest(request) {
    request === selectedRequest ? setSelectedRequest(null) : setSelectedRequest(request);
  };

  var RequestSummary = function RequestSummary(_ref2) {
    var request = _ref2.request;
    var url = selectedRequest ? request.url.split('/').pop() : request.url;
    return (0, _preact.h)("div", {
      className: (0, _className["default"])([_NetworkModule["default"].row, request === selectedRequest && _NetworkModule["default"].selected]),
      onClick: function onClick() {
        return onSelectRequest(request);
      },
      title: request.url
    }, (0, _preact.h)("div", {
      className: _NetworkModule["default"].status
    }, (0, _preact.h)(_ResponseStatus["default"], {
      code: request.responseStatus
    })), (0, _preact.h)("div", {
      className: _NetworkModule["default"].url
    }, "".concat(request.method, " ").concat(url)));
  };

  return (0, _preact.h)("div", {
    className: _NetworkModule["default"].network
  }, (0, _preact.h)("div", {
    className: _NetworkModule["default"].list
  }, networkData.sort(function (request) {
    return request.startTime;
  }).map(function (request) {
    return (0, _preact.h)(RequestSummary, {
      request: request
    });
  })), (0, _preact.h)(_RequestDetails["default"], {
    request: selectedRequest
  }));
};

exports["default"] = _default;