import jsx from '../../utilities/jsx';
import styles from './Value.module.scss';
import getDataType from '../../utilities/getDataType';

/**
 * The actual value of a Node. The only prop is meta as it has everything needed to create a new Node on click.
 */
export default ({ meta, onClick }) => {
  const node = meta.node;
  const caretClass = `${styles.caret} ${meta.isOpen ? styles.caretDown : styles.caretRight}`;
  const dataType = getDataType(node.value);
  const isObject = typeof node.value === 'object' && node.value !== null;
  const objectType = isObject && `${dataType.charAt(0).toUpperCase()}${dataType.slice(1)}(${getSize(node.value)})`;
  const dataTypeStyle = !meta.key && typeof node.value === 'string' ? '' : styles[dataType]; // Don't style parent strings
  return isObject ? (
    <>
      <div className={styles.caretIcon} onclick={onClick}><i className={caretClass}/></div>
      <div className={styles.objectType} onclick={onClick}>{objectType}</div>
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
 * Get object (must be Object or Array) size
 */
const getSize = (object) =>
  Array.isArray(object)
    ? Object.keys(object).length
    : Object.getOwnPropertyNames(object).length;
