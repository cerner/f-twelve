import { createRef, h } from 'preact';
import styles from './RequestSummary.module.scss';
import ResponseStatus from './ResponseStatus';
import { useEffect } from 'preact/hooks';
import cn from '../../../utilities/className';

/**
 * Request summary - A single row in the request list
 */
export default ({ request, onSelect, selectedRequest }) => {

  const ref = createRef();

  useEffect(() => {
    request === selectedRequest && ref.current.focus();
  });

  const onKeyDown = (event, request) => {
    if (event.key === 'Enter') {
      onSelect(event, request);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.target.previousSibling && event.target.previousSibling.click();
      event.preventDefault();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.target.nextSibling && event.target.nextSibling.click();
      event.preventDefault();
    }
  };

  return (
    <div className={cn(styles.requestSummary, request === selectedRequest && styles.selected)}
         onClick={(event) => onSelect(event, request)}
         onKeyDown={(event) => onKeyDown(event, request)}
         ref={ref}
         tabIndex="0"
         title={request.url}>
      <div className={styles.status}><ResponseStatus code={request.responseStatus}/></div>
      <div className={styles.method}>{request.method}</div>
      <div className={styles.url}>{request.url}</div>
    </div>
  );
};
