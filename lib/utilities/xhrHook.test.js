"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assert = _interopRequireDefault(require("assert"));

var _xhrHook = _interopRequireDefault(require("./xhrHook"));

var sendTestXhr = function sendTestXhr() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
    xhr.setRequestHeader('accept', 'application/json');

    xhr.onload = function () {
      resolve(JSON.parse(this.responseText));
    };

    xhr.onerror = function () {
      return reject(xhr.status);
    };

    xhr.send();
  });
};

describe('xhrHook', function () {
  before(function () {
    _xhrHook["default"].disable();

    this.oldXhrOpen = XMLHttpRequest.prototype.open;
    this.oldSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    this.oldXhrSend = XMLHttpRequest.prototype.send;
  });
  describe('#enable()', function () {
    it('should create a new function for `open`, `setRequestHeader`, and `send`', function () {
      _xhrHook["default"].enable();

      _assert["default"].notDeepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);

      _assert["default"].notDeepStrictEqual(this.oldSetRequestHeader, XMLHttpRequest.prototype.setRequestHeader);

      _assert["default"].notDeepStrictEqual(this.oldXhrSend, XMLHttpRequest.prototype.send);
    });
    it('should not break the standard XMLHttpRequest functionality', function () {
      _xhrHook["default"].enable();

      return sendTestXhr().then(function (response) {
        return _assert["default"].deepStrictEqual(response.id, 1);
      });
    });
  });
  describe('#disable()', function () {
    it('should restore original `open`, `setRequestHeader`, and `send` functions', function () {
      _xhrHook["default"].enable();

      _xhrHook["default"].disable();

      _assert["default"].deepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);

      _assert["default"].deepStrictEqual(this.oldSetRequestHeader, XMLHttpRequest.prototype.setRequestHeader);

      _assert["default"].deepStrictEqual(this.oldXhrSend, XMLHttpRequest.prototype.send);
    });
    it('should not call any custom callbacks', function () {
      var callbackExecuted = false;

      _xhrHook["default"].enable();

      _xhrHook["default"].disable();

      _xhrHook["default"].onChange(function () {
        return callbackExecuted = true;
      });

      return sendTestXhr().then(function (response) {
        _assert["default"].deepStrictEqual(callbackExecuted, false);
      });
    });
  });
  describe('hooks', function () {
    it('should execute on XHR call', function () {
      var callbackExecuted = false;

      _xhrHook["default"].enable();

      _xhrHook["default"].onChange(function () {
        return callbackExecuted = true;
      });

      return sendTestXhr().then(function (response) {
        _assert["default"].deepStrictEqual(callbackExecuted, true);
      });
    });
  });
  describe('onChange', function () {
    it('should contain xhr data plus args from open and send', function () {
      _xhrHook["default"].enable();

      var hookData = false;

      _xhrHook["default"].onChange(function (event) {
        return hookData = event.target;
      });

      return sendTestXhr().then(function (response) {
        _assert["default"].deepStrictEqual(JSON.parse(hookData.responseText), response);

        _assert["default"].deepStrictEqual(response.id, 1);

        _assert["default"].deepStrictEqual(hookData._method, 'GET');

        _assert["default"].deepStrictEqual(hookData._url, 'https://jsonplaceholder.typicode.com/users/1');
      });
    });
  });
});