"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _hooks = require("preact/hooks");

/**
 * Attempt to parse whatever this is and return a JS object
 * It can go both ways, it will calculate raw if it's a json blob
 */
var _default = function _default(data, raw) {
  // Use state for async reads e.g. blobs
  var _useState = (0, _hooks.useState)(data),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      object = _useState2[0],
      setParsed = _useState2[1];

  var _useState3 = (0, _hooks.useState)(raw),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      string = _useState4[0],
      setString = _useState4[1]; // If it's a json blob read it as a string


  if (object instanceof Blob && object.type === 'application/json') {
    var reader = new FileReader();

    reader.onload = function (event) {
      setParsed(event.target.result);
      setString(event.target.result);
    };

    reader.readAsText(object);
  } // Parse the string as json


  if (typeof object === 'string') {
    setParsed(parse(object) || parse(raw));
  } // Return an object if we managed to get an object, same with the string


  return [(0, _typeof2["default"])(object) === 'object' ? object : null, typeof string === 'string' ? string : null];
};
/**
 * Attempt to parse JSON data
 */


exports["default"] = _default;

var parse = function parse(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};