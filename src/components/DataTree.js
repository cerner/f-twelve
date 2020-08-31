import jsx from '../utilities/jsx';
import styles from './DataTree.module.scss';

/**
 * Display JS data in the DOM as an interactive tree
 * Code adapted for f-twelve from pgrabovets/json-view
 * https://github.com/pgrabovets/json-view/blob/master/src/jsonview.js
 */
export default ({ data }) => {
  const ExpandedItem = ({ key, size }) => {
    return (
      <div className={styles.item}>
        <div className={styles.caretIcon}><i className={`${styles.fas} ${styles.faCaretRight}`}/></div>
        <div className={styles.jsonKey}>{key}</div>
        <div className={styles.jsonSize}>{size}</div>
      </div>
    );
  };

  const CollapsedItem = ({ key, value, type }) => {
    return (
      <div className={styles.item}>
        <div className={styles.jsonKey}>{key}</div>
        <div className={styles.jsonSeparator}>:</div>
        <div className={`${styles.jsonValue} ${styles.json} ${styles[type]}`}>{value}</div>
      </div>
    );
  };

  const hideNodeChildren = (node) => {
    node.children.forEach((child) => {
      child.el.classList.add(styles.hide);
      if (child.isExpanded) {
        hideNodeChildren(child);
      }
    });
  };

  const showNodeChildren = (node) => {
    node.children.forEach((child) => {
      child.el.classList.remove(styles.hide);
      if (child.isExpanded) {
        showNodeChildren(child);
      }
    });
  };

  const setCaretIconDown = (node) => {
    if (node.children.length > 0) {
      const icon = node.el.querySelector(`.${styles.fas}`);
      if (icon) {
        icon.classList.replace(styles.faCaretRight, styles.faCaretDown);
      }
    }
  };

  const setCaretIconRight = (node) => {
    if (node.children.length > 0) {
      const icon = node.el.querySelector(`.${styles.fas}`);
      if (icon) {
        icon.classList.replace(styles.faCaretDown, styles.faCaretRight);
      }
    }
  };

  const toggleNode = (node) => {
    if (node.isExpanded) {
      node.isExpanded = false;
      setCaretIconRight(node);
      hideNodeChildren(node);
    } else {
      node.isExpanded = true;
      setCaretIconDown(node);
      showNodeChildren(node);
    }
  };

  const createContainerElement = () => {
    const el = document.createElement('div');
    el.className = styles.dataTree;
    return el;
  };

  /**
   * Create node html element
   * @param {object} node
   * @return html element
   */
  const createNodeElement = (node) => {
    const getSizeString = (node) => {
      const len = node.children.length;
      if (node.type === 'array') return `[${len}]`;
      if (node.type === 'object') return `{${len}}`;
      return null;
    };

    const el = node.children.length > 0
      ? <ExpandedItem key={node.key} size={getSizeString(node)}/>
      : <CollapsedItem key={node.key} type={typeof node.value} value={node.value}/>;

    if (node.children.length > 0) {
      const caretEl = el.querySelector(`.${styles.caretIcon}`);
      caretEl.addEventListener('click', () => {
        toggleNode(node);
      });
    }

    if (node.parent !== null) {
      el.classList.add(styles.hide);
    }

    el.style = 'margin-left: ' + node.depth * 18 + 'px;';

    return el;
  };

  /**
   * Get value data type
   * @param {*} data
   */
  const getDataType = (val) => {
    let type = typeof val;
    if (Array.isArray(val)) type = 'array';
    if (val === null) type = 'null';
    return type;
  };

  /**
   * Recursively traverse Tree object
   * @param {Object} node
   * @param {Callback} callback
   */
  const traverseTree = (node, callback) => {
    callback(node);
    if (node.children.length > 0) {
      node.children.forEach((child) => {
        traverseTree(child, callback);
      });
    }
  };

  /**
   * Create node object
   * @param {object} opt options
   * @return {object}
   */
  const createNode = (opt = {}) => {
    return {
      key: opt.key || null,
      parent: opt.parent || null,
      value: opt.hasOwnProperty('value') ? opt.value : null,
      isExpanded: opt.isExpanded || false,
      type: opt.type || null,
      children: opt.children || [],
      el: opt.el || null,
      depth: opt.depth || 0,
    };
  };

  /**
   * Create subnode for node
   * @param {object} Json data
   * @param {object} node
   */
  const createSubnode = (data, node) => {
    if (typeof data === 'object') {
      for (let key in data) {
        const child = createNode({
          value: data[key],
          key: key,
          depth: node.depth + 1,
          type: getDataType(data[key]),
          parent: node,
        });
        node.children.push(child);
        createSubnode(data[key], child);
      }
    }
  };

  /**
   * Create tree
   * @param {object} data
   * @return {object}
   */
  const createTree = (data) => {
    const rootNode = createNode({
      value: data,
      key: getDataType(data),
      type: getDataType(data),
    });
    createSubnode(data, rootNode);
    return rootNode;
  };

  /**
   * Render tree into DOM container
   * @param {object} tree
   */
  const render = (tree) => {
    const containerEl = createContainerElement();

    traverseTree(tree, function(node) {
      node.el = createNodeElement(node);
      containerEl.appendChild(node.el);
    });

    return containerEl;
  };

  const expandChildren = (node) => {
    traverseTree(node, function(child) {
      child.el.classList.remove(styles.hide);
      child.isExpanded = true;
      setCaretIconDown(child);
    });
  };

  const collapseChildren = (node) => {
    traverseTree(node, function(child) {
      child.isExpanded = false;
      if (child.depth > node.depth) child.el.classList.add(styles.hide);
      setCaretIconRight(child);
    });
  };

  return {
    el: render(createTree(data)),
    expandChildren,
    collapseChildren,
    traverseTree,
  };
};
