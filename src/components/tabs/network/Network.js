import { h } from 'preact';
import Details from './Details';
import styles from './Network.module.scss';
import Tree from '../../dataTree/Tree';

/**
 * The content and logic for the Network tab
 */
export default ({ networkData }) => {
  return (
    <div className={styles.network}>
      <div className={styles.list}>
        {networkData.map(request => (
          <div className={styles.row}>
            {request.status}
            <Tree data={request}/>
          </div>
        ))}
      </div>
      <Details/>
    </div>
  );
};
