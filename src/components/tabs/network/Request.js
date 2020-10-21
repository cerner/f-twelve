import { h } from 'preact';
import Tree from '../../dataTree/Tree';
import styles from './Network.module.scss';
import useNetworkRequest from '../../../hooks/useRequestDetails';

export default ({ xhr }) => {
  const request = useNetworkRequest(xhr);
  return (
    <div className={styles.row}>
      <Tree data={request.readyState}/>
    </div>
  );
};
