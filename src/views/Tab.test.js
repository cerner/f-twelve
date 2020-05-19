import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import assert from 'assert';
import Tab from './Tab';

describe('Tab', function() {
  let testVar = 'old';

  before(function() {
    this.tab = <Tab
      label='Test'
      content='new'
      setContent={content => (testVar = content)}
    />;
  });

  describe('#render()', function() {
    it('should set el correctly', function() {
      assert.strictEqual(this.tab.className, 'tab');
      assert.strictEqual(this.tab.textContent, 'Test');
    });
    it('should send content on click', function() {
      this.tab.click();
      assert.strictEqual(testVar, 'new');
    });
  });
});
