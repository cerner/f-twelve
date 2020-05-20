import assert from 'assert';
import * as console from './Console';

describe('Prompt', function() {
  before(function() {
    this.prompt = console.prompt;
    this.inputBox = this.prompt.promptInput;
    this.pressKey = (key) => this.dispatchKeyboardEvent('keydown', key, this.inputBox);
  });

  describe('#onKeyDown()', function() {
    // Enter
    it('should clear the prompt on enter', function() {
      this.inputBox.value = "'test'";
      this.pressKey('Enter');
      assert.deepStrictEqual(this.inputBox.value, '');
    });
    it('should append command to history on enter', function() {
      console.setHistory(null, 0);
      this.inputBox.value = "'enter1'";
      this.pressKey('Enter');
      assert.deepStrictEqual(console.getHistory(), ["'enter1'"]);
      this.inputBox.value = "'enter2'";
      this.pressKey('Enter');
      assert.deepStrictEqual(console.getHistory(), ["'enter2'", "'enter1'"]);
      this.inputBox.value = "'enter3'";
      this.pressKey('Enter');
      assert.deepStrictEqual(console.getHistory(), ["'enter3'", "'enter2'", "'enter1'"]);
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
