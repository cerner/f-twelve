import { h } from 'preact';
import { useState } from 'preact/hooks';
import Details from './Details';
import styles from './Network.module.scss';

/**
 * The content and logic for the Network tab
 */
export default ({ networkData }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const onSelectRequest = (request) => {
    request === selectedRequest ? setSelectedRequest(null) : setSelectedRequest(request);
  };

  return (
    <div className={styles.network}>
      <div className={styles.list}>
        {networkData
          .sort(request => request.startTime)
          .map(request => (
            <div className={`${styles.row} ${request === selectedRequest ? styles.selected : ''}`}
                 onClick={() => onSelectRequest(request)}
                 title={request.url}>
              <div className={styles.status}>{request.status || '...'}</div>
              <div className={styles.url}>{request.url.split('/').pop()}</div>
            </div>
          ))}
      </div>
      <Details request={selectedRequest}/>
    </div>
  );
};
