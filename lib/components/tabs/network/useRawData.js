"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _hooks = require("preact/hooks");

/**
 * Determine the 'raw string' representation of arbitrary data
 */
var _default = function _default(raw) {
  // Use state for async reads e.g. blobs
  var _useState = (0, _hooks.useState)(raw),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1]; // If it's a text or json blob convert it to a string


  if (data instanceof Blob && (data.type === 'application/json' || data.type === 'text/plain')) {
    var reader = new FileReader();

    reader.onload = function (event) {
      setData(event.target.result);
    };

    reader.readAsText(data);
  } // if it's a Document return the HTML


  if (data && Object.getPrototypeOf(data).constructor.name === 'HTMLDocument') {
    setData(data.documentElement.outerHTML);
  } // Return a string only if we managed to get one


  return typeof data === 'string' ? data : null;
};

exports["default"] = _default;