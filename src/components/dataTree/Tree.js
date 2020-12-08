import { h } from 'preact';
import Node from './Node';
import getDataType from '../../utilities/getDataType';

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
export default ({ data, dataTree, withProto = true }) => {
  // Generate a data tree or use the one provided
  const node = dataTree || getNode(data, null, withProto);
  // Use the data tree to populate the DOM tree
  return <Node node={node}/>;
};

/**
 * Node that recursively builds a tree that represents JS data
 *   and provides a toJson function that handles circular references
 */
export const getNode = (value, parent = null, withProto = true) => {
  const node = {};
  node.value = value;
  node.parent = parent;
  node.children = getChildren(node, withProto);
  node.toJson = toJson.bind(null, node);
  node.isObject = typeof value === 'object' && value !== null;
  node.size = node.isObject && (
    Array.isArray(value)
      ? Object.keys(value).length
      : Object.getOwnPropertyNames(value).length
  );
  node.dataType = getDataType(node.value);
  node.objectType = node.isObject && `${node.dataType.charAt(0).toUpperCase()}${node.dataType.slice(1)}(${node.size})`;
  return node;
};

/**
 * Retrieve all fields that exist on an object and return an array of their meta info (key, type, node)
 */
const getChildren = (parent, withProto) => {
  // Null would make more sense for non-objects but an empty array is easier to work with
  if (parent.value == null || typeof parent.value !== 'object') return [];

  // Get object members and properties i.e. children
  const keys = Object.keys(parent.value);
  const members = keys.map(key => ({ key, type: 'member', }));
  const properties = Object.getOwnPropertyNames(parent.value)
    .filter(key => keys.indexOf(key) === -1)
    .map(key => ({ key, type: 'property', }));
  const proto = withProto ? [{ key: '__proto__', type: 'property' }] : [];
  const children = [...members, ...properties, ...proto]
    .filter(child => canRead(parent.value, child.key));

  // Return an array of objects with metadata for each child including the child's node
  return children.map(child => {
    const value = parent.value[child.key];
    const circularAncestor = getCircularAncestor(parent, value);
    // It would simplify things to just return the node with childKey/childType fields added to it, however
    //  a given node can live in 2 places with different keys thus the extra layer is necessary
    return {
      key: child.key,
      type: child.type,
      // Provide this `getNode` for anyone to use later
      getNode: () => circularAncestor || getNode(value, parent, withProto) // End or begin recursion
    };
  });
};

/**
 * Use the regular JSON.stringify for simple values but stop traversing children that are circular references
 * Manually glue the simple values together with JSON syntax characters (commas, brackets, curly braces)
 */
const toJson = (node) => {
  const value = node.value;

  // End recursion
  if (value === null) {
    return 'null';
  } else if (typeof value === 'function') {
    return JSON.stringify(value.toString());
  } else if (typeof value !== 'object') {
    return JSON.stringify(value) || '"-undefined-"';
  }

  const childrenCsv = node.children
    .filter(child => child.type === 'member')
    .map(child => {
      const childValue = node.value[child.key];
      const circularAncestor = getCircularAncestor(node, childValue);
      const value = circularAncestor
        ? '"-circular-"' // End recursion
        : child.getNode().toJson(); // Begin recursion
      return Array.isArray(node.value) ? value : `"${child.key}":${value}`;
    }).join(',');

  return Array.isArray(value) ? `[${childrenCsv}]` : `{${childrenCsv}}`;
};

/**
 * Find nodes that already exist in this "family line"
 */
const getCircularAncestor = (parentNode, value) => {
  if (!parentNode) return null;
  if (parentNode.value === value) return parentNode;
  return getCircularAncestor(parentNode.parent, value);
};

// Determine if a key is readable on an object with throwing an error (happens in IE)
export const canRead = (object, key) => {
  try {
    const value = object[key];
    return !!value || (key in object);
  } catch (e) {
    return false;
  }
};
