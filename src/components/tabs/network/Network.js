import jsx from '../../../utilities/jsx';
import xhrHook from '../../../utilities/hooks/xhrHook';
import Tree from '../../dataTree/Tree';

/**
 * The content of the Network tab
 */
export default () => {
  let el;
  xhrHook.onOpened((xhr) => {
    el.appendChild(<div>Opened: <Tree data={xhr}/></div>);
  });
  xhrHook.onDone((xhr) => {
    el.appendChild(<div>Done: <Tree data={xhr}/></div>);
  });
  return {
    el: <div className='network' ref={ref => (el = ref)}/>
  };
};
