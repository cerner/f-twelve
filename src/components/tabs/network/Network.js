import jsx from '../../../utilities/jsx';
import xhrHook from '../../../utilities/xhrHook';

/**
 * The content of the Network tab
 */
export default () => {
  xhrHook.onDone((xhr) => console.log(xhr));
  return {
    el: <div className='network'>Network tab</div>
  };
};
