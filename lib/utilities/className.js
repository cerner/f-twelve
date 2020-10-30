"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Accept an array of optionally falsey classname expressions and return a string of classnames
 */
var _default = function _default(expressions) {
  return expressions.filter(Boolean).join(' ');
};

exports["default"] = _default;