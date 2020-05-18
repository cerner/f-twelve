import assert from 'assert';
import Output from './output';

const prune = require('json-prune');

describe('Output', function() {
  beforeEach(function() {
    this.output.el.innerHTML = '';
  });
  before(function() {
    this.output = new Output();
    this.testAppendStrings = (verb) => {
      const args = ['string1', 'string2', 'has a\nnewline', '👍'];
      this.output.append({ verb: verb, args: args });
      const logs = this.output.el.getElementsByClassName(verb);
      assert.strictEqual(logs.length, 1);
      const texts = logs[0].getElementsByClassName('outputText');
      assert.strictEqual(texts.length, args.length);
      let idx = 0;
      for (const text of texts) {
        assert.strictEqual(text.textContent, args[idx++]);
      }
    };
    this.testAppendObjects = (verb) => {
      const circular = { circular: undefined };
      circular.circular = circular;
      const largeArray = new Array(51).fill(0);
      const args = [{ key: 'value' }, [1, '2', 'three'], largeArray, circular, { undefined: undefined }];
      this.output.append({ verb: verb, args: args });
      const logs = this.output.el.getElementsByClassName(verb);
      assert.strictEqual(logs.length, 1);
      const texts = logs[0].getElementsByClassName('outputText');
      assert.strictEqual(texts.length, args.length);
      let idx = 0;
      for (const text of texts) {
        assert.strictEqual(
          text.textContent,
          JSON.stringify(JSON.parse(prune(args[idx++], Output.pruneOptions)), null, 2)
        );
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
      const printedFileName = this.output.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX:42');
    });
    it('should display filename only if no line number', function() {
      const stack = [{ fileName: 'fileX' }];
      this.output.append({ verb: 'log', args: ['test'], stack: stack });
      const printedFileName = this.output.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, 'fileX');
    });
    it('should not display filename if not available ', function() {
      const stack = [{ lineNumber: 42 }];
      this.output.append({ verb: 'log', args: ['test'], stack: stack });
      const printedFileName = this.output.el.getElementsByClassName('fileName')[0].textContent;
      assert.strictEqual(printedFileName, '');
    });
    it('should link filename to url from top of stack', function() {
      const url = 'http://test.com/';
      this.output.append({ verb: 'log', args: ['test'], stack: [{ url }] });
      const fileNameHref = this.output.el.getElementsByClassName('fileName')[0].href;
      assert.strictEqual(fileNameHref, url);
    });
  });

  describe('#onClickExpandIcon()', function() {
    it('should expand output block on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const textBlocks = this.output.el.getElementsByClassName('block');
      assert.strictEqual(textBlocks.length, 1, this.setupError);
      const textBlock = textBlocks[0];
      assert(!textBlock.classList.contains('open'));
      textBlock.click();
      assert(textBlock.classList.contains('open'));
    });
    it('should collapse expanded output block on click', function() {
      this.output.append({ args: [{ key: 'value' }] });
      const textBlocks = this.output.el.getElementsByClassName('block');
      assert.strictEqual(textBlocks.length, 1, this.setupError);
      const textBlock = textBlocks[0];
      assert(!textBlock.classList.contains('open'), this.setupError);
      textBlock.click();
      assert(textBlock.classList.contains('open'), this.setupError);
      textBlock.click();
      assert(!textBlock.classList.contains('open'));
    });
  });
});
