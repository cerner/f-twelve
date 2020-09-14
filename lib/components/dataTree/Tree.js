"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNode = exports["default"] = void 0;

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _Node = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Create an interactive data tree with any JS variable
 *
 * There are 2 types of nodes:
 *
 *   1. Data tree node (lowercase 'n')
 *      Holds the relationship information to needed to traverse/serialize the tree
 *
 *   2. DOM Node component (uppercase 'N')
 *      Uses the data tree node to generate HTML elements that represent the tree
 */
var _default = function _default(_ref) {
  var data = _ref.data;
  // Generate a data tree
  var dataTree = getNode(data); // Use the data tree to populate the DOM tree

  return {
    dataTree: dataTree,
    el: (0, _jsx["default"])(_Node["default"], {
      node: dataTree
    })
  };
};
/**
 * Node that recursively builds a tree with any JS data and provides a toJson function that handles circular references
 */


exports["default"] = _default;

var getNode = function getNode(value) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var node = {
    value: value,
    parent: parent
  };
  node.children = getChildren(node);
  node.toJson = toJson.bind(null, node);
  return node;
};
/**
 * Retrieve all fields that exist on an object and return an array of their meta info (key, type, node)
 */


exports.getNode = getNode;

var getChildren = function getChildren(parent) {
  // Null would make more sense for non-objects but an empty array is easier to work with
  if (parent.value == null || _typeof(parent.value) !== 'object') return []; // Get object members and properties i.e. children

  var keys = Object.keys(parent.value);
  var members = keys.map(function (key) {
    return {
      key: key,
      type: 'member'
    };
  });
  var properties = Object.getOwnPropertyNames(parent.value).filter(function (key) {
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
  }]).filter(function (child) {
    return !(Object.getOwnPropertyDescriptor(parent.value, child.key) || {}).get;
  }); // Return an array of objects with metadata for each child including the child's node

  return children.map(function (child) {
    var value = parent.value[child.key];
    var circularAncestor = getCircularAncestor(parent, value); // It would simplify things to just return the node with childKey/childType fields added to it, however
    //  a given node can live in 2 places with different keys thus the extra layer is necessary

    return {
      key: child.key,
      type: child.type,
      node: circularAncestor || getNode(value, parent) // End or begin recursion

    };
  });
};
/**
 * Use the regular JSON.stringify for simple values but stop traversing children that are circular references
 * Manually glue the simple values together with JSON syntax characters (commas, brackets, curly braces)
 */


var toJson = function toJson(node) {
  var value = node.value; // End recursion

  if (value === null) {
    return 'null';
  } else if (typeof value === 'function') {
    return JSON.stringify(value.toString());
  } else if (_typeof(value) !== 'object') {
    return JSON.stringify(value) || '"-undefined-"';
  }

  var childrenCsv = node.children.filter(function (child) {
    return child.type === 'member';
  }).map(function (child) {
    var childValue = node.value[child.key];
    var circularAncestor = getCircularAncestor(node, childValue);
    var value = circularAncestor ? '"-circular-"' // End recursion
    : child.node.toJson(); // Begin recursion

    return Array.isArray(node.value) ? value : "\"".concat(child.key, "\":").concat(value);
  }).join(',');
  return Array.isArray(value) ? "[".concat(childrenCsv, "]") : "{".concat(childrenCsv, "}");
};
/**
 * Find nodes that already exist in this "family line"
 */


var getCircularAncestor = function getCircularAncestor(parentNode, value) {
  if (!parentNode) return null;
  if (parentNode.value === value) return parentNode;
  return getCircularAncestor(parentNode.parent, value);
};