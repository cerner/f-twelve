"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreview = exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _ValueModule = _interopRequireDefault(require("./Value.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * The actual value of a Node. The only prop is meta as it has everything needed to create a new Node on click.
 */
var _default = function _default(_ref) {
  var meta = _ref.meta,
      onClick = _ref.onClick;
  var node = meta.node;
  var caretClass = "".concat(_ValueModule["default"].caret, " ").concat(meta.isOpen ? _ValueModule["default"].caretDown : _ValueModule["default"].caretRight);
  var dataTypeStyle = !meta.key && typeof node.value === 'string' ? '' : _ValueModule["default"][node.dataType]; // Don't style parent strings

  return node.isObject ? (0, _jsx["default"])('fragment', null, (0, _jsx["default"])("div", {
    className: _ValueModule["default"].caretIcon,
    onclick: onClick
  }, (0, _jsx["default"])("i", {
    className: caretClass
  })), (0, _jsx["default"])("div", {
    className: _ValueModule["default"].objectType,
    onclick: onClick
  }, node.objectType), (0, _jsx["default"])("div", {
    className: _ValueModule["default"].preview,
    onclick: onClick
  }, getPreview(meta.key, node.value))) : (0, _jsx["default"])("div", {
    className: "".concat(_ValueModule["default"].value, " ").concat(dataTypeStyle)
  }, formatSimpleValue(meta));
};
/**
 * Format display of non-object values
 */


exports["default"] = _default;

var formatSimpleValue = function formatSimpleValue(meta) {
  var value = meta.node.value; // Stringify null

  if (value === null) return 'null'; // Stringify undefined

  if (typeof value === 'undefined') return 'undefined'; // Flatten functions

  if (typeof value === 'function') return value.toString().replace(/\s+/g, ' '); // Wrap child strings in quotes

  if (meta.key && typeof value === 'string') return "\"".concat(value, "\""); // Otherwise return it as a string

  return value.toString();
};
/**
 * Get a simple string preview of an object
 */


var getPreview = function getPreview(key, object) {
  if (object == null || _typeof(object) !== 'object') return ''; // Objects only

  if (key === '__proto__') return '{…}';
  return !Array.isArray(object) ? "{".concat(Object.keys(object).join(':…, '), ":\u2026}") : "[".concat(object.map(function (child) {
    if (Array.isArray(child)) return '[…]';
    if (_typeof(child) === 'object') return '{…}';
    return child;
  }).join(', '), "]");
};

exports.getPreview = getPreview;