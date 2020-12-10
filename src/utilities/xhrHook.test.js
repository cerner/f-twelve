import assert from 'assert';
import xhrHook from './xhrHook';

const sendTestXhr = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
    xhr.setRequestHeader('accept', 'application/json');
    xhr.onload = function() {
      resolve(JSON.parse(this.responseText));
    };
    xhr.onerror = () => reject(xhr.status);
    xhr.send();
  });
};

describe('xhrHook', function() {
  before(function() {
    xhrHook.disable();
    this.oldXhrOpen = XMLHttpRequest.prototype.open;
    this.oldSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    this.oldXhrSend = XMLHttpRequest.prototype.send;
  });

  describe('#enable()', function() {
    it('should create a new function for `open`, `setRequestHeader`, and `send`', function() {
      xhrHook.enable();
      assert.notDeepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);
      assert.notDeepStrictEqual(this.oldSetRequestHeader, XMLHttpRequest.prototype.setRequestHeader);
      assert.notDeepStrictEqual(this.oldXhrSend, XMLHttpRequest.prototype.send);
    });
    it('should not break the standard XMLHttpRequest functionality', function() {
      xhrHook.enable();
      return sendTestXhr()
        .then(response =>
          assert.deepStrictEqual(response.id, 1)
        );
    });
  });
  describe('#disable()', function() {
    it('should restore original `open`, `setRequestHeader`, and `send` functions', function() {
      xhrHook.enable();
      xhrHook.disable();
      assert.deepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);
      assert.deepStrictEqual(this.oldSetRequestHeader, XMLHttpRequest.prototype.setRequestHeader);
      assert.deepStrictEqual(this.oldXhrSend, XMLHttpRequest.prototype.send);
    });
    it('should not call any custom callbacks', function() {
      let callbackExecuted = false;
      xhrHook.enable();
      xhrHook.disable();
      xhrHook.onChange(() => (callbackExecuted = true));
      return sendTestXhr()
        .then(response => {
          assert.deepStrictEqual(callbackExecuted, false);
        });
    });
  });
  describe('hooks', function() {
    it('should execute on XHR call', function() {
      let callbackExecuted = false;
      xhrHook.enable();
      xhrHook.onChange(() => (callbackExecuted = true));
      return sendTestXhr()
        .then(response => {
          assert.deepStrictEqual(callbackExecuted, true);
        });
    });
  });
  describe('onChange', function() {
    it('should contain xhr data plus args from open and send', function() {
      xhrHook.enable();
      let hookData = false;
      xhrHook.onChange((event) => (hookData = event.target));
      return sendTestXhr()
        .then(response => {
          assert.deepStrictEqual(JSON.parse(hookData.responseText), response);
          assert.deepStrictEqual(response.id, 1);
          assert.deepStrictEqual(hookData._method, 'GET');
          assert.deepStrictEqual(hookData._url, 'https://jsonplaceholder.typicode.com/users/1');
        });
    });
  });
});
