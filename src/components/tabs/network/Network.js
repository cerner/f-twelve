import { h } from 'preact';
import { useState } from 'preact/hooks';
import Details from './RequestDetails';
import styles from './Network.module.scss';
import cn from '../../../utilities/className';
import ResponseStatus from './ResponseStatus';

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
            <div className={cn([styles.row, request === selectedRequest && styles.selected])}
                 onClick={() => onSelectRequest(request)}
                 title={request.url}>
              <div className={styles.status}><ResponseStatus code={request.responseStatus}/></div>
              <div className={styles.url}>{request.url.split('/').pop()}</div>
            </div>
          ))}
      </div>
      <Details request={selectedRequest}/>
    </div>
  );
};
