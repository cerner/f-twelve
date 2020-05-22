import jsx from '../../../utilities/jsx';
import assert from 'assert';
import Console from './Console';
import { stdout, stderr } from 'test-console';

describe('Console', function() {
  before(function() {
    this.console = Console();
    this.oldWindowOnError = window.onerror && window.onerror.bind({});
    this.oldWindowConsole = {
      ...window.console
    };
  });

  describe('#setHistory()', function() {
    it('should store history in reverse order', function() {
      this.console.setHistory("'history1'");
      this.console.setHistory("'history2'");
      this.console.setHistory("'history3'");
      assert.deepStrictEqual(this.console.getHistory(), ["'history3'", "'history2'", "'history1'"]);
    });
    it('should store the most recent 50 commands', function() {
      for (let i = 1; i <= 60; i++) {
        this.console.setHistory(`'history${i}'`);
      }
      const history = this.console.getHistory();
      assert.strictEqual(history.length, 50);
      assert.deepStrictEqual(history[0], "'history60'");
      assert.deepStrictEqual(history[49], "'history11'");
    });
  });

  describe('#getHistory()', function() {
    it('should retrieve the history', function() {
      this.console.setHistory(null, 0);
      this.console.setHistory("'history'");
      const history = this.console.getHistory();
      assert.deepStrictEqual(history, ["'history'"]);
      this.console.setHistory("'history2'");
      const history2 = this.console.getHistory();
      assert.deepStrictEqual(history2, ["'history2'", "'history'"]);
    });
  });

  describe('#overrideWindowConsole()', function() {
    it('should create a new function for the 4 verb methods', function() {
      this.console.overrideWindowConsole();
      assert.notDeepStrictEqual(this.oldWindowConsole.error, window.console.error);
      assert.notDeepStrictEqual(this.oldWindowConsole.info, window.console.info);
      assert.notDeepStrictEqual(this.oldWindowConsole.log, window.console.log);
      assert.notDeepStrictEqual(this.oldWindowConsole.warn, window.console.warn);
    });
    it('should not break the standard console', function() {
      this.console.overrideWindowConsole();
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
      this.console.restoreWindowOnError();
      this.console.overrideWindowOnError();
      assert.notDeepStrictEqual(this.oldWindowOnError, window.oldWindowOnError);
    });
    it('should not break the existing window.onerror', function() {
      this.console.restoreWindowOnError();
      const initialCallCount = window.onErrorCallCount;
      this.console.overrideWindowOnError();
      window.onerror();
      assert.deepStrictEqual(window.onErrorCallCount, initialCallCount + 1);
    });
    it('should write the error to stderr', function() {
      this.console.restoreWindowOnError();
      this.console.overrideWindowOnError();
      stderr.inspectSync((output) => {
        window.onerror('', '', 0, 0, 'string');
        window.onerror('', '', 0, 0, [1, 2, 3]);
        window.onerror('', '', 0, 0, { key: 'value' });
        assert.deepStrictEqual(output, ['string\n', '[ 1, 2, 3 ]\n', "{ key: 'value' }\n"]);
      });
    });
  });

  describe('#exec()', function() {
    it('should output the input and the evaluated object reference', function() {
      window.testString = 'value';
      stdout.inspectSync((output) => {
        this.console.exec('window.testString');
        assert.deepStrictEqual(output, [
          'window.testString\n',
          `${window.testString}\n`
        ]);
      });
    });
    it('should assign variables', function() {
      window.testString = 'old';
      this.console.exec('window.testString = "new"');
      assert.strictEqual(window.testString, 'new');
    });
    it('should not execute functions', function() {
      let testVar = 'old';
      window.testFn = () => (testVar = 'new');
      this.console.exec('window.testFn()');
      assert.strictEqual(testVar, 'old');
    });
    it('should catch errors and this.console.error it out', function() {
      stderr.inspectSync((output) => {
        assert.deepStrictEqual(output.length, 0, this.setupError);
        const notAString = 123;
        this.console.exec(notAString);
        assert.deepStrictEqual(output.length, 1);
      });
    });
  });
});
