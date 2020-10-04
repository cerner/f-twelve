import jsx from '../../../utilities/jsx';
import List from './List';
import Details from './Details';
import styles from './Network.module.scss';
import Tree from '../../dataTree/Tree';
import xhrHook from '../../../utilities/hooks/xhrHook';


/**
 * The content of the Network tab
 * Standardizes network data from xhrHook so that it can be used with the List and Details components
 */
export default () => {
  let el;
  xhrHook.onOpened((xhr) => {
    xhr.el = <Row xhr={xhr}/>;
    el.appendChild(xhr.el);
  });
  xhrHook.onDone((xhr) => {
    el.appendChild(<div>Done: <Tree data={xhr}/></div>);
  });
  return {
    el: (
      <div className={styles.network} ref={ref => (el = ref)}>
        <List/>
        <Details/>
      </div>
    )
  };
};
