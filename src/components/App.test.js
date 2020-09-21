import assert from 'assert';

describe('App', function() {
  describe('#setContent()', function() {
    it('should call setContent and toggle content visibility when a tab is clicked', function() {
      const tabs = Array.from(this.fTwelve.el.getElementsByClassName('tab'));
      tabs.forEach((tab) => {
        const message = 'Clicked tab did not toggle content visibility: ' + tab.innerText;
        tab.click();
        assert.strictEqual(this.fTwelve.el.getElementsByClassName('content').length, 1, message);
        tab.click();
        assert.strictEqual(this.fTwelve.el.getElementsByClassName('content').length, 0, message);
      });
    });
  });
  describe('tabBar', function() {
    it('should contain an array of only tab elements', function() {
      const tabBar = Array.from(this.fTwelve.el.getElementsByClassName('tabBar'));
      tabBar.forEach(child => assert.strictEqual(child.className, 'tab'));
    });
  });
});
