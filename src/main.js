import './polyfills/index';
import { attach, detach, disable, enable, onAttach, onDetach } from './api';

/**
 * Initialize F-Twelve
 */
enable({ show: false });

/**
 * Expose public API
 */
export default Object.freeze({
  enable,
  disable,
  hide: detach,
  show: attach,
  onHide: onDetach,
  onShow: onAttach,
});
