import dom from '../utilities/dom'; // eslint-disable-line no-unused-vars
import assert from 'assert';
import Tabs from './Tabs';
import Console from './content/console/console';

describe('Tabs', function() {
  let testVar = 'old';

  before(function() {
    this.tabs = <Tabs
      console={new Console()}
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

    // TODO: this after converting ab and console (also is this the right place for this test? just saying)
    // it("should only contain content elements with className 'content'", function() {
    //   this.tabs.forEach(child => {

    //     assert.strictEqual(child.content.render().className, 'content', 'Tab has bad content: ' + child.innerText);
    //   });
    // });
  });
});
