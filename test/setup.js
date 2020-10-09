import { Element } from 'jsdom/lib/jsdom/living';

// Setup environment
before(function() {
  process.env.NODE_DISABLE_COLORS = true;
  Element.prototype.scrollIntoView = () => null;
  this.setupError = 'Unable to complete test, prerequisite condition failed';
  this.dispatchKeyboardEvent = (type, key, target) => {
    (target || window.document).dispatchEvent(new KeyboardEvent(type, { key: key }));
  };
});

// Cleanup
after(function() {
  global.jsDomCleanup();
});
