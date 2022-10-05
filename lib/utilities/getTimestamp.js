"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Timestamp in local time
 */
var _default = function _default() {
  var now = new Date();
  var date = now.toISOString().split('T')[0];
  var tzOffset = now.getTimezoneOffset() * 60000;
  var time = new Date(Date.now() - tzOffset).toISOString().slice(11, 23);
  return "".concat(date, " ").concat(time);
};

exports["default"] = _default;