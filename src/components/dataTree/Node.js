import jsx from '../../utilities/jsx';
import styles from './Node.module.scss';
import Value from './Value';
import CopyIcon from '../CopyIcon';

/**
 * A DOM element representing any JS value/object including its children
 */
const Node = ({ node, isOpen, key }) => {
  // Meta DOM information to accompany the node data
  const meta = {
    node,
    isOpen,
    key, // The key is available in node but it lives on the child but renders on the parent
  };

  const el = (
    <div className={styles.domNode}>
      <div className={styles.parent}>
        <div className={styles.copyIcon}><CopyIcon onclick={() => alert(node.toJson(meta))} title="Copy"/></div>
        {key && <div className={styles.key}>{key}:</div>}
        <Value meta={meta}/>
      </div>
      {isOpen && node.children.map(child => (
        <div className={`${styles.child} ${styles[child.type]}`}>
          <Node key={child.key} node={child.node}/>
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

export default Node;
