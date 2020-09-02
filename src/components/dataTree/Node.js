import jsx from '../../utilities/jsx';
import styles from './Node.module.scss';
import Value from './Value';

/**
 * A DOM element representing any JS value/object including its children
 */
const Node = ({ data, isOpen = false, key = null }) => {
  // Meta object to accompany the data
  const meta = {
    data,
    isOpen,
    key,
  };

  const objectData = typeof data === 'object' ? (data || []) : [];
  const keys = Object.keys(objectData);
  const members = keys.map(key => ({ key, type: 'member' }));
  const properties = Object.getOwnPropertyNames(objectData)
    .filter(key => keys.indexOf(key) === -1)
    .map(key => ({ key, type: 'property' }));
  const children = [...members, ...properties, { key: '__proto__', type: 'property' }];

  const el = (
    <div className={styles.node}>
      <div className={styles.parent}>
        {key && <div className={styles.key}>{key}:</div>}
        <Value meta={meta}/>
      </div>
      {isOpen && children.map(child => (
        <div className={`${styles.child} ${styles[child.type]}`}>
          <Node data={data[child.key]} key={child.key}/>
        </div>
      ))}
    </div>
  );

  // Add the element itself to the meta
  meta.node = el;

  return {
    el,
    meta
  };
};

export default Node;
