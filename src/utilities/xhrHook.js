/**
 * Expose readystatechange callbacks for all XMLHttpRequest requests by overriding `open` and `send`
 * This is not a React hook
 */

// Store original xhr open and send
export const open = XMLHttpRequest.prototype.open;
export const send = XMLHttpRequest.prototype.send;

/**
 * Override `open` and `send` XHR functions
 */
const enable = () => {
  XMLHttpRequest.prototype.open = function(_method, _url, _async, _user, _password) {
    // Add `open` args to `this` so it is available in the callbacks
    Object.assign(this, { _method, _url, _async, _user, _password });
    this.addEventListener('readystatechange', onReadyStateChange, false);
    open.call(this, _method, _url, _async, _user, _password);
  };

  XMLHttpRequest.prototype.send = function(data) {
    // Add `data` to `this` so it is available in the callbacks
    this._data = data;
    send.call(this, data);
  };
};

/**
 * Restore original functions causing no callbacks to be executed
 */
const disable = () => {
  XMLHttpRequest.prototype.open = open;
  XMLHttpRequest.prototype.send = send;
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
 * 0 = UNSET (hook not applicable and not implemented)
 * 1 = OPENED
 * 2 = HEADERS_RECEIVED
 * 3 = LOADING
 * 4 = DONE
 */
const readyStateChangeCallbacks = {};
const onOpened = callback => (readyStateChangeCallbacks[XMLHttpRequest.OPENED] = callback);
const onHeadersReceived = callback => (readyStateChangeCallbacks[XMLHttpRequest.HEADERS_RECEIVED] = callback);
const onLoading = callback => (readyStateChangeCallbacks[XMLHttpRequest.LOADING] = callback);
const onDone = callback => (readyStateChangeCallbacks[XMLHttpRequest.DONE] = callback);
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
  onOpened,
  onHeadersReceived,
  onLoading,
  onDone
};
