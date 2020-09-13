"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = jsx;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * JSX transpiler pragma
 * @returns {HTMLElement}
 */
function jsx(tagName, attributes) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // Fragments are called `fragment` per pragmaFrag babel config
  if (tagName === 'fragment') return children; // It's not a tag name, it's a custom component

  if (typeof tagName === 'function') return getCustomComponent(tagName, _objectSpread({}, attributes, {
    children: children
  })); // Create Element

  var element = document.createElement(tagName); // Remove `children` attribute
  // Occurs when using a spread operator to pass-thru props, this attribute causes an error in Object.assign

  attributes && delete attributes.children; // Append attributes

  Object.assign(element, attributes); // Append children

  children.forEach(function (child) {
    return append(element, child);
  }); // Provide the node via ref prop

  if (attributes && typeof attributes.ref === 'function') {
    attributes.ref(element);
  }

  return element;
}
/**
 * Custom components can return JSX directly or an object with the JSX in a member called `el`.
 * The raw return value of the custom component is accessible from parent JSX via the `ref` prop.
 * This allows components to expose functions or values while still being used like a regular JSX component.
 */


var getCustomComponent = function getCustomComponent(functionalComponent, attributes) {
  // Get the component
  var component = functionalComponent(_objectSpread({}, attributes)); // Provide the whole component via ref prop

  if (attributes && typeof attributes.ref === 'function') {
    attributes.ref(component);
  } // Component's JSX can be returned directly or in the `el` member


  return component instanceof HTMLElement || Array.isArray(component) ? component : component.el;
};
/**
 * Handle arrays and text nodes
 */


var append = function append(parent, child) {
  if (child === null || typeof child === 'boolean' || typeof child === 'function') {// Do nothing!
  } else if (Array.isArray(child)) {
    child.forEach(function (grandChild) {
      return append(parent, grandChild);
    });
  } else if (typeof child === 'string' || typeof child === 'number') {
    parent.appendChild(document.createTextNode(child));
  } else {
    parent.appendChild(child);
  }
};