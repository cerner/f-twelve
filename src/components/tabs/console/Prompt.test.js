import { h } from 'preact';
import assert from 'assert';
import Prompt from './Prompt';
import { exec, getHistory, setHistory } from './Console';
import { dispatchKeyboardEvent, findByClassName } from '../../../../test/utilities';
import { render, fireEvent } from '@testing-library/preact';

describe('Prompt', function() {
  beforeEach(async function() {
    setHistory(null, 0);

    const { container } = render(
      <Prompt exec={exec}
              getHistory={getHistory}
              inputRef={node => (this.inputBox = node)}/>
    );
    this.inputBox = await findByClassName(container, 'promptInput');
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
      assert.deepStrictEqual(getHistory(), ["'enter1'"]);
      this.inputBox.value = "'enter2'";
      this.pressKey('Enter');
      assert.deepStrictEqual(getHistory(), ["'enter2'", "'enter1'"]);
      this.inputBox.value = "'enter3'";
      this.pressKey('Enter');
      assert.deepStrictEqual(getHistory(), ["'enter3'", "'enter2'", "'enter1'"]);
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
    it('should retrieve current unsubmitted text on arrow up and back down', async function() {
      this.inputBox.value = "'histo-'";
      fireEvent.change(this.inputBox);
      this.pressKey('ArrowUp');
      this.pressKey('ArrowUp');
      this.pressKey('ArrowDown');
      this.pressKey('ArrowDown');
      assert.strictEqual(this.inputBox.value, "'histo-'");
    });
  });

  describe('#onChange()', function() {
    before(function() {
      this.testOnChangeHandler = function(eventType) {
        this.inputBox.value = "'history1'";
        this.pressKey('Enter');
        this.inputBox.value = "'history2'";
        this.pressKey('Enter');
        this.inputBox.value = "'history3'";
        this.pressKey('Enter');
        this.pressKey('ArrowUp'); // history3
        this.pressKey('ArrowUp'); // history2
        this.pressKey('ArrowUp'); // history1
        this.inputBox.dispatchEvent(new Event(eventType));
        this.pressKey('ArrowUp'); // history3
        assert.strictEqual(this.inputBox.value, "'history3'");
      };
    });
    it('should reset history pointer to beginning on change', function() {
      this.testOnChangeHandler('change');
    });
    it('should reset history pointer to beginning on input', function() {
      this.testOnChangeHandler('input');
    });
  });
})
;
