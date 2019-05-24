import assert from 'assert';
import Tab from '../../../src/js/views/tab';

describe('Tab', function() {
  let testVar = 'old';

  before(function() {
    this.tab = new Tab({
      label: 'Test',
      content: { render: () => 'new' },
      onClick: (content) => (testVar = content)
    });
  });

  describe('#render()', function() {
    it('should set el correctly', function() {
      const el = this.tab.render();
      assert.strictEqual(el.className, 'f-twelve-tab');
      assert.strictEqual(el.innerText, 'Test');
    });
    it('should send content on click', function() {
      const el = this.tab.render();
      el.click();
      assert.strictEqual(testVar, 'new');
    });
  });
});
