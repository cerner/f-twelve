"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreview = exports.formatSimpleValue = exports["default"] = exports.Node = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _preact = require("preact");

var _NodeModule = _interopRequireDefault(require("./Node.module.scss"));

var _CopyButton = _interopRequireDefault(require("../CopyButton"));

var _hooks = require("preact/hooks");

/**
 * A DOM element representing any JS value/object including its children.
 * The node prop has a specific format from getNode in the Tree component
 */
var Node = function Node(_ref) {
  var node = _ref.node,
      childKey = _ref.childKey;

  var _useState = (0, _hooks.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var toggleIsOpen = function toggleIsOpen() {
    return setIsOpen(!isOpen);
  }; // Convert objects to json and beautify it, return everything else as-is


  var getCopyText = function getCopyText() {
    return (0, _typeof2["default"])(node.value) === 'object' && node.value !== null ? JSON.stringify(JSON.parse(node.toJson()), null, 2) : node.value;
  };

  var caretClass = "".concat(_NodeModule["default"].caret, " ").concat(isOpen ? _NodeModule["default"].caretDown : _NodeModule["default"].caretRight);
  var dataTypeStyle = !childKey && typeof node.value === 'string' ? '' : _NodeModule["default"][node.dataType]; // Don't style parent strings

  return (0, _preact.h)("div", {
    className: _NodeModule["default"].domNode
  }, (0, _preact.h)("div", {
    className: _NodeModule["default"].parent
  }, (0, _preact.h)("div", {
    className: _NodeModule["default"].copyButton
  }, (0, _preact.h)(_CopyButton["default"], {
    getText: getCopyText
  })), childKey && (0, _preact.h)("div", {
    className: _NodeModule["default"].key
  }, childKey, ":"), node.isObject ? (0, _preact.h)(_preact.Fragment, null, (0, _preact.h)("div", {
    className: _NodeModule["default"].caretIcon,
    onClick: toggleIsOpen
  }, (0, _preact.h)("i", {
    className: caretClass
  })), (0, _preact.h)("div", {
    className: _NodeModule["default"].objectType,
    onClick: toggleIsOpen
  }, node.objectType), (0, _preact.h)("div", {
    className: _NodeModule["default"].preview,
    onClick: toggleIsOpen
  }, getPreview(childKey, node.value))) : (0, _preact.h)("div", {
    className: "".concat(_NodeModule["default"].value, " ").concat(dataTypeStyle)
  }, formatSimpleValue(node.value, childKey))), isOpen && node.children.map(function (child) {
    return (0, _preact.h)("div", {
      className: "".concat(_NodeModule["default"].child, " ").concat(_NodeModule["default"][child.type])
    }, (0, _preact.h)(Node, {
      childKey: child.key,
      node: child.getNode()
    }));
  }));
};

exports.Node = Node;
var _default = Node;
/**
 * Format display of non-object values
 */

exports["default"] = _default;

var formatSimpleValue = function formatSimpleValue(value, childKey) {
  // Stringify null
  if (value === null) return 'null'; // Stringify undefined

  if (typeof value === 'undefined') return 'undefined'; // Flatten functions

  if (typeof value === 'function') return value.toString().replace(/\s+/g, ' '); // Wrap child strings in quotes

  if (childKey && typeof value === 'string') return "\"".concat(value, "\""); // Otherwise return it as a string

  return value.toString();
};
/**
 * Get a simple string preview of an object
 */


exports.formatSimpleValue = formatSimpleValue;

var getPreview = function getPreview(key, object) {
  if (object == null || (0, _typeof2["default"])(object) !== 'object') return ''; // Objects only

  if (key === '__proto__') return '{…}';
  return !Array.isArray(object) ? "{".concat(Object.keys(object).join(':…, '), ":\u2026}") : "[".concat(object.map(function (child) {
    if (Array.isArray(child)) return '[…]';
    if ((0, _typeof2["default"])(child) === 'object') return '{…}';
    return child;
  }).join(', '), "]");
};

exports.getPreview = getPreview;