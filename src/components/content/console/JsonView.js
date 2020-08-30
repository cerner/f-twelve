/**
 * Based on https://github.com/pgrabovets/json-view/blob/master/src/jsonview.js
 */

import jsx from '../../../utilities/jsx';
import styles from './jsonview.module.scss';


// TODO: Replace this with a jsx component
function expandedTemplate(params = {}) {
  const { key, size } = params;
  return `
    <div class="${styles.line}">
      <div class="${styles.caretIcon}"><i class="${styles.fas} ${styles.faCaretRight}"></i></div>
      <div class="${styles.jsonKey}">${key}</div>
      <div class="${styles.jsonSize}">${size}</div>
    </div>
  `
}

// TODO: Replace this with a jsx component
function notExpandedTemplate(params = {}) {
  const { key, value, type } = params;
  return `
    <div class="${styles.line}">
      <div class="${styles.emptyIcon}"></div>
      <div class="${styles.jsonKey}">${key}</div>
      <div class="${styles.jsonSeparator}">:</div>
      <div class="${styles.jsonValue} ${styles.json} ${styles[type]}">${value}</div>
    </div>
  `
}


function hideNodeChildren(node) {
  node.children.forEach((child) => {
    child.el.classList.add(styles.hide);
    if (child.isExpanded) {
      hideNodeChildren(child);
    }
  });
}


function showNodeChildren(node) {
  node.children.forEach((child) => {
    child.el.classList.remove(styles.hide);
    if (child.isExpanded) {
      showNodeChildren(child);
    }
  });
}


function setCaretIconDown(node) {
  if (node.children.length > 0) {
    const icon = node.el.querySelector(`.${styles.fas}`);
    if (icon) {
      icon.classList.replace(styles.faCaretRight, styles.faCaretDown);
    }
  }
}


function setCaretIconRight(node) {
  if (node.children.length > 0) {
    const icon = node.el.querySelector(`.${styles.fas}`);
    if (icon) {
      icon.classList.replace(styles.faCaretDown, styles.faCaretRight);
    }
  }
}


function toggleNode(node) {
  if (node.isExpanded) {
    node.isExpanded = false;
    setCaretIconRight(node);
    hideNodeChildren(node);
  } else {
    node.isExpanded = true;
    setCaretIconDown(node);
    showNodeChildren(node);
  }
}


function createContainerElement() {
  const el = document.createElement('div');
  el.className = styles.jsonContainer;
  return el;
}


/**
 * Create node html element
 * @param {object} node
 * @return html element
 */
function createNodeElement(node) {
  let el = document.createElement('div');

  const getSizeString = (node) => {
    const len = node.children.length;
    if (node.type === 'array') return `[${len}]`;
    if (node.type === 'object') return `{${len}}`;
    return null;
  }

  if (node.children.length > 0) {
    el.innerHTML = expandedTemplate({
      key: node.key,
      size: getSizeString(node),
    })

    const caretEl = el.querySelector(`.${styles.caretIcon}`);
    caretEl.addEventListener('click', () => {
      toggleNode(node);
    });
  } else {
    el.innerHTML = notExpandedTemplate({
      key: node.key,
      value: node.value,
      type: typeof node.value
    })
  }

  const lineEl = el.children[0];

  if (node.parent !== null) {
    lineEl.classList.add(styles.hide);
  }

  lineEl.style = 'margin-left: ' + node.depth * 18 + 'px;';

  return lineEl;
}


/**
 * Get value data type
 * @param {*} data
 */
function getDataType(val) {
  let type = typeof val;
  if (Array.isArray(val)) type = 'array';
  if (val === null) type = 'null';
  return type;
}


/**
 * Recursively traverse json object
 * @param {object} target
 * @param {function} callback
 */
function traverseObject(target, callback) {
  callback(target);
  if (typeof target === 'object') {
    for (let key in target) {
      traverseObject(target[key], callback);
    }
  }
}


/**
 * Recursively traverse Tree object
 * @param {Object} node
 * @param {Callback} callback
 */
function traverseTree(node, callback) {
  callback(node);
  if (node.children.length > 0) {
    node.children.forEach((child) => {
      traverseTree(child, callback);
    });
  }
}


/**
 * Create node object
 * @param {object} opt options
 * @return {object}
 */
function createNode(opt = {}) {
  return {
    key: opt.key || null,
    parent: opt.parent || null,
    value: opt.hasOwnProperty('value') ? opt.value : null,
    isExpanded: opt.isExpanded || false,
    type: opt.type || null,
    children: opt.children || [],
    el: opt.el || null,
    depth: opt.depth || 0,
  }
}


/**
 * Create subnode for node
 * @param {object} Json data
 * @param {object} node
 */
function createSubnode(data, node) {
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
}


/**
 * Create tree
 * @param {object | string} jsonData
 * @return {object}
 */
function createTree(jsonData) {
  const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

  const rootNode = createNode({
    value: data,
    key: getDataType(data),
    type: getDataType(data),
  });
  createSubnode(data, rootNode);
  return rootNode;
}


/**
 * Render JSON string into DOM container
 * @param {string | object} jsonData
 * @param {htmlElement} targetElement
 * @return {object} tree
 */
function renderJSON(jsonData, targetElement) {
  const parsedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
  const tree = createTree(parsedData);
  render(tree, targetElement);
  return tree;
}


/**
 * Render tree into DOM container
 * @param {object} tree
 * @param {htmlElement} targetElement
 */
function render(tree, targetElement) {
  const containerEl = createContainerElement();

  traverseTree(tree, function(node) {
    node.el = createNodeElement(node);
    containerEl.appendChild(node.el);
  });

  targetElement.appendChild(containerEl);
}


function expandChildren(node) {
  traverseTree(node, function(child) {
    child.el.classList.remove(styles.hide);
    child.isExpanded = true;
    setCaretIconDown(child);
  });
}

function collapseChildren(node) {
  traverseTree(node, function(child) {
    child.isExpanded = false;
    if (child.depth > node.depth) child.el.classList.add(styles.hide);
    setCaretIconRight(child);
  });
}


/**
 * Export public interface
 */
export {
  render,
  createTree,
  renderJSON,
  expandChildren,
  collapseChildren,
  traverseTree,
}
