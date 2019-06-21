import FTwelve from '../src/js/views/f-twelve';
import JsDomGlobal from 'jsdom-global';
import { Element } from 'jsdom/lib/jsdom/living';

// Setup environment
before(function() {
  process.env.NODE_DISABLE_COLORS = true;
  this.jsDomGlobalCleanup = new JsDomGlobal('', { url: 'http://localhost/' });
  Element.prototype.scrollIntoView = () => null;
  this.fTwelve = new FTwelve();
  this.isAttached = (el) => document.body.contains(el);
  this.setupError = 'Unable to complete test, prerequisite condition failed';
  this.dispatchKeyboardEvent = (type, key, target) => {
    (target || window.document).dispatchEvent(new KeyboardEvent(type, { key: key }));
  };
});

// Cleanup
after(function() {
  this.jsDomGlobalCleanup();
});

// Always start test enabled and hidden just like production
beforeEach(function() {
  this.fTwelve.enable();
  this.fTwelve.detach();
});
