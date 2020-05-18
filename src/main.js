import './polyfills/index';
import api from './api';

/**
 * Enable FTwelve and return public API
 */
api.enable({ show: false });
export default api;
