import assert from 'assert';
import { stdout, stderr } from 'test-console';
import { overrideWindowConsole, overrideWindowOnError, restoreWindowOnError } from './consoleHook';

describe('consoleHook', function() {
  before(function() {
    this.oldWindowOnError = window.onerror && window.onerror.bind({});
    this.oldWindowConsole = {
      ...window.console
    };
  });

  describe('#overrideWindowConsole()', function() {
    it('should create a new function for the 4 levels', function() {
      overrideWindowOnError();
      assert.notDeepStrictEqual(this.oldWindowConsole.error, window.console.error);
      assert.notDeepStrictEqual(this.oldWindowConsole.info, window.console.info);
      assert.notDeepStrictEqual(this.oldWindowConsole.log, window.console.log);
      assert.notDeepStrictEqual(this.oldWindowConsole.warn, window.console.warn);
    });
    it('should not break the standard console', function() {
      overrideWindowConsole();
      stdout.inspectSync((output) => {
        window.console.log('string');
        window.console.log([1, 2, 3]);
        window.console.log({ key: 'value' });
        assert.deepStrictEqual(output, ['string\n', '[ 1, 2, 3 ]\n', "{ key: 'value' }\n"]);
      });
    });
  });

  describe('#overrideWindowOnError()', function() {
    it('should create a new function for window.onerror', function() {
      restoreWindowOnError();
      overrideWindowOnError();
      assert.notDeepStrictEqual(this.oldWindowOnError, window.oldWindowOnError);
    });
    it('should not break the existing window.onerror', function() {
      restoreWindowOnError();
      const initialCallCount = window.onErrorCallCount;
      overrideWindowOnError();
      window.onerror();
      assert.deepStrictEqual(window.onErrorCallCount, initialCallCount + 1);
    });
    it('should write the error to stderr', function() {
      restoreWindowOnError();
      overrideWindowOnError();
      stderr.inspectSync((output) => {
        window.onerror('', '', 0, 0, 'string');
        window.onerror('', '', 0, 0, [1, 2, 3]);
        window.onerror('', '', 0, 0, { key: 'value' });
        assert.deepStrictEqual(output, ['string\n', '[ 1, 2, 3 ]\n', "{ key: 'value' }\n"]);
      });
    });
  });
});
