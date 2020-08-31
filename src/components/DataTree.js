import jsx from '../utilities/jsx';
import styles from './DataTree.module.scss';

/**
 * Display JS data in the DOM as an interactive tree
 */
export default ({ data }) => {
  return (
    <div className={styles.dataTree}>
      <Item value={data}/>
    </div>
  );
};

// TODO: Document this
const Item = ({ value, isOpen = false, parentMeta = { depth: 0 } }) => {
  const dataType = getDataType(value);
  const isObject = typeof value === 'object' && value !== null;

  // Meta object to accompany the data
  const meta = {
    depth: parentMeta.depth + 1,
    isOpen: isOpen,
    key: isObject ? dataType : null,
    parentMeta: parentMeta,
    size: isObject ? Object.keys(value).length : null,
    type: dataType,
    value: value
  };

  const caretClass = `${styles.caret} ${isOpen ? styles.caretDown : styles.caretRight}`;
  const el = (
    <div className={styles.item}>
      {isObject ? <div className={styles.parent}>
        <div className={styles.caretIcon} onclick={() => onClick(meta)}><i className={caretClass}/></div>
        <div className={styles.key}>{meta.key}</div>
        <div className={styles.size}>{meta.size}</div>
      </div> : value}
      {isOpen && Object.keys(value).map(childKey => (
        <div className={styles.children}>
          <div>{childKey} :</div>
          <Item parentMeta={meta} value={value[childKey]}/>
        </div>
      ))}
    </div>
  );

  // Add the element itself to the meta
  meta.el = el;

  return {
    el,
    meta
  };
};

const getDataType = (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

const onClick = (meta) => {
  // Replace clicked Item with an identical Item but toggle isOpen
  const newItem = <Item isOpen={!meta.isOpen} parentMeta={meta.parentMeta} value={meta.value}/>;
  meta.el.parentNode.replaceChild(newItem, meta.el);
};
