"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canRead = exports.getNode = exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _preact = require("preact");

var _Node = _interopRequireDefault(require("./Node"));

var _getDataType = _interopRequireDefault(require("../../utilities/getDataType"));

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
  var data = _ref.data,
      dataTree = _ref.dataTree;

  // Generate a data tree or use the one provided
  var node = dataTree || _getNode(data); // Use the data tree to populate the DOM tree


  return (0, _preact.h)(_Node["default"], {
    node: node
  });
};
/**
 * Node that recursively builds a tree that represents JS data
 *   and provides a toJson function that handles circular references
 */


exports["default"] = _default;

var _getNode = function getNode(value) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var node = {
    value: value,
    parent: parent
  };
  node.children = getChildren(node);
  node.toJson = toJson.bind(null, node);
  node.isObject = (0, _typeof2["default"])(value) === 'object' && value !== null;
  node.size = node.isObject && (Array.isArray(value) ? Object.keys(value).length : Object.getOwnPropertyNames(value).length);
  node.dataType = (0, _getDataType["default"])(node.value);
  node.objectType = node.isObject && "".concat(node.dataType.charAt(0).toUpperCase()).concat(node.dataType.slice(1), "(").concat(node.size, ")");
  return node;
};
/**
 * Retrieve all fields that exist on an object and return an array of their meta info (key, type, node)
 */


exports.getNode = _getNode;

var getChildren = function getChildren(parent) {
  // Null would make more sense for non-objects but an empty array is easier to work with
  if (parent.value == null || (0, _typeof2["default"])(parent.value) !== 'object') return []; // Get object members and properties i.e. children

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
  var children = [].concat((0, _toConsumableArray2["default"])(members), (0, _toConsumableArray2["default"])(properties), [{
    key: '__proto__',
    type: 'property'
  }]).filter(function (child) {
    return canRead(parent.value, child.key);
  }); // Return an array of objects with metadata for each child including the child's node

  return children.map(function (child) {
    var value = parent.value[child.key];
    var circularAncestor = getCircularAncestor(parent, value); // It would simplify things to just return the node with childKey/childType fields added to it, however
    //  a given node can live in 2 places with different keys thus the extra layer is necessary

    return {
      key: child.key,
      type: child.type,
      getNode: function getNode() {
        return circularAncestor || _getNode(value, parent);
      } // End or begin recursion

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
  } else if ((0, _typeof2["default"])(value) !== 'object') {
    return JSON.stringify(value) || '"-undefined-"';
  }

  var childrenCsv = node.children.filter(function (child) {
    return child.type === 'member';
  }).map(function (child) {
    var childValue = node.value[child.key];
    var circularAncestor = getCircularAncestor(node, childValue);
    var value = circularAncestor ? '"-circular-"' // End recursion
    : child.getNode().toJson(); // Begin recursion

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
}; // Determine if a key is readable on an object with throwing an error (happens in IE)


var canRead = function canRead(object, key) {
  try {
    var value = object[key];
    return !!value || key in object;
  } catch (e) {
    return false;
  }
};

exports.canRead = canRead;