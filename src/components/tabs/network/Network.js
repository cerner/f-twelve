import jsx from '../../../utilities/jsx';

/**
 * The content of the Network tab
 */
const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;
export default () => {
  const onReadyStateChange = function() {
    if (this.readyState === 0) {
      console.log('UNSENT');
    } else if (this.readyState === 1) {
      console.log('OPENED');
    } else if (this.readyState === 2) {
      console.log('HEADERS_RECEIVED');
    } else if (this.readyState === 3) {
      console.log('LOADING');
    } else if (this.readyState === 4) {
      console.log('DONE');
    }
  };

  const overrideXhr = () => {
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      this._request = { method, url, async, user, password };
      this.addEventListener('readystatechange', onReadyStateChange, false);
      originalXhrOpen.call(this, method, url, async, user, password);
    };

    XMLHttpRequest.prototype.send = function(data) {
      console.log('send', { data, this: this, request: this._request });
      originalXhrSend.call(this, data);
    };
  };

  const restoreXhr = () => {
    XMLHttpRequest.prototype.open = originalXhrOpen;
    XMLHttpRequest.prototype.send = originalXhrSend;
  };

  return {
    overrideXhr,
    restoreXhr,
    el: <div className='network'>Network tab</div>
  };
};
