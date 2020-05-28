import JsDomGlobal from 'jsdom-global';
import { register } from 'mock-css-modules';

/**
 * Use mock-css-modules to return the requested class name
 */
register(['.scss']);

/**
 * Configure jsdom before running setup, needed in order to `import fTwelve` since the
 * tool saves copies of the original window.console and window.error at load-time
 */
global.jsDomCleanup = new JsDomGlobal('', { url: 'http://localhost/' });
window.onErrorCallCount = 0;
window.onerror = () => {
  window.onErrorCallCount++;
};
