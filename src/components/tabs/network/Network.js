import { createRef, h } from 'preact';
import { useState } from 'preact/hooks';
import RequestDetails from './RequestDetails';
import styles from './Network.module.scss';
import RequestSummary from './RequestSummary';
import useResizer from '../../useResizer';

/**
 * The content and logic for the Network tab
 */
export default ({ networkData }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const ref = createRef();
  const [resizer, width] = useResizer({ defaultSize: 350, targetRef: ref, resizeWidth: true });

  const onSelectRequest = (event, request) => {
    const selectedSelected = request === selectedRequest;
    ref.current && (ref.current.style['flex-basis'] = selectedSelected ? '100%' : `${width}px`);
    selectedSelected ? setSelectedRequest(null) : setSelectedRequest(request);
  };
  return (
    <div className={styles.network}>
      <div className={styles.list} ref={ref}>
        {networkData
          .sort(request => request.startTime)
          .map(request => <RequestSummary onSelect={onSelectRequest}
                                          request={request}
                                          selectedRequest={selectedRequest}/>)
        }
      </div>
      <div>{resizer}</div>
      <RequestDetails request={selectedRequest}/>
    </div>
  );
};
