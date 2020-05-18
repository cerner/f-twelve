/**
 * JSX transpiler pragma
 * @returns {HTMLElement}
 */
export default function dom(tagName, attributes, ...children) {
  // Fragments are called `fragment`  pragmaFrag babel config
  if (tagName === 'fragment') return children;

  // Custom component was passed in
  if (typeof tagName === 'function') return tagName();

  // Create Element
  const element = document.createElement(tagName);

  // Append attributes
  Object.assign(element, attributes);

  // Append children
  children.forEach(child => {
    if (Array.isArray(child)) element.append(...child);
    else element.append(child);
  });

  return element;
}
