import { h } from 'preact';
import Details from './Details';
import Tree from '../../dataTree/Tree';
import styles from './Network.module.scss';
import Request from './Request';

/**
 * The content and logic for the Network tab
 */
export default ({ requests }) => {
  return (
    <div className={styles.network}>
      <div className={styles.list}>
        {requests.map(xhr => <Request xhr={xhr}/>)}
      </div>
      <Details/>
    </div>
  );
};
