import './polyfills/index';
import { attach, detach, disable, enable, onAttach, onDetach } from './api';

/**
 * Enable F-Twelve and return public API
 */
enable({ show: false });
export default Object.freeze({
  enable,
  disable,
  hide: detach,
  show: attach,
  onHide: onDetach,
  onShow: onAttach,
});
