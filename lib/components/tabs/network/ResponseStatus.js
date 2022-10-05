"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _preact = require("preact");

var _ResponseStatusModule = _interopRequireDefault(require("./ResponseStatus.module.scss"));

var _className = _interopRequireDefault(require("../../../utilities/className"));

/**
 * Response Status
 */
var _default = function _default(_ref) {
  var code = _ref.code;
  var className = (0, _className["default"])(_ResponseStatusModule["default"].status, (code === -1 || code >= 400) && _ResponseStatusModule["default"].error, code >= 200 && code < 400 && _ResponseStatusModule["default"].success);
  var display = code === -1 ? '⚠' : code || '...';
  var title = code === -1 ? {
    title: 'Request failed'
  } : {};
  return (0, _preact.h)("div", (0, _extends2["default"])({
    className: className
  }, title), display);
};

exports["default"] = _default;