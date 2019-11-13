import JsDomGlobal from 'jsdom-global';

/**
 * Configure jsdom before running setup, needed in order to `import FTwelve` since the
 * tool saves copies of the original window.console and window.error at load-time
 */
global.jsDomCleanup = new JsDomGlobal('', { url: 'http://localhost/' });
window.onErrorCallCount = 0;
window.onerror = () => {
  window.onErrorCallCount++;
};
