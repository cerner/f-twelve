import assert from 'assert';
import App from './App';
import { h } from 'preact';
import { render, screen } from '@testing-library/preact';


describe('App', function() {
  describe('#setContent()', function() {
    it('should toggle content visibility when a tab is clicked', function() {
      const { container } = render(<App/>);
      const tabs = Array.from(container.getElementsByClassName('tab'));
      tabs.forEach(async (tab) => {
        const message = 'Clicked tab did not display content: ' + tab.textContent;
        tab.click();
        await waitFor(() => {
          const content = container.getElementsByClassName('content')[0];
          assert.strictEqual(content.getElementsByClassName(tab.textContent.toLowerCase()).length, 1, message);
        });
      });
    });
  });
  describe('icon', function() {
    describe('#toggleOpen', function() {
      it('should open the tool if closed', function() {
        const { container } = render(<App/>);
        const icon = container.getElementsByClassName('icon')[0];
        assert(!container.classList.contains('open'), this.setupError);
        icon.click();
        assert(container.classList.contains('open'));
      });
      it('should close the tool if open', function() {
        const { container } = render(<App/>);
        const icon = container.getElementsByClassName('icon')[0];
        container.classList.add('open');
        icon.click();
        assert(!container.classList.contains('open'));
        assert.strictEqual(container.style.height, '0px');
      });
    });
  });
  describe('resizer', function() {
    it('should not resize above the top of the screen', function() {
      const { container } = render(<App/>);
      container.classList.add('open');
      const resizer = container.getElementsByClassName('resizer')[0];
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientY: -10 }));
      assert.strictEqual(container.style.height, `${window.innerHeight}px`);
    });
    it('should "snap" closed if within 20 pixels', function() {
      container.classList.add('open');
      const resizer = container.getElementsByClassName('resizer')[0];
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientY: window.innerHeight - 19 }));
      assert.strictEqual(container.style.height, '0px');
    });
  });
});
