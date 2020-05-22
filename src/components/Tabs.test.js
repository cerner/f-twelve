import jsx from '../utilities/jsx';
import assert from 'assert';
import Tabs from './Tabs';
import Console from './content/console/Console';

describe('Tabs', function() {
  let testVar = 'old';

  before(function() {
    this.tabs = <Tabs
      console={<Console/>}
      setContent={() => (testVar = 'new')}
    />;
  });

  describe('#getTabs()', function() {
    it('should contain an array of only Tab elements', function() {
      this.tabs.forEach(child => assert.strictEqual(child.className, 'tab'));
    });
    it('should assign setContent on click', function() {
      this.tabs.forEach(child => {
        testVar = 'old';
        child.click();
        assert.strictEqual(testVar, 'new', 'Tab missing onClick: ' + child.innerText);
      });
    });
  });
});
