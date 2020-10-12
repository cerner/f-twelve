import { h } from 'preact';
import assert from 'assert';
import Prompt from './Prompt';
import Console from './Console';
import { dispatchKeyboardEvent } from '../../../../test/utilities';

describe('Prompt', function() {
  beforeEach(function() {
    this.console.setHistory(null, 0);
  });

  before(function() {
    this.console = Console();
    this.prompt = (
      <Prompt exec={this.console.exec}
              getHistory={this.console.getHistory}
              inputRef={node => (this.inputBox = node)}/>
    );
    this.pressKey = (key) => dispatchKeyboardEvent('keydown', key, this.inputBox);
  });

  describe('#onKeyDown()', function() {
    // Enter
    it('should clear the prompt on enter', function() {
      this.inputBox.value = "'test'";
      this.pressKey('Enter');
      assert.deepStrictEqual(this.inputBox.value, '');
    });
    it('should append command to history on enter', function() {
      this.inputBox.value = "'enter1'";
      this.pressKey('Enter');
      assert.deepStrictEqual(this.console.getHistory(), ["'enter1'"]);
      this.inputBox.value = "'enter2'";
      this.pressKey('Enter');
      assert.deepStrictEqual(this.console.getHistory(), ["'enter2'", "'enter1'"]);
      this.inputBox.value = "'enter3'";
      this.pressKey('Enter');
      assert.deepStrictEqual(this.console.getHistory(), ["'enter3'", "'enter2'", "'enter1'"]);
    });

    // Arrow keys
    it('should retrieve history on arrow up', function() {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      assert.strictEqual(this.inputBox.value, "'history1'");
    });
    it('should un-retrieve history on arrow up then down', function() {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');
      assert.strictEqual(this.inputBox.value, '');
    });
    it('should retrieve history on multiple arrow up', function() {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      assert.strictEqual(this.inputBox.value, "'history1'");
    });
    it('should retrieve latest history on double arrow up and single arrow down', function() {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');
      assert.strictEqual(this.inputBox.value, "'history2'");
    });
    it('should retrieve oldest history on more arrow up than history size', function() {
      this.inputBox.value = "'history1'";
      this.pressKey('Enter');
      this.inputBox.value = "'history2'";
      this.pressKey('Enter');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      assert.strictEqual(this.inputBox.value, "'history1'");
    });
    it('should retrieve current unsubmitted text on arrow up and back down', function() {
      this.inputBox.value = "'histo-'";
      this.inputBox.onchange();
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');
      this.pressKey('ArrowDown');
      assert.strictEqual(this.inputBox.value, "'histo-'");
    });
  });
});
