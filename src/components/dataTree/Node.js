import { h, Fragment } from 'preact';
import styles from './Node.module.scss';
import CopyButton from '../CopyButton';
import { useState } from 'preact/hooks';

/**
 * A DOM element representing any JS value/object including its children.
 * The node prop has a specific format from getNode in the Tree component
 */
export const Node = ({ node, childKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  // Convert objects to json and beautify it, return everything else as-is
  const getCopyText = () => typeof node.value === 'object' && node.value !== null
    ? JSON.stringify(JSON.parse(node.toJson()), null, 2)
    : node.value;

  const caretClass = `${styles.caret} ${isOpen ? styles.caretDown : styles.caretRight}`;
  const dataTypeStyle = !childKey && typeof node.value === 'string' ? '' : styles[node.dataType]; // Don't style parent strings
  return (
    <div className={styles.domNode}>
      <div className={styles.parent}>
        <div className={styles.copyButton}><CopyButton getText={getCopyText}/></div>
        {childKey && <div className={styles.key}>{childKey}:</div>}
        {node.isObject ? (
          <Fragment>
            <div className={styles.caretIcon} onClick={toggleIsOpen}><i className={caretClass}/></div>
            <div className={styles.objectType} onClick={toggleIsOpen}>{node.objectType}</div>
            <div className={styles.preview} onClick={toggleIsOpen}>{getPreview(childKey, node.value)}</div>
          </Fragment>
        ) : (
          <div className={`${styles.value} ${dataTypeStyle}`}>{formatSimpleValue(node.value, childKey)}</div>
        )}
      </div>
      {isOpen && node.children.map(child => (
        <div className={`${styles.child} ${styles[child.type]}`}>
          <Node childKey={child.key} node={child.getNode()}/>
        </div>
      ))}
    </div>
  );
};

export default Node;

/**
 * Format display of non-object values
 */
export const formatSimpleValue = (value, childKey) => {
  // Stringify null
  if (value === null) return 'null';

  // Stringify undefined
  if (typeof value === 'undefined') return 'undefined';

  // Flatten functions
  if (typeof value === 'function') return value.toString().replace(/\s+/g, ' ');

  // Wrap child strings in quotes
  if (childKey && typeof value === 'string') return `"${value}"`;

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
