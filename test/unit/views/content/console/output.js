import assert from 'assert';
import Output from '../../../../../src/js/views/content/console/output';

const prune = require('json-prune');

describe('Output', function() {
  before(function() {
    this.output = new Output();
    this.testAppendStrings = (verb) => {
      const args = ['string1', 'string2', 'has a\nnewline', '👍'];
      this.output.el.innerHTML = '';
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
      this.output.el.innerHTML = '';
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
    it('should append log', function() {
      this.testAppendStrings('log');
      this.testAppendObjects('log');
    });
    it('should append warn', function() {
      this.testAppendStrings('warn');
      this.testAppendObjects('warn');
    });
    it('should append info', function() {
      this.testAppendStrings('info');
      this.testAppendObjects('info');
    });
    it('should append error', function() {
      this.testAppendStrings('error');
      this.testAppendObjects('error');
    });
  });

  describe('#onClickExpandIcon()', function() {
    it('should expand output block on click', function() {
      this.output.el.innerHTML = '';
      this.output.append({ args: [{ key: 'value' }] });
      const textBlocks = this.output.el.getElementsByClassName('block');
      assert.strictEqual(textBlocks.length, 1, this.setupError);
      const textBlock = textBlocks[0];
      assert(!textBlock.classList.contains('open'));
      textBlock.click();
      assert(textBlock.classList.contains('open'));
    });
    it('should collapse expanded output block on click', function() {
      this.output.el.innerHTML = '';
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
