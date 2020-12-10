"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _preact = require("preact");

var _RequestSummaryModule = _interopRequireDefault(require("./RequestSummary.module.scss"));

var _ResponseStatus = _interopRequireDefault(require("./ResponseStatus"));

var _hooks = require("preact/hooks");

var _className = _interopRequireDefault(require("../../../utilities/className"));

/**
 * Request summary - A single row in the request list
 */
var _default = function _default(_ref) {
  var request = _ref.request,
      onSelect = _ref.onSelect,
      isSelected = _ref.isSelected;
  var ref = (0, _preact.createRef)();
  (0, _hooks.useEffect)(function () {
    isSelected && ref.current.focus();
  });

  var _onKeyDown = function onKeyDown(event, request) {
    if (event.key === 'Enter') {
      onSelect(event, request);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.target.previousSibling && event.target.previousSibling.click();
      event.preventDefault();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.target.nextSibling && event.target.nextSibling.click();
      event.preventDefault();
    }
  };

  return (0, _preact.h)("div", {
    className: (0, _className["default"])(_RequestSummaryModule["default"].requestSummary, isSelected && _RequestSummaryModule["default"].selected),
    onClick: function onClick(event) {
      return onSelect(event, request);
    },
    onKeyDown: function onKeyDown(event) {
      return _onKeyDown(event, request);
    },
    ref: ref,
    tabIndex: "0",
    title: request.url
  }, (0, _preact.h)("div", {
    className: _RequestSummaryModule["default"].status
  }, (0, _preact.h)(_ResponseStatus["default"], {
    code: request.responseStatus
  })), (0, _preact.h)("div", {
    className: _RequestSummaryModule["default"].method
  }, request.method), (0, _preact.h)("div", {
    className: _RequestSummaryModule["default"].url
  }, request.url));
};

exports["default"] = _default;