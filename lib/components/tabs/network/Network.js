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

var _RequestSummary = _interopRequireDefault(require("./RequestSummary"));

var _useResizer3 = _interopRequireDefault(require("../../useResizer"));

/**
 * The content and logic for the Network tab
 */
var _default = function _default(_ref) {
  var networkData = _ref.networkData;

  var _useState = (0, _hooks.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedRequest = _useState2[0],
      setSelectedRequest = _useState2[1];

  var ref = (0, _preact.createRef)();

  var _useResizer = (0, _useResizer3["default"])({
    defaultSize: 350,
    targetRef: ref,
    resizeWidth: true
  }),
      _useResizer2 = (0, _slicedToArray2["default"])(_useResizer, 2),
      resizer = _useResizer2[0],
      width = _useResizer2[1];

  var onSelectRequest = function onSelectRequest(event, request) {
    var selectedSelected = request === selectedRequest;
    ref.current && (ref.current.style['flex-basis'] = selectedSelected ? '100%' : "".concat(width, "px"));
    selectedSelected ? setSelectedRequest(null) : setSelectedRequest(request);
  };

  (0, _hooks.useEffect)(function () {
    return ref.current && (ref.current.style['flex-basis'] = '100%');
  }, []);
  return (0, _preact.h)("div", {
    className: _NetworkModule["default"].network
  }, (0, _preact.h)("div", {
    className: _NetworkModule["default"].list,
    ref: ref
  }, networkData.sort(function (request) {
    return request.startTime;
  }).map(function (request) {
    return (0, _preact.h)(_RequestSummary["default"], {
      isSelected: request === selectedRequest,
      onSelect: onSelectRequest,
      request: request
    });
  })), (0, _preact.h)("div", null, resizer), (0, _preact.h)(_RequestDetails["default"], {
    request: selectedRequest
  }));
};

exports["default"] = _default;