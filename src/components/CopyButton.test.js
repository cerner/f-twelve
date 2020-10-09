import { h } from 'preact';
import assert from 'assert';
import CopyButton from './CopyButton';

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
    it('should call execCommand with "copy"', function() {
      const copyButton = <CopyButton getText={() => 'some text'}/>;
      copyButton.click();
      assert.strictEqual(lastExecCommand, 'copy');
    });
    it('should display success after successful copy', function() {
      const copyButton = <CopyButton getText={() => 'some text'}/>;
      copyButton.click();
      assert.strictEqual(copyButton.classList.contains('showSuccess'), true);
    });
    it('should not display success after a failed copy', function() {
      const text = 'some text';
      const copyButton = <CopyButton getText={() => text}/>;
      global.document.execCommand = () => (x = error); // eslint-disable-line no-undef
      try {
        copyButton.click();
      } catch (e) {
        // Do nothing
      }
      assert.strictEqual(copyButton.classList.contains('showSuccess'), false);
    });
  });
});
