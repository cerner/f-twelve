import assert from 'assert';
import Tabs from '../../../src/js/views/tabs';
import Console from '../../../src/js/views/content/console/console';

describe('Tabs', function() {
  let testVar = 'old';

  before(function() {
    this.tabs = new Tabs({
      console: new Console(),
      setContent: () => (testVar = 'new')
    });
  });

  describe('#getTabs()', function() {
    it('should contain an array of only Tab elements', function() {
      const tabs = this.tabs.getTabs();
      tabs.forEach((tab) => assert.strictEqual(tab.constructor.name, 'Tab'));
    });
    it('should assign setContent on click', function() {
      const tabs = this.tabs.getTabs();
      tabs.forEach((tab) => {
        testVar = 'old';
        tab.onClick();
        assert.strictEqual(testVar, 'new', 'Tab missing onClick: ' + tab.label);
      });
    });
    it("should only contain content elements with className 'content'", function() {
      const tabs = this.tabs.getTabs();
      tabs.forEach((tab) => {
        assert.strictEqual(tab.content.render().className, 'content', 'Tab has bad content: ' + tab.label);
      });
    });
  });
});
