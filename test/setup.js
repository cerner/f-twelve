import App from '../src/views/App';
import * as fTwelve from '../src/api';
import { Element } from 'jsdom/lib/jsdom/living';

// Setup environment
before(function() {
  process.env.NODE_DISABLE_COLORS = true;
  Element.prototype.scrollIntoView = () => null;
  this.fTwelve = fTwelve;
  this.isAttached = (el) => document.body.contains(el);
  this.setupError = 'Unable to complete test, prerequisite condition failed';
  this.dispatchKeyboardEvent = (type, key, target) => {
    (target || window.document).dispatchEvent(new KeyboardEvent(type, { key: key }));
  };
});

// Cleanup
after(function() {
  global.jsDomCleanup();
});

// Always start test enabled and hidden just like production
beforeEach(function() {
  this.fTwelve.enable();
  this.fTwelve.detach();
});
