import jsx from '../../utilities/jsx';
import Node from './Node';

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
export default ({ data }) => {
  // Generate a data tree
  const dataTree = getNode({ value: data });
  // Use the data tree to populate the DOM tree
  return <Node node={dataTree}/>;
};

/**
 * Node that recursively builds a tree with any JS data and provides a toJson function that handles circular references
 */
const getNode = ({ value, parent = null }) => {
  const node = { value, parent };
  node.children = getChildren(node);
  node.toJson = toJson.bind(null, node);
  return node;
};

/**
 * Retrieve all fields that exist on an object and return an array of their meta info (key, type, node)
 */
const getChildren = (parent) => {
  // Null makes more sense for non-objects but an empty array is easier to work with
  if (parent.value == null || typeof parent.value !== 'object') return [];

  // Get object members and properties i.e. children
  const keys = Object.keys(parent.value);
  const members = keys.map(key => ({ key, type: 'member', }));
  const properties = Object.getOwnPropertyNames(parent.value)
    .filter(key => keys.indexOf(key) === -1)
    .map(key => ({ key, type: 'property', }));
  const children = [...members, ...properties, { key: '__proto__', type: 'property' }];

  // Create a node for each child
  return children.map(child => {
    const value = parent.value[child.key];
    const circularAncestor = getCircularAncestor(parent, value);
    return {
      key: child.key,
      type: child.type,
      node: circularAncestor || getNode({ value, parent })
    };
  });
};

/**
 * Find nodes that already exist in this "family line"
 */
const getCircularAncestor = (parentNode, value) => {
  if (!parentNode) return null;
  if (parentNode.value === value) return parentNode;
  return getCircularAncestor(parentNode.parent, value);
};

/**
 * Use the regular JSON.stringify for simple values but stop traversing children that are circular references
 * Manually glue the simple values together with JSON syntax characters (commas, brackets, curly braces)
 */
const toJson = (node) => {
  const value = node.value;

  if (typeof value !== 'object') {
    return JSON.stringify(value);
  }

  const childrenCsv = node.children
    .filter(child => child.type === 'member')
    .map(child => {
      const childValue = node.value[child.key];
      const circularAncestor = getCircularAncestor(node, childValue);
      const value = circularAncestor ? '"-circular-"' : child.node.toJson();
      return Array.isArray(node.value) ? value : `"${child.key}":${value}`;
    }).join(',');

  return Array.isArray(value) ? `[${childrenCsv}]` : `{${childrenCsv}}`;
};
