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

/**
 * Update the current requests (state) based on XHR readystatechange events
 */
export const networkReducer = (state, action) => {
  const [actionName, request] = action;
  switch (actionName) {
    case XMLHttpRequest.OPENED:
      return state.concat(request);
    case XMLHttpRequest.HEADERS_RECEIVED:
    case XMLHttpRequest.LOADING:
    case XMLHttpRequest.DONE:
      // TOOD: Update state with appropriate values
      // TOOD: Update state with appropriate values
      return state;
    default:
      throw new Error('Unexpected actionType');
  }
};
