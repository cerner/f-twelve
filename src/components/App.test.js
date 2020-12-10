import assert from 'assert';
import App from './App';
import { h } from 'preact';
import { render } from '@testing-library/preact';
import { findAllByClassName, findByClassName, setupError, update } from '../../test/utilities';

const renderAndOpen = async () => {
  const { container } = render(<App/>);
  const icon = await findByClassName(container, 'icon');
  const app = await findByClassName(container, 'app');
  icon.click();
  await update();
  assert(app.classList.contains('open'), setupError);
  return app;
};

describe('App', function() {
  describe('#setContent()', function() {
    it('should toggle content visibility when a tab is clicked', async function() {
      const { container } = render(<App/>);
      const tabs = Array.from(container.getElementsByClassName('tab'));
      for (const tab of tabs) {
        const message = 'Clicked tab did not display content: ' + tab.textContent;
        tab.click();
        const contents = await findAllByClassName(container, 'content');
        const content = contents[0];
        assert.strictEqual(content.getElementsByClassName(tab.textContent.toLowerCase()).length, 1, message);
      }
    });
  });
  describe('icon', function() {
    describe('#toggleOpen', function() {
      it('should open the tool if closed', async function() {
        const { container } = render(<App/>);
        const icon = await findByClassName(container, 'icon');
        const app = await findByClassName(container, 'app');
        assert(!app.classList.contains('open'), setupError);
        icon.click();
        await update();
        assert(app.classList.contains('open'));
      });
      it('should close the tool if open', async function() {
        const container = await renderAndOpen();
        const icon = await findByClassName(container, 'icon');
        icon.click();
        await update();
        assert(!container.classList.contains('open'));
        assert.strictEqual(container.style.height, '0px');
      });
    });
  });
  describe('resizer', function() {
    it('should not resize above the top of the screen', async function() {
      const container = await renderAndOpen();
      const resizer = await findByClassName(container, 'resizer');
      resizer.dispatchEvent(new MouseEvent('mousedown'));
      window.dispatchEvent(new MouseEvent('mousemove', { clientY: -10 }));
      window.dispatchEvent(new MouseEvent('mouseup'));
      assert.strictEqual(container.style.height, `${window.innerHeight}px`);
    });
  });
});
