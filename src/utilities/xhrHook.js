/**
 * Expose readystatechange callbacks for all XMLHttpRequest requests by overriding `open` and `send`
 */

const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;

/**
 * Override `open` and `send` XHR functions
 */
const enable = () => {
  XMLHttpRequest.prototype.open = function(_method, _url, _async, _user, _password) {
    // Add `open` args to `this` so it is available in the callbacks
    Object.assign(this, { _method, _url, _async, _user, _password });
    this.addEventListener('readystatechange', onReadyStateChange, false);
    originalXhrOpen.call(this, _method, _url, _async, _user, _password);
  };

  XMLHttpRequest.prototype.send = function(data) {
    // Add `data` to `this` so it is available in the callbacks
    this._data = data;
    originalXhrSend.call(this, data);
  };
};

/**
 * Restore original functions causing no callbacks to be executed
 */
const disable = () => {
  XMLHttpRequest.prototype.open = originalXhrOpen;
  XMLHttpRequest.prototype.send = originalXhrSend;
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
 * 0 = UNSET
 * 1 = OPENED
 * 2 = HEADERS_RECEIVED
 * 3 = LOADING
 * 4 = DONE
 */
const readyStateChangeCallbacks = {};
const onUnsent = callback => (readyStateChangeCallbacks[0] = callback);
const onOpened = callback => (readyStateChangeCallbacks[1] = callback);
const onHeadersReceived = callback => (readyStateChangeCallbacks[2] = callback);
const onLoading = callback => (readyStateChangeCallbacks[3] = callback);
const onDone = callback => (readyStateChangeCallbacks[4] = callback);
const onReadyStateChange = function() {
  const readyStateChangeCallback = readyStateChangeCallbacks[this.readyState];
  if (typeof readyStateChangeCallback === 'function') {
    // Provide `this` to the callbacks with all XHR info including the `open` and `send` arguments
    readyStateChangeCallback(this);
  }
};

export default {
  enable,
  disable,
  onUnsent,
  onOpened,
  onHeadersReceived,
  onLoading,
  onDone
};
