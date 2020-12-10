import { h } from 'preact';
import assert from 'assert';
import Console, { exec, getHistory, parseCommand, prepConsoleData, setHistory, toJson } from './Console';
import { stderr, stdout } from 'test-console';
import { render } from '@testing-library/preact';
import { findByTitle } from '@testing-library/dom';
import { update } from '../../../../test/utilities';

const testArgs = ['arg1', 'arg2'];
const renderTestConsole = (level = 'log') => {
  const stack = [{ fileName: 'fileX', lineNumber: 42 }];
  const consoleData = [prepConsoleData({ level, args: testArgs, stack })];
  const { container } = render(<Console consoleData={consoleData}/>);
  return container;
};

describe('Console', function() {
  describe('output', async function() {
    it('should add 1 row', function() {
      const container = renderTestConsole();
      const output = container.getElementsByClassName('output')[0];
      assert.strictEqual(output.childNodes.length, 1);
    });

    it('should display timestamp without the date', function() {
      const consoleData = prepConsoleData({ args: [] });
      consoleData.timestamp = '2020-10-12 11:53:23';
      const { container } = render(<Console consoleData={[consoleData]}/>);
      const timestamp = container.getElementsByClassName('timestamp')[0];
      assert.strictEqual(timestamp.textContent, '11:53:23');
    });

    it('should create an element for each console arg', function() {
      const container = renderTestConsole();
      const argsEl = container.getElementsByClassName('consoleArgs')[0];
      assert.strictEqual(argsEl.childNodes.length, testArgs.length);
    });

    it('should create  an element for each console arg', function() {
      const container = renderTestConsole();
      const argsEl = container.getElementsByClassName('consoleArgs')[0];
      assert.strictEqual(argsEl.childNodes.length, testArgs.length);
    });

    it('should create a log row with log level', function() {
      const container = renderTestConsole('log');
      const row = container.getElementsByClassName('row')[0];
      assert(row.classList.contains('log'));
    });
    it('should create a warn row with warn level', function() {
      const container = renderTestConsole('warn');
      const row = container.getElementsByClassName('row')[0];
      assert(row.classList.contains('warn'));
    });
    it('should create a info row with info level', function() {
      const container = renderTestConsole('info');
      const row = container.getElementsByClassName('row')[0];
      assert(row.classList.contains('info'));
    });
    it('should create a error row with error level', function() {
      const container = renderTestConsole('error');
      const row = container.getElementsByClassName('row')[0];
      assert(row.classList.contains('error'));
    });
  });

  describe('copy', function() {
    let lastExecCommand;

    beforeEach(function() {
      lastExecCommand = null;
      global.document.execCommand = (command) => (lastExecCommand = command);
    });

    it('should call execCommand for stack', async function() {
      const container = renderTestConsole();
      const copyButton = await findByTitle(container, 'Copy stack');
      copyButton.click();
      await update();
      assert.strictEqual(lastExecCommand, 'copy');
    });

    it('should call execCommand for all', async function() {
      const container = renderTestConsole();
      const copyButton = await findByTitle(container, 'Copy all output');
      copyButton.click();
      await update();
      assert.strictEqual(lastExecCommand, 'copy');
    });
  });

  describe('#prepConsoleData()', function() {
    it('should display filename and line number from top of stack', function() {
      const stack = [{ fileName: 'fileX', lineNumber: 42 }];
      const parsed = prepConsoleData({ args: ['test'], stack: stack });
      assert.strictEqual(parsed.fileName, 'fileX:42');
    });
    it('should display filename only if no line number', function() {
      const stack = [{ fileName: 'fileX' }];
      const parsed = prepConsoleData({ args: ['test'], stack: stack });
      assert.strictEqual(parsed.fileName, 'fileX');
    });
    it('should not display filename if not available ', function() {
      const stack = [{ lineNumber: 42 }];
      const parsed = prepConsoleData({ args: ['test'], stack: stack });
      assert.strictEqual(parsed.fileName, '');
    });
    it('should create a data tree for each console arg', function() {
      const args = [1, 'two', { thr: 'ee' }];
      const parsed = prepConsoleData({ args: args });
      assert.strictEqual(parsed.argData.length, 3);
      assert.strictEqual(parsed.argData[0].value, args[0]);
      assert.strictEqual(parsed.argData[1].value, args[1]);
      assert.strictEqual(parsed.argData[2].value, args[2]);
    });
  });

  describe('#toJson()', function() {
    it('should create json of all data', function() {
      const rows = [prepConsoleData({ args: ['string', { key: 'value' }] })];
      const parsed = JSON.parse(toJson(rows));
      assert.strictEqual(parsed.userAgent, 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/15.0.0');
      assert.strictEqual(parsed.href, 'http://localhost/');
      assert(!!parsed.time.match(/\d\d:\d\d:\d\d\.\d\d\d/));
      assert(!!parsed.consoleOutput[0].time.match(/\d\d:\d\d:\d\d\.\d\d\d/));
      assert.strictEqual(parsed.consoleOutput[0].output[0], 'string');
      assert.strictEqual(parsed.consoleOutput[0].output[1].key, 'value');
    });
  });

  describe('#setHistory()', function() {
    it('should store history in reverse order', function() {
      setHistory("'history1'");
      setHistory("'history2'");
      setHistory("'history3'");
      assert.deepStrictEqual(getHistory(), ["'history3'", "'history2'", "'history1'"]);
    });
    it('should store the most recent 50 commands', function() {
      for (let i = 1; i <= 60; i++) {
        setHistory(`'history${i}'`);
      }
      const history = getHistory();
      assert.strictEqual(history.length, 50);
      assert.deepStrictEqual(history[0], "'history60'");
      assert.deepStrictEqual(history[49], "'history11'");
    });
  });

  describe('#getHistory()', function() {
    it('should retrieve the history', function() {
      setHistory(null, 0);
      setHistory("'history'");
      const history = getHistory();
      assert.deepStrictEqual(history, ["'history'"]);
      setHistory("'history2'");
      const history2 = getHistory();
      assert.deepStrictEqual(history2, ["'history2'", "'history'"]);
    });
  });

  describe('#exec()', function() {
    it('should output the input and the evaluated object reference', function() {
      window.testString = 'value';
      stdout.inspectSync((output) => {
        exec('window.testString');
        assert.deepStrictEqual(output, [
          'window.testString\n',
          `${window.testString}\n`
        ]);
      });
    });
    it('should assign variables', function() {
      window.testString = 'old';
      exec('window.testString = "new"');
      assert.strictEqual(window.testString, 'new');
    });
    it('should not execute functions', function() {
      let testVar = 'old';
      window.testFn = () => (testVar = 'new');
      exec('window.testFn()');
      assert.strictEqual(testVar, 'old');
    });
    it('should catch errors and error it out', function() {
      stderr.inspectSync((output) => {
        assert.deepStrictEqual(output.length, 0, this.setupError);
        const notAString = 123;
        exec(notAString);
        assert.deepStrictEqual(output.length, 1);
      });
    });
  });

  describe('#parseCommand()', function() {
    before(function() {
      this.testParseCommand = (command) => {
        assert.strictEqual(
          parseCommand(command),
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
