/**
 * JSX transpiler pragma
 * @returns {HTMLElement}
 */
export default function jsx(tagName, attributes, ...children) {
  // Fragments are called `fragment` per pragmaFrag babel config
  if (tagName === 'fragment') return children;

  // It's not a tag name, it's a custom component
  if (typeof tagName === 'function') return getCustomComponent(tagName, { ...attributes, children });

  // Create Element
  const element = document.createElement(tagName);

  // Append attributes
  Object.assign(element, attributes);

  // Append children
  children.forEach(child => append(element, child));

  // Provide the node via ref prop
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
  return component instanceof HTMLElement || Array.isArray(component) ? component : component.el;
};

/**
 * Handle arrays and text nodes
 */
const append = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(grandChild => append(parent, grandChild));
  } else if (typeof child === 'string') {
    parent.append(document.createTextNode(child));
  } else {
    parent.append(child);
  }
};
