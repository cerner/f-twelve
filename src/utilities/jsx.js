/**
 * JSX transpiler pragma
 * @returns {HTMLElement}
 */
export default function jsx(tagName, attributes, ...children) {
  // Fragments are called `fragment` per pragmaFrag babel config
  if (tagName === 'fragment') return children;

  // It's not a tag name, it's a custom component
  if (typeof tagName === 'function') return getCustomComponent(tagName, { ...attributes, children });

  // Remove `children` attribute
  // Occurs when using a spread operator to pass-thru props, this attribute causes an error in Object.assign
  attributes && delete attributes.children;

  // Create Element
  const element = (isSvg(tagName))
    ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
    : document.createElement(tagName);

  // Append attributes
  (isSvg(tagName))
    ? Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
    : Object.assign(element, attributes);

  // Append children
  children.forEach(child => appendChild(element, child));

  // Provide the element via ref prop
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
const getCustomComponent = (functionalComponent, attributes) => {
  // Get the component
  const component = functionalComponent({ ...attributes });

  // Provide the whole component via ref prop
  if (attributes && typeof attributes.ref === 'function') {
    attributes.ref(component);
  }

  // Component's JSX can be returned directly or in the `el` member
  return (
    component instanceof HTMLElement ||
    component instanceof SVGElement ||
    Array.isArray(component)
  ) ? component
    : component.el;
};

/**
 * Handle arrays and text nodes
 */
const appendChild = (parent, child) => {
  if (child === null || typeof child === 'boolean' || typeof child === 'function' || typeof child === 'undefined') {
    // Do nothing!
  } else if (Array.isArray(child)) {
    child.forEach(grandChild => appendChild(parent, grandChild));
  } else if (typeof child === 'string' || typeof child === 'number') {
    parent.appendChild(document.createTextNode(child));
  } else {
    parent.appendChild(child);
  }
};

/**
 * Determine if a given tag is an SVG element
 */
export function isSvg(tagName) {
  const regExp = new RegExp(`^${tagName}$`, 'i');
  const svgTags = ['circle', 'g', 'path', 'polygon', 'rect', 'svg', 'use'];
  return svgTags.some(tag => regExp.test(tag));
}
