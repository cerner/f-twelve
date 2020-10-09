import assert from 'assert';
import Console from './Console';
import { stdout, stderr } from 'test-console';

describe('Console', function() {
  before(function() {
    this.console = Console();
  });
  beforeEach(function() {
    this.el.innerHTML = '';
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

  before(function() {
    this.output = Output();
    this.el = this.output.el;
    this.testAppendStrings = (level) => {
      const args = ['string1', 'string2', 'has a\nnewline', '👍'];
      this.output.append({ level: level, args: args });

      // Verify 1 row
      const logs = this.el.getElementsByClassName(level);
      assert.strictEqual(logs.length, 1);

      // Verify 1 element per console arg
      const argEl = logs[0].getElementsByClassName('consoleArgs')[0];
      const argNodes = argEl.childNodes;
      assert.strictEqual(argNodes.length, args.length);

      // Verify the output matches the input
      let idx = 0;
      for (const node of argNodes) {
        assert.strictEqual(node.textContent, args[idx++]);
      }
    };
    this.testAppendObjects = (level) => {
      const circular = { circular: undefined };
      circular.circular = circular;
      const largeArray = new Array(51).fill(0);
      const args = [{ key: 'value' }, [1, '2', 'three'], largeArray, circular, { undefined: undefined }];
      this.output.append({ level: level, args: args });

      // Verify 1 row
      const logs = this.el.getElementsByClassName(level);
      assert.strictEqual(logs.length, 1);

      // Verify 1 element per console arg
      const argEl = logs[0].getElementsByClassName('consoleArgs')[0];
      const argNodes = argEl.childNodes;
      assert.strictEqual(argNodes.length, args.length);

      // Verify the output matches the input
      let idx = 0;
      for (const node of argNodes) {
        const data = args[idx++];
        if (Array.isArray(data)) {
          assert.strictEqual(node.textContent, `Array(${data.length})`);
        } else {
          assert.strictEqual(node.textContent, `Object(${Object.keys(data).length})`);
        }
      }
    };
  });

  describe('#append()', function() {
    it('should append log strings', function() {
      this.testAppendStrings('log');
    });
    it('should append log objects', function() {
      this.testAppendObjects('log');
    });
    it('should append warn strings', function() {
      this.testAppendStrings('warn');
    });
    it('should append warn objects', function() {
      this.testAppendObjects('warn');
    });
    it('should append info strings', function() {
      this.testAppendStrings('info');
    });
    it('should append info objects', function() {
      this.testAppendObjects('info');
    });
    it('should append error strings', function() {
      this.testAppendStrings('error');
    });
    it('should append error objects', function() {
      this.testAppendObjects('error');
    });
    it('should display filename and line number from top of stack', function() {
      const stack = [{ fileName: 'fileX', lineNumber: 42 }];
      this.output.append({ level: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX:42');
    });
    it('should display filename only if no line number', function() {
      const stack = [{ fileName: 'fileX' }];
      this.output.append({ level: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX');
    });
    it('should not display filename if not available ', function() {
      const stack = [{ lineNumber: 42 }];
      this.output.append({ level: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, '');
    });
    it('should link filename to url from top of stack', function() {
      const url = 'http://test.com/';
      this.output.append({ level: 'log', args: ['test'], stack: [{ url }] });
      const fileNameHref = this.el.getElementsByClassName('fileName')[0].href;
      assert.strictEqual(fileNameHref, url);
    });
    it('should copy when copy button is clicked', function() {
      let copyCommandExecuted = false;
      global.document.execCommand = () => (copyCommandExecuted = true);
      const url = 'http://test.com/';
      this.output.append({ level: 'log', args: ['test'], stack: [{ url }] });
      this.el.getElementsByClassName('fileName')[0].getElementsByClassName('copyButton')[0].click();
      assert(copyCommandExecuted);
    });
  });

  describe('#onClickExpandIcon()', function() {
    it('should display children on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const args = this.el.getElementsByClassName('consoleArgs');
      assert.strictEqual(args.length, 1, this.setupError);
      const arg = args[0];
      assert.strictEqual(arg.getElementsByClassName('child').length, 0);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length > 0);
    });
    it('should remove children on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const args = this.el.getElementsByClassName('consoleArgs');
      assert.strictEqual(args.length, 1, this.setupError);
      const arg = args[0];
      assert(arg.getElementsByClassName('child').length === 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length > 0, this.setupError);
      arg.getElementsByClassName('caret')[0].click();
      assert(arg.getElementsByClassName('child').length === 0);
    });
  });
  describe('#toJson()', function() {
    it('should create json of all data', function() {
      this.output.append({ args: ['string', { key: 'value' }] });
      const parsed = JSON.parse(this.output.toJson());
      assert.strictEqual(parsed.userAgent, 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/15.0.0');
      assert.strictEqual(parsed.href, 'http://localhost/');
      assert(!!parsed.time.match(/\d\d:\d\d:\d\d\.\d\d\d/));
      assert(!!parsed.consoleOutput[0].time.match(/\d\d:\d\d:\d\d\.\d\d\d/));
      assert.strictEqual(parsed.consoleOutput[0].output[0], 'string');
      assert.strictEqual(parsed.consoleOutput[0].output[1].key, 'value');
    });
  });
});
