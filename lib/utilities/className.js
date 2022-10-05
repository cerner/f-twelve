"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Accept an array of optionally falsey classname expressions and return a string of classnames
 */
var _default = function _default() {
  for (var _len = arguments.length, expressions = new Array(_len), _key = 0; _key < _len; _key++) {
    expressions[_key] = arguments[_key];
  }

  return expressions.filter(Boolean).join(' ');
};

exports["default"] = _default;