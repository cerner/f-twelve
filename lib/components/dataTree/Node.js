"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _NodeModule = _interopRequireDefault(require("./Node.module.scss"));

var _Value = _interopRequireDefault(require("./Value"));

var _CopyButton = _interopRequireDefault(require("../CopyButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * A DOM element representing any JS value/object including its children.
 */
var Node = function Node(_ref) {
  var node = _ref.node,
      isOpen = _ref.isOpen,
      key = _ref.key;
  // Meta DOM information to accompany the node data
  var meta = {
    el: null,
    node: node,
    isOpen: isOpen,
    key: key
  }; // Convert objects to json and beautify it, return everything else as-is

  var getCopyText = function getCopyText() {
    return _typeof(node.value) === 'object' && node.value !== null ? JSON.stringify(JSON.parse(node.toJson()), null, 2) : node.value;
  };

  var el = (0, _jsx["default"])("div", {
    className: _NodeModule["default"].domNode
  }, (0, _jsx["default"])("div", {
    className: _NodeModule["default"].parent
  }, (0, _jsx["default"])("div", {
    className: _NodeModule["default"].copyButton
  }, (0, _jsx["default"])(_CopyButton["default"], {
    getText: getCopyText
  })), key && (0, _jsx["default"])("div", {
    className: _NodeModule["default"].key
  }, key, ":"), (0, _jsx["default"])(_Value["default"], {
    meta: meta,
    onClick: onClickNode.bind(null, meta)
  })), isOpen && node.children.map(function (child) {
    return (0, _jsx["default"])("div", {
      className: "".concat(_NodeModule["default"].child, " ").concat(_NodeModule["default"][child.type])
    }, (0, _jsx["default"])(Node, {
      key: child.key,
      node: child.node
    }));
  })); // Add the element itself to the meta

  meta.el = el;
  return el;
};
/**
 * Replace clicked Node with an identical Node but toggle isOpen
 */


var onClickNode = function onClickNode(meta) {
  var newNode = (0, _jsx["default"])(Node, {
    isOpen: !meta.isOpen,
    key: meta.key,
    node: meta.node
  });
  meta.el.parentNode.replaceChild(newNode, meta.el);
};

var _default = Node;
exports["default"] = _default;