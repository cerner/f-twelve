import { h } from 'preact';
import assert from 'assert';
import CopyButton from './CopyButton';
import { render } from '@testing-library/preact';
import { findAllByClassName, update } from '../../test/utilities';

/**
 * Unable to read or write to the clipboard in unit tests
 */

describe('CopyButton', function() {
  let lastExecCommand;

  beforeEach(function() {
    lastExecCommand = null;
    global.document.execCommand = (command) => (lastExecCommand = command);
  });

  describe('#onClickCopy()', function() {
    it('should call execCommand with "copy"', async function() {
      const { container } = render(<CopyButton getText={() => 'some text'}/>);
      const copyButton = container.firstChild;
      copyButton.click();
      await update();
      assert.strictEqual(lastExecCommand, 'copy');
    });
    it('should display success after successful copy', async function() {
      const { container } = render(<CopyButton getText={() => 'some text'}/>);
      const copyButton = container.firstChild;
      copyButton.click();
      await update();
      const successMessage = await findAllByClassName(container, 'successMessage');
      assert.strictEqual(successMessage.length, 1);
    });
    it('should not display success after a failed copy', async function() {
      const text = 'some text';
      const { container } = render(<CopyButton getText={() => text}/>);
      const copyButton = container.firstChild;
      global.document.execCommand = () => (x = error); // eslint-disable-line no-undef
      try {
        copyButton.click();
      } catch (e) {
        // Do nothing
      }
      await update();
      assert.strictEqual(copyButton.classList.contains('showSuccess'), false);
    });
  });
});
