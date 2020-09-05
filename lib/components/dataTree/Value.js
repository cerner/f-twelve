"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _Node = _interopRequireDefault(require("./Node"));

var _ValueModule = _interopRequireDefault(require("./Value.module.scss"));

var _getDataType = _interopRequireDefault(require("../../utilities/getDataType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * The actual value of a Node. The only prop is meta as it has everything needed to create a new Node on click.
 */
var _default = function _default(_ref) {
  var meta = _ref.meta;
  var caretClass = "".concat(_ValueModule["default"].caret, " ").concat(meta.isOpen ? _ValueModule["default"].caretDown : _ValueModule["default"].caretRight);

  var onClickParent = function onClickParent() {
    return onClick(meta);
  };

  var dataType = (0, _getDataType["default"])(meta.data);
  var isObject = _typeof(meta.data) === 'object' && meta.data !== null;
  var objectType = isObject && "".concat(dataType.charAt(0).toUpperCase()).concat(dataType.slice(1), "(").concat(getSize(meta.data), ")");
  var dataTypeStyle = !meta.key && typeof meta.data === 'string' ? '' : _ValueModule["default"][dataType]; // Don't style parent strings

  return isObject ? (0, _jsx["default"])('fragment', null, (0, _jsx["default"])("div", {
    className: _ValueModule["default"].caretIcon,
    onclick: onClickParent
  }, (0, _jsx["default"])("i", {
    className: caretClass
  })), (0, _jsx["default"])("div", {
    className: _ValueModule["default"].objectType,
    onclick: onClickParent
  }, objectType)) : (0, _jsx["default"])("div", {
    className: "".concat(_ValueModule["default"].value, " ").concat(dataTypeStyle)
  }, formatSimpleValue(meta));
};
/**
 * Replace clicked Node with an identical Node but toggle isOpen
 */


exports["default"] = _default;

var onClick = function onClick(meta) {
  var newNode = (0, _jsx["default"])(_Node["default"], {
    data: meta.data,
    isOpen: !meta.isOpen,
    key: meta.key
  });
  meta.node.parentNode.replaceChild(newNode, meta.node);
};
/**
 * Format display of non-object values
 */


var formatSimpleValue = function formatSimpleValue(meta) {
  var value = meta.data; // Stringify null

  if (value === null) return 'null'; // Stringify undefined

  if (typeof value === 'undefined') return 'undefined'; // Flatten functions

  if (typeof value === 'function') return value.toString().replace(/\s+/g, ' '); // Wrap child strings in quotes

  if (meta.key && typeof value === 'string') return "\"".concat(value, "\""); // Otherwise return it as a string

  return value.toString();
};
/**
 * Get object (must be Object or Array) size
 */


var getSize = function getSize(object) {
  return Array.isArray(object) ? Object.keys(object).length : Object.getOwnPropertyNames(object).length;
};