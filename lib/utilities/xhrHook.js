"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.send = exports.setRequestHeader = exports.open = void 0;

/**
 * Expose readystatechange callbacks for all XMLHttpRequest requests and add additional data to the instance
 * This is not a React hook
 */
// Store original xhr open and send
var open = XMLHttpRequest.prototype.open;
exports.open = open;
var setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
exports.setRequestHeader = setRequestHeader;
var send = XMLHttpRequest.prototype.send;
/**
 * Override XHR functions
 */

exports.send = send;

var enable = function enable() {
  XMLHttpRequest.prototype.open = function (_method, _url, _async, _user, _password) {
    // Add `open` args to `this` so it is available in the callbacks
    Object.assign(this, {
      _method: _method,
      _url: _url,
      _async: _async,
      _user: _user,
      _password: _password
    }); // Provide a place for setRequestHeader to store request headers

    this._headers = {}; // Execute our callback whenever an event fires

    this.addEventListener('abort', onChange, false);
    this.addEventListener('error', onChange, false);
    this.addEventListener('load', onChange, false);
    this.addEventListener('loadStart', onChange, false);
    this.addEventListener('progress', onChange, false);
    this.addEventListener('readystatechange', onChange, false);
    this.addEventListener('timeout', onChange, false); // Call the normal `open` function

    open.call(this, _method, _url, _async, _user, _password);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
    // Add header to the array
    if (!this._headers[header]) this._headers[header] = [];

    this._headers[header].push(value); // Call the normal `setRequestHeader` function


    setRequestHeader.call(this, header, value);
  };

  XMLHttpRequest.prototype.send = function (data) {
    // Add `data` to `this` so it is available in the callbacks
    this._data = data; // Call the normal `send` function

    send.call(this, data);
  };
};
/**
 * Restore original functions causing no callbacks to be executed
 */


var disable = function disable() {
  XMLHttpRequest.prototype.open = open;
  XMLHttpRequest.prototype.send = send;
  XMLHttpRequest.prototype.setRequestHeader = setRequestHeader;
};
/**
 * Always execute onChange, using the custom callback if set
 */


var customOnChange;

var onChange = function onChange(event) {
  if (typeof customOnChange === 'function') {
    customOnChange(event);
  }
};

var _default = {
  enable: enable,
  disable: disable,
  onChange: function onChange(callback) {
    return customOnChange = callback;
  }
};
exports["default"] = _default;