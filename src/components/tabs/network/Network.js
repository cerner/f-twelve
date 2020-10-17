import { h } from 'preact';
import Details from './Details';
import Tree from '../../dataTree/Tree';
import styles from './Network.module.scss';

/**
 * The content and logic for the Network tab
 */
export default ({ networkData }) => {
  return (
    <div className={styles.network}>
      <div className={styles.list}>
        {networkData.map(request =>
          <div className={styles.row}>
            <div>Opened: <Tree data={request}/></div>
          </div>
        )}
      </div>
      <Details/>
    </div>
  );
};
