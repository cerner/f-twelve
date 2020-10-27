/**
 * Expose readystatechange callbacks for all XMLHttpRequest requests and add additional data to the instance
 * This is not a React hook
 */

// Store original xhr open and send
export const open = XMLHttpRequest.prototype.open;
export const setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
export const send = XMLHttpRequest.prototype.send;

/**
 * Override XHR functions
 */
const enable = () => {
  XMLHttpRequest.prototype.open = function(_method, _url, _async, _user, _password) {
    // Add `open` args to `this` so it is available in the callbacks
    Object.assign(this, { _method, _url, _async, _user, _password });

    // Provide a place for setRequestHeader to store request headers
    this._headers = {};

    // Execute our callback whenever an event fires
    this.addEventListener('abort', onChange, false);
    this.addEventListener('error', onChange, false);
    this.addEventListener('load', onChange, false);
    this.addEventListener('loadStart', onChange, false);
    this.addEventListener('progress', onChange, false);
    this.addEventListener('readystatechange', onChange, false);
    this.addEventListener('timeout', onChange, false);

    // Call the normal `open` function
    open.call(this, _method, _url, _async, _user, _password);
  };

  XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
    // Add header to the array
    if (!this._headers[header]) this._headers[header] = [];
    this._headers[header].push(value);

    // Call the normal `setRequestHeader` function
    setRequestHeader.call(this, header, value);
  };

  XMLHttpRequest.prototype.send = function(data) {
    // Add `data` to `this` so it is available in the callbacks
    this._data = data;

    // Call the normal `send` function
    send.call(this, data);
  };
};

/**
 * Restore original functions causing no callbacks to be executed
 */
const disable = () => {
  XMLHttpRequest.prototype.open = open;
  XMLHttpRequest.prototype.send = send;
  XMLHttpRequest.prototype.setRequestHeader = setRequestHeader;
};

/**
 * Always execute onChange, using the custom callback if set
 */
let customOnChange;
const onChange = function(event) {
  if (typeof customOnChange === 'function') {
    // Provide `this` to the callbacks with all XHR info including the added info from the custom prototype functions
    customOnChange(event, this);
  }
};

export default {
  enable,
  disable,
  onChange: callback => (customOnChange = callback),
};
