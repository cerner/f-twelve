import { enable, disable, setOnDetach, setOnAttach, detach, attach } from './views/App';

/**
 * F-Twelve public API
 */
export default Object.freeze({
  enable,
  disable,
  hide: detach,
  show: attach,
  onHide: setOnDetach,
  onShow: setOnAttach,
});
