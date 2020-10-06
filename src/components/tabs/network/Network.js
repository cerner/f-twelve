import { h } from 'preact';
import Details from './Details';
import Tree from '../../dataTree/Tree';
import styles from './Network.module.scss';
import xhrHook from '../../../utilities/hooks/xhrHook';


/**
 * The content of the Network tab
 * A list of network requests
 */
export default () => {

  // DOM refs
  let listEl;

  const Row = ({ request }) => (
    <div className={styles.row}>
      <div>Opened: <Tree data={request}/></div>
    </div>
  );

  /**
   * Add new requests to the list
   */
  xhrHook.onOpened((xhr) => {
    xhr.el = <Row request={xhr}/>; // TODO: uhh
    // listEl.appendChild(xhr.el);
  });

  /**
   * Update existing request when it completes
   */
  xhrHook.onDone((xhr) => {
    setTimeout(() => {
      const newNode = <div>Done</div>;
      // xhr.el.parentNode.replaceChild(newNode, xhr.el); //  TODO: Uhhh
      // xhr.el = newNode;
    }, 1000);
  });

  return (
    <div className={styles.network}>
      <div className={styles.list} ref={ref => (listEl = ref)}/>
      <Details/>
    </div>
  );
};
