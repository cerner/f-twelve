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

  const el = (
    <div className={styles.node}>
      <div className={styles.parent}>
        {key && <div className={styles.key}>{key}:</div>}
        <Value meta={meta}/>
      </div>
      {isOpen && Object.keys(data || []).map(childKey => (
        <div className={styles.child}>
          <Node data={data[childKey]} key={childKey}/>
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
