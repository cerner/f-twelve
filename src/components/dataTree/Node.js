import jsx from '../../utilities/jsx';
import DomNode from './DomNode';

/**
 * Node that recursively builds a tree with any JS data and truncate circular references so it can be converted to JSON
 */
const Node = ({ value, parent = null }) => {
  // Populate the node
  const node = { value, parent };
  node.children = getChildren(node);
  node.toJson = () => toJson(node);
  // node.el = <Node data={data}/>; // TODO: Tie into DOM
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
    const childValue = parent.value[child.key];
    const circularAncestor = getCircularAncestor(parent, childValue);
    return {
      key: child.key,
      type: child.type,
      node: circularAncestor || Node({ value: childValue, parent })
    };
  });
};

/**
 * Find nodes that already exist in this family line
 */
const getCircularAncestor = (parentNode, value) => {
  if (!parentNode) return null;
  if (parentNode.value === value) return parentNode;
  return getCircularAncestor(parentNode.parent, value);
};

/**
 * Use the regular JSON.stringify for this node but terminate circular references
 * @param node
 */
const toJson = (node) => {
  const value = node.value;

  // End recursion
  if (node.parents && node.parents.find(parent => parent.value === value)) {
    return '"-circular-"';
  } else if (typeof value !== 'object') {
    return JSON.stringify(value);
  }

  // Begin recursion
  const childrenCsv = node.children.map(childKey => {
    return `"${childKey}":${node[childKey].toJson()}`;
  }).join(',');

  return Array.isArray(value) ? `[${childrenCsv}]` : `{${childrenCsv}}`;
};

export default Node;
