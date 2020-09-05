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
    el: null,
    node,
    isOpen,
    key,
  };

  const el = (
    <div className={styles.domNode}>
      <div className={styles.parent}>
        <div className={styles.copyIcon}><CopyIcon onclick={() => alert(node.toJson())} title="Copy"/></div>
        {key && <div className={styles.key}>{key}:</div>}
        <Value meta={meta} onClick={onClick.bind(null, meta)}/>
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

  return el;
};

/**
 * Replace clicked Node with an identical Node but toggle isOpen
 */
const onClick = (meta) => {
  const newNode = <Node isOpen={!meta.isOpen} key={meta.key} node={meta.node}/>;
  meta.el.parentNode.replaceChild(newNode, meta.el);
};

export default Node;
