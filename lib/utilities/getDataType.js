"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * Determine the data type of any JS variable
 * @param value The variable to check
 * @returns {"null"|"array"|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
var _default = function _default(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return (0, _typeof2["default"])(value);
};

exports["default"] = _default;