"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _RequestDetailsModule = _interopRequireDefault(require("./RequestDetails.module.scss"));

var _ResponseStatus = _interopRequireDefault(require("./ResponseStatus"));

var _Tree = _interopRequireDefault(require("../../dataTree/Tree"));

var _hooks = require("preact/hooks");

var _useRawData = _interopRequireDefault(require("./useRawData"));

var noneDiv = (0, _preact.h)("div", {
  className: _RequestDetailsModule["default"].none
}, "(none)");
/**
 * Request details
 */

var _default = function _default(_ref) {
  var request = _ref.request;
  if (!request) return;

  var formatTime = function formatTime(epoch) {
    return new Date(epoch).toISOString().replace('T', ' ');
  };

  var elapsed = Math.round(request.endTimeStamp - request.startTimeStamp);
  return (0, _preact.h)("div", {
    className: _RequestDetailsModule["default"].details,
    key: request
  }, (0, _preact.h)("div", {
    className: _RequestDetailsModule["default"].header
  }, "Request"), (0, _preact.h)(NameValue, {
    name: "Method",
    value: request.method
  }), (0, _preact.h)(NameValue, {
    name: "URL",
    value: request.url
  }), (0, _preact.h)(NameValue, {
    name: "Time",
    value: formatTime(request.startTime)
  }), (0, _preact.h)(Headers, {
    parsed: request.headers,
    raw: request.headersRaw
  }), (0, _preact.h)(Data, {
    raw: request.data
  }), (0, _preact.h)("hr", null), (0, _preact.h)("div", {
    className: _RequestDetailsModule["default"].header
  }, "Response"), (0, _preact.h)(NameValue, {
    name: "Status",
    value: (0, _preact.h)(_ResponseStatus["default"], {
      code: request.responseStatus
    })
  }), (0, _preact.h)(NameValue, {
    name: "Time",
    value: "".concat(formatTime(request.endTime), " (").concat(elapsed, "ms)")
  }), (0, _preact.h)(Headers, {
    parsed: request.responseHeaders,
    raw: request.responseHeadersRaw
  }), (0, _preact.h)(Data, {
    raw: request.responseText || request.response
  }));
};
/**
 * Key/value pair with optional child data
 */


exports["default"] = _default;

var NameValue = function NameValue(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      child = _ref2.child;
  return (0, _preact.h)("dl", null, (0, _preact.h)("dt", null, name), value && (0, _preact.h)("dd", null, value), child && (0, _preact.h)("div", {
    className: _RequestDetailsModule["default"].child
  }, child));
};
/**
 * A NameValue with child NameValues for each header
 */


var Headers = function Headers(_ref3) {
  var parsed = _ref3.parsed,
      raw = _ref3.raw;

  var _useToggleParsedButto = useToggleParsedButton(),
      _useToggleParsedButto2 = (0, _slicedToArray2["default"])(_useToggleParsedButto, 2),
      isParsed = _useToggleParsedButto2[0],
      toggleParsedButton = _useToggleParsedButto2[1];

  var isEmpty = (0, _typeof2["default"])(parsed) !== 'object' || !Object.keys(parsed).length;
  var value = isEmpty ? noneDiv : toggleParsedButton;
  var child = !isParsed ? (0, _preact.h)("pre", null, raw) : Object.keys(parsed).map(function (key) {
    return (0, _preact.h)(NameValue, {
      name: key,
      value: parsed[key]
    });
  });
  return (0, _preact.h)(NameValue, {
    child: !isEmpty && child,
    name: "Headers",
    value: value
  });
};
/**
 * A NameValue that handles dynamic data of various types
 */


var Data = function Data(_ref4) {
  var raw = _ref4.raw;
  var string = (0, _useRawData["default"])(raw);
  var parsed = parse(string);

  var _useToggleParsedButto3 = useToggleParsedButton(),
      _useToggleParsedButto4 = (0, _slicedToArray2["default"])(_useToggleParsedButto3, 2),
      isParsed = _useToggleParsedButto4[0],
      toggleParsedButton = _useToggleParsedButto4[1];

  var value = parsed && isParsed ? (0, _preact.h)(_Tree["default"], {
    data: parsed,
    withProto: false
  }) : string && (0, _preact.h)("pre", null, string);
  var toggleButton = parsed && toggleParsedButton;
  return (0, _preact.h)(NameValue, {
    child: value,
    name: "Data",
    value: value ? toggleButton : noneDiv
  });
};
/**
 * Provide a toggle button and the toggle state
 */


var useToggleParsedButton = function useToggleParsedButton() {
  var _useState = (0, _hooks.useState)(true),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isParsed = _useState2[0],
      setIsParsed = _useState2[1];

  var toggleParsedButton = (0, _preact.h)("div", {
    className: _RequestDetailsModule["default"].toggleParsedButton,
    onClick: function onClick() {
      return setIsParsed(!isParsed);
    }
  }, isParsed ? 'view raw' : 'view parsed');
  return [isParsed, toggleParsedButton];
};
/**
 * Attempt to parse JSON data
 */


var parse = function parse(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};