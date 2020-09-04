import jsx from '../../utilities/jsx';
import styles from './Node.module.scss';
import Value from './Value';
import CopyIcon from '../CopyIcon';

/**
 * A DOM element representing any JS value/object including its children
 */
const DomNode = ({ data, isOpen, key }) => {

  // Meta object to accompany the data
  const meta = {
    data,
    isOpen,
    key,
  };

  const el = (
    <div className={styles.node}>
      <div className={styles.parent}>
        <div className={styles.copyIcon}><CopyIcon onclick={() => alert(toJson(meta))} title="Copy"/></div>
        {key && <div className={styles.key}>{key}:</div>}
        <Value meta={meta}/>
      </div>
      {isOpen && children.map(child => (
        <div className={`${styles.child} ${styles[child.type]}`}>
          <DomNode data={data[child.key]} key={child.key} parentMeta={meta}/>
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
