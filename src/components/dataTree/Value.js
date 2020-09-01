import jsx from '../../utilities/jsx';
import Node from './Node';
import styles from './Value.module.scss';
import getDataType from '../../utilities/getDataType';

/**
 * The actual value of a Node. The only prop is meta as it has everything needed to create a new Node on click.
 */
export default ({ meta }) => {
  const caretClass = `${styles.caret} ${meta.isOpen ? styles.caretDown : styles.caretRight}`;
  const onclick = () => onClick(meta);
  const dataType = getDataType(meta.data);
  const isObject = typeof meta.data === 'object' && meta.data !== null;
  return isObject ? (
    <>
      <div className={styles.caretIcon} onclick={onclick}><i className={caretClass}/></div>
      <div className={styles.objectType} onclick={onclick}>{getDataType(meta.data)}</div>
      <div className={styles.size} onclick={onclick}>{Object.keys(meta.data).length}</div>
    </>
  ) : (
    <div className={`${styles.value} ${styles[dataType]}`}>{formatSimpleValue(meta)}</div>
  );
};

/**
 * Replace clicked Node with an identical Node but toggle isOpen
 */
const onClick = (meta) => {
  const newNode = <Node data={meta.data} isOpen={!meta.isOpen} key={meta.key}/>;
  meta.node.parentNode.replaceChild(newNode, meta.node);
};

/**
 * Format display of non-object values
 */
const formatSimpleValue = (meta) => {
  const value = meta.data;

  // Stringify null
  if (value === null) return 'null';

  // Stringify undefined
  if (typeof value === 'undefined') return 'undefined';

  // Wrap child strings in quotes
  if (meta.key && typeof value === 'string') return `"${value}"`;

  // Otherwise return it as a string
  return value.toString();
};
