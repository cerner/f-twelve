import { createRef, h } from 'preact';
import { useState } from 'preact/hooks';
import RequestDetails from './RequestDetails';
import styles from './Network.module.scss';
import cn from '../../../utilities/className';
import ResponseStatus from './ResponseStatus';
import useResizer from '../../useResizer';

/**
 * The content and logic for the Network tab
 */
export default ({ networkData }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const ref = createRef();
  const [resizer, width] = useResizer({ defaultSize: 350, targetRef: ref, resizeWidth: true });

  const onSelectRequest = (request) => {
    const selectedSelected = request === selectedRequest;
    ref.current && (ref.current.style['flex-basis'] = selectedSelected ? '100%' : `${width}px`);
    selectedSelected ? setSelectedRequest(null) : setSelectedRequest(request);
  };

  const RequestSummary = ({ request }) => {
    return (
      <div className={cn(styles.row, request === selectedRequest && styles.selected)}
           onClick={() => onSelectRequest(request)}
           title={request.url}>
        <div className={styles.status}><ResponseStatus code={request.responseStatus}/></div>
        <div className={styles.method}>{request.method}</div>
        <div className={styles.url}>{request.url}</div>
      </div>
    );
  };

  return (
    <div className={styles.network}>
      <div className={styles.list} ref={ref}>
        {networkData
          .sort(request => request.startTime)
          .map(request => <RequestSummary request={request}/>)
        }
      </div>
      <div>{resizer}</div>
      <RequestDetails request={selectedRequest}/>
    </div>
  );
};
