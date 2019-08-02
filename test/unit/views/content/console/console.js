import assert from 'assert';
import Console from '../../../../../src/js/views/content/console/console';
import { stdout, stderr } from 'test-console';

describe('Console', function() {
  before(function() {
    this.oldWindowOnError = Object.assign({}, window.onerror);
    this.oldWindowConsole = Object.assign({}, window.console);
    this.console = new Console();
  });

  describe('#setHistory()', function() {
    it('should store history in reverse order', function() {
      this.console.setHistory("'history1'");
      this.console.setHistory("'history2'");
      this.console.setHistory("'history3'");
      assert.deepStrictEqual(this.console.execHistory, ["'history3'", "'history2'", "'history1'"]);
    });
    it('should store the most recent 50 commands', function() {
      for (let i = 1; i <= 60; i++) {
        this.console.setHistory(`'history${i}'`);
      }
      assert.strictEqual(this.console.execHistory.length, 50);
      assert.deepStrictEqual(this.console.execHistory[0], "'history60'");
      assert.deepStrictEqual(this.console.execHistory[49], "'history11'");
    });
  });

  describe('#getHistory()', function() {
    it('should retrieve the history', function() {
      this.console.execHistory = [];
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
    it('should create a new function for window.onerroro', function() {
      this.console.overrideWindowOnError();
      assert.notDeepStrictEqual(this.oldWindowOnError, window.oldWindowOnError);
    });
    it('should not break the existing window.onerror', function() {
      const testVar = [];
      window.onerror = () => testVar.push(1);
      window.onerror();
      assert.deepStrictEqual(testVar, [1], this.setupError);
      this.console.overrideWindowOnError();
      window.onerror();
      assert.deepStrictEqual(testVar, [1, 1]);
      window.onerror = null;
    });
    it('should write the error to stderr', function() {
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
    it('should catch errors and console.error it out', function() {
      stderr.inspectSync((output) => {
        assert.deepStrictEqual(output.length, 0, this.setupError);
        const notAString = 123;
        this.console.exec(notAString);
        assert.deepStrictEqual(output.length, 1);
      });
    });
  });

  describe('#parseCommand()', function() {
    before(function() {
      this.testParseCommand = (command) => {
        assert.strictEqual(
          this.console.parseCommand(command),
          new Function(`return ${command}`)() // eslint-disable-line no-new-func
        );
      };
    });
    it('should evaluate valid global objects using dot notation', function() {
      window.testString = 'value';
      this.testParseCommand('window.location.href');
      this.testParseCommand('window.testString');
    });
    it('should evaluate valid global objects using bracket notation', function() {
      window.testArray = ['value'];
      this.testParseCommand("window['location']['href']");
      this.testParseCommand("window['testArray'][0]");
    });
    it('should evaluate valid global objects using dot and bracket notation', function() {
      window.testObj = {
        arrayOfObjs: [
          { key1: 'value1' },
          { key2: 'value2' }
        ],
        1: 'one',
        'stringkey': 1,
        nestedArray: [[
          [1, 2, 3],
          [4, 5, 6],
        ], [
          ['one', 'two', 'three'],
          ['four', 'five', 'six'],
        ], {
          one: 1
        }]
      };
      this.testParseCommand('window.testObj.arrayOfObjs[0]');
      this.testParseCommand("window.testObj['arrayOfObjs'][1].key2");
      this.testParseCommand('window.testObj.stringkey');
      this.testParseCommand('window.testObj.nestedArray[0][0][0]');
      this.testParseCommand("window.testObj['nestedArray'][1][0][2]");
      this.testParseCommand("window.testObj.nestedArray[2]['one']");
    });
    it('should evaluate strings', function() {
      this.testParseCommand("'single quotes'");
      this.testParseCommand('"double quotes"');
    });
    it('should handle assignments', function() {
      window.testValue = 'old';
      this.testParseCommand('window.testValue = "new"');
      assert.strictEqual(window.testValue, 'new');
    });
    it('should handle multiple assignments', function() {
      window.testValue1 = 'old1';
      window.testValue2 = 'old2';
      this.testParseCommand('window.testValue1 = window.testValue2 = "new"');
      assert.strictEqual(window.testValue1, 'new');
      assert.strictEqual(window.testValue2, 'new');
    });
    it('should handle nested assignments', function() {
      window.testObject = { key1: { key2: 'old' } };
      this.testParseCommand("window.testObject.key1.key2 = 'new'");
      assert.strictEqual(window.testObject.key1.key2, 'new');
    });
  });
});
