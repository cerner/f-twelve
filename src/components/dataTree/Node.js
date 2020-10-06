import { createRef, h, render } from 'preact';
import styles from './Node.module.scss';
import Value from './Value';
import CopyButton from '../CopyButton';

/**
 * A DOM element representing any JS value/object including its children.
 */
const Node = ({ node, isOpen, childKey }) => {
  // Meta DOM information to accompany the node data
  const meta = {
    ref: createRef(),
    node,
    isOpen,
    childKey,
  };

  // Convert objects to json and beautify it, return everything else as-is
  const getCopyText = () => typeof node.value === 'object' && node.value !== null
    ? JSON.stringify(JSON.parse(node.toJson()), null, 2)
    : node.value;

  return (
    <div className={styles.domNode} ref={meta.ref}>
      <div className={styles.parent}>
        <div className={styles.copyButton}><CopyButton getText={getCopyText}/></div>
        {childKey && <div className={styles.key}>{childKey}:</div>}
        <Value meta={meta} onClick={onClickNode.bind(null, meta)}/>
      </div>
      {isOpen && node.children.map(child => (
        <div className={`${styles.child} ${styles[child.type]}`}>
          <Node childKey={child.key} node={child.getNode()}/>
        </div>
      ))}
    </div>
  );
};

/**
 * Replace clicked Node with an identical Node but toggle isOpen
 */
// TODO: Use state vars instead of manual DOM manipulation
const onClickNode = (meta) => {
  const oldNode = meta.ref.current;
  meta.ref = createRef();
  const newNode = <Node ref={meta.ref} isOpen={!meta.isOpen} childKey={meta.childKey} node={meta.node}/>;
  render(newNode, oldNode.parentNode, oldNode);
};

export default Node;
