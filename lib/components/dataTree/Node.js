"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _NodeModule = _interopRequireDefault(require("./Node.module.scss"));

var _Value = _interopRequireDefault(require("./Value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * A DOM element representing any JS value/object including its children
 */
var Node = function Node(_ref) {
  var data = _ref.data,
      _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
      _ref$key = _ref.key,
      key = _ref$key === void 0 ? null : _ref$key;
  // Meta object to accompany the data
  var meta = {
    data: data,
    isOpen: isOpen,
    key: key
  };
  var objectData = _typeof(data) === 'object' ? data || [] : [];
  var keys = Object.keys(objectData);
  var members = keys.map(function (key) {
    return {
      key: key,
      type: 'member'
    };
  });
  var properties = Object.getOwnPropertyNames(objectData).filter(function (key) {
    return keys.indexOf(key) === -1;
  }).map(function (key) {
    return {
      key: key,
      type: 'property'
    };
  });
  var children = [].concat(_toConsumableArray(members), _toConsumableArray(properties), [{
    key: '__proto__',
    type: 'property'
  }]);
  var el = (0, _jsx["default"])("div", {
    className: _NodeModule["default"].node
  }, (0, _jsx["default"])("div", {
    className: _NodeModule["default"].parent
  }, key && (0, _jsx["default"])("div", {
    className: _NodeModule["default"].key
  }, key, ":"), (0, _jsx["default"])(_Value["default"], {
    meta: meta
  })), isOpen && children.map(function (child) {
    return (0, _jsx["default"])("div", {
      className: "".concat(_NodeModule["default"].child, " ").concat(_NodeModule["default"][child.type])
    }, (0, _jsx["default"])(Node, {
      data: data[child.key],
      key: child.key
    }));
  })); // Add the element itself to the meta

  meta.node = el;
  return {
    el: el,
    meta: meta
  };
};

var _default = Node;
exports["default"] = _default;