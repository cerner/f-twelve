import assert from 'assert';
import xhrHook from './xhrHook';

const sendTestXhr = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
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
    this.oldXhrSend = XMLHttpRequest.prototype.send;
  });

  describe('#enable()', function() {
    it('should create a new function for `open` and `send`', function() {
      xhrHook.enable();
      assert.notDeepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);
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
    it('should restore original `open` and `send` functions', function() {
      xhrHook.enable();
      xhrHook.disable();
      assert.deepStrictEqual(this.oldXhrOpen, XMLHttpRequest.prototype.open);
      assert.deepStrictEqual(this.oldXhrSend, XMLHttpRequest.prototype.send);
    });
    it('should not call any custom callbacks', function() {
      let opened = false;
      let headersReceived = false;
      let loading = false;
      let done = false;
      xhrHook.enable();
      xhrHook.disable();
      xhrHook.onOpened(() => (opened = true));
      xhrHook.onHeadersReceived(() => (headersReceived = true));
      xhrHook.onLoading(() => (loading = true));
      xhrHook.onDone(() => (done = true));
      return sendTestXhr()
        .then(response => {
          assert.deepStrictEqual(opened, false);
          assert.deepStrictEqual(headersReceived, false);
          assert.deepStrictEqual(loading, false);
          assert.deepStrictEqual(done, false);
        });
    });
  });
  describe('hooks', function() {
    it('should execute on XHR call', function() {
      let opened = false;
      let headersReceived = false;
      let loading = false;
      let done = false;
      xhrHook.enable();
      xhrHook.onOpened(() => (opened = true));
      xhrHook.onHeadersReceived(() => (headersReceived = true));
      xhrHook.onLoading(() => (loading = true));
      xhrHook.onDone(() => (done = true));
      return sendTestXhr()
        .then(response => {
          assert.deepStrictEqual(opened, true);
          assert.deepStrictEqual(headersReceived, true);
          assert.deepStrictEqual(loading, true);
          assert.deepStrictEqual(done, true);
        });
    });
  });
  describe('onDone', function() {
    it('should contain xhr data plus args from open and send', function() {
      xhrHook.enable();
      let hookData = false;
      xhrHook.onDone((xhr) => (hookData = xhr));
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
