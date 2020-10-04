import jsx from '../../../utilities/jsx';
import styles from './List.module.scss';
import Tree from '../../dataTree/Tree';

/**
 * Request list
 */
export default () => {

  const Row = ({ xhr }) => (
    <div className={styles.row}>
      <div>Opened: <Tree data={xhr}/></div>
    </div>
  );

  return {
    el: <div className={styles.list}/>
  };
};
