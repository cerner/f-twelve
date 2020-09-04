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

  // Add this child to the parent in order to build a tree
  // if (parent && !parent.children.find(child => child.data === data)) parent.children.push(node);

  // Build a tree
  // if (parent && !parent.children.find(child => child.data === data)) return node;

  // Save this toJson so the tree can be manually traversed and converted to a string without circular references


  // node.fields.forEach(field =>
  //   (node.children[field.key] = Node({ data: data[field.key], parent: node }))
  // );

  return node;
};

/**
 * Retrieve all fields that exist on an object and return an array of their meta info (key, type, Node)
 */
const getChildren = (parent) => {
  const value = parent.value;
  if (value == null || typeof value !== 'object') return [];
  const keys = Object.keys(value);
  const members = keys.map(key => ({
    key,
    type: 'member',
    value: value[key],
  }));
  const properties = Object.getOwnPropertyNames(value)
    .filter(key => keys.indexOf(key) === -1)
    .map(key => ({
      key,
      type: 'property',
      value: value[key]
    }));
  const children = [...members, ...properties, { key: '__proto__', type: 'property' }];
  return children.map(child => {
    const circularAncestor = getCircularAncestor(parent, child.value);
    return {
      ...child,
      node: circularAncestor || Node({ value: child.value, parent })
    }
  });
};

/**
 * Find nodes that already exist in this family line
 */
const getCircularAncestor = (parentNode, value) => {
  if (!parentNode) return null;
  if (parentNode.value === value) return parentNode;
  return getCircularAncestor(parentNode.parent);
}

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
