import assert from 'assert';
import Output from './Output';
import { getNode } from '../../dataTree/Tree';

describe('Output', function() {
  beforeEach(function() {
    this.el.innerHTML = '';
  });

  before(function() {
    this.output = Output();
    this.el = this.output.el;
    this.testAppendStrings = (verb) => {
      const args = ['string1', 'string2', 'has a\nnewline', '👍'];
      this.output.append({ verb: verb, args: args });

      // Verify 1 row
      const logs = this.el.getElementsByClassName(verb);
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
    this.testAppendObjects = (verb) => {
      const circular = { circular: undefined };
      circular.circular = circular;
      const largeArray = new Array(51).fill(0);
      const args = [{ key: 'value' }, [1, '2', 'three'], largeArray, circular, { undefined: undefined }];
      this.output.append({ verb: verb, args: args });

      // Verify 1 row
      const logs = this.el.getElementsByClassName(verb);
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
      this.output.append({ verb: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX:42');
    });
    it('should display filename only if no line number', function() {
      const stack = [{ fileName: 'fileX' }];
      this.output.append({ verb: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX');
    });
    it('should not display filename if not available ', function() {
      const stack = [{ lineNumber: 42 }];
      this.output.append({ verb: 'log', args: ['test'], stack: stack });
      const printedFileName = this.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, '');
    });
    it('should link filename to url from top of stack', function() {
      const url = 'http://test.com/';
      this.output.append({ verb: 'log', args: ['test'], stack: [{ url }] });
      const fileNameHref = this.el.getElementsByClassName('fileName')[0].href;
      assert.strictEqual(fileNameHref, url);
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
