import assert from 'assert';

describe('App', function() {
  describe('#setContent()', function() {
    it('should call setContent and toggle content visibility when a tab is clicked', function() {
      const tabs = Array.from(this.fTwelve.el.getElementsByClassName('tab'));
      tabs.forEach((tab) => {
        const message = 'Clicked tab did not display content: ' + tab.textContent;
        tab.click();
        const content = this.fTwelve.el.getElementsByClassName('content')[0];
        assert.strictEqual(content.getElementsByClassName(tab.textContent.toLowerCase()).length, 1, message);
      });
    });
  });
  describe('tabBar', function() {
    it('should contain an array of only tab elements', function() {
      const tabBar = Array.from(this.fTwelve.el.getElementsByClassName('tabBar'));
      tabBar.forEach(child => assert.strictEqual(child.className, 'tab'));
    });
  });
  describe('icon', function() {
    describe('#toggleOpen', function() {
      it('should open the tool if closed', function() {
        const icon = this.fTwelve.el.getElementsByClassName('icon')[0];
        assert(!this.fTwelve.el.classList.contains('open'), this.setupError);
        icon.click();
        assert(this.fTwelve.el.classList.contains('open'));
      });
      it('should close the tool if open', function() {
        const icon = this.fTwelve.el.getElementsByClassName('icon')[0];
        this.fTwelve.el.classList.add('open');
        icon.click();
        assert(!this.fTwelve.el.classList.contains('open'));
        assert.strictEqual(this.fTwelve.el.style.height, '0px');
      });
    });
  });
  describe('resizer', function() {
    it('should not resize above the top of the screen', function() {
      this.fTwelve.el.classList.add('open');
      const resizer = this.fTwelve.el.getElementsByClassName('resizer')[0];
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientY: -10 }));
      assert.strictEqual(this.fTwelve.el.style.height, `${window.innerHeight}px`);
    });
    it('should "snap" closed if within 20 pixels', function() {
      this.fTwelve.el.classList.add('open');
      const resizer = this.fTwelve.el.getElementsByClassName('resizer')[0];
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientY: window.innerHeight - 19 }));
      assert.strictEqual(this.fTwelve.el.style.height, '0px');
    });
  });
});
