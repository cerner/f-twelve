import { h, Fragment } from 'preact';
import styles from './Value.module.scss';

/**
 * The actual value of a Node. The only prop is meta as it has everything needed to create a new Node on click.
 */
export default ({ meta, onClick }) => {
  const node = meta.node;
  const caretClass = `${styles.caret} ${meta.isOpen ? styles.caretDown : styles.caretRight}`;
  const dataTypeStyle = !meta.key && typeof node.value === 'string' ? '' : styles[node.dataType]; // Don't style parent strings
  return node.isObject ? (
    <>
      <div className={styles.caretIcon} onclick={onClick}><i className={caretClass}/></div>
      <div className={styles.objectType} onclick={onClick}>{node.objectType}</div>
      <div className={styles.preview} onclick={onClick}>{getPreview(meta.key, node.value)}</div>
    </>
  ) : (
    <div className={`${styles.value} ${dataTypeStyle}`}>{formatSimpleValue(meta)}</div>
  );
};

/**
 * Format display of non-object values
 */
const formatSimpleValue = (meta) => {
  const value = meta.node.value;

  // Stringify null
  if (value === null) return 'null';

  // Stringify undefined
  if (typeof value === 'undefined') return 'undefined';

  // Flatten functions
  if (typeof value === 'function') return value.toString().replace(/\s+/g, ' ');

  // Wrap child strings in quotes
  if (meta.key && typeof value === 'string') return `"${value}"`;

  // Otherwise return it as a string
  return value.toString();
};

/**
 * Get a simple string preview of an object
 */
export const getPreview = (key, object) => {
  if (object == null || typeof object !== 'object') return ''; // Objects only
  if (key === '__proto__') return '{…}';
  return !Array.isArray(object)
    ? `{${Object.keys(object).join(':…, ')}:…}`
    : `[${object.map(child => {
      if (Array.isArray(child)) return '[…]';
      if (typeof child === 'object') return '{…}';
      return child;
    }).join(', ')}]`;
};
