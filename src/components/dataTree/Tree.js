import jsx from '../../utilities/jsx';
import Node from './Node';
import styles from './Tree.module.scss';

/**
 * JS data in the DOM as an interactive tree
 */
export default ({ data }) => {
  return (
    <div className={styles.tree}>
      <div className={styles.copyIcon} onclick={() => alert('todo')} title="Copy"/>
      <Node data={data}/>
    </div>
  );
};
