import './polyfills/index';
import Api from './Api';

/**
 * Return public API instance
 */
const fTwelve = new Api();
fTwelve.enable(false);
export default fTwelve;
