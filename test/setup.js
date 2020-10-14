import { Element } from 'jsdom/lib/jsdom/living';

// Setup environment
before(function() {
  process.env.NODE_DISABLE_COLORS = true;
  Element.prototype.scrollIntoView = () => null;
});

// Cleanup
after(function() {
  global.jsDomCleanup();
});
