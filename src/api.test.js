import assert from 'assert';
import * as fTwelve from '../src/api';
import { dispatchKeyboardEvent, setupError } from '../test/utilities';

describe('api', function() {
  before(function() {
    this.fTwelve = fTwelve;
    this.fTwelveAttached = () => document.body.contains(this.fTwelve.el);
  });

  // Always start test enabled and hidden just like production
  beforeEach(function() {
    this.fTwelve.enable();
    this.fTwelve.detach();
  });

  describe('#enable()', function() {
    it("should attach to the DOM if 'show' is `true`", function() {
      this.fTwelve.disable();
      assert(!this.fTwelveAttached(), setupError);
      this.fTwelve.enable({ show: true });
      assert(this.fTwelveAttached());
    });
    it("should not attach to the DOM if 'show' is `false`", function() {
      this.fTwelve.disable();
      assert(!this.fTwelveAttached(), setupError);
      this.fTwelve.enable({ show: false });
      assert(!this.fTwelveAttached());
    });
  });

  describe('#disable()', function() {
    it('should detach the tool from the DOM', function() {
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), setupError);
      this.fTwelve.disable();
      assert(!this.fTwelveAttached());
    });
    it('should not attach while disabled', function() {
      this.fTwelve.disable();
      this.fTwelve.attach();
      assert(!this.fTwelveAttached());
    });
  });

  describe('#attach()', function() {
    it('should append to the DOM', function() {
      this.fTwelve.attach();
      assert(this.fTwelveAttached());
    });
    it('should execute onAttach callback', function() {
      this.testVar = 'old';
      this.fTwelve.onAttach(() => (this.testVar = 'new'));
      this.fTwelve.attach();
      assert.strictEqual(this.testVar, 'new');
    });
  });

  describe('#detach()', function() {
    it('should remove from the DOM', function() {
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), setupError);
      this.fTwelve.detach();
      assert(!this.fTwelveAttached());
    });
    it('should execute onDetach callback', function() {
      this.testVar = 'old';
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), setupError);
      this.fTwelve.onDetach(() => (this.testVar = 'new'));
      this.fTwelve.detach();
      assert.strictEqual(this.testVar, 'new');
    });
  });

  describe('#onKeyDown()', function() {
    it('should update keyDownStack', function() {
      dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), 'A');
      dispatchKeyboardEvent('keydown', 'B');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), 'AB');
      dispatchKeyboardEvent('keydown', 'C');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), 'ABC');
    });
    it('should recognize F12 and attach', function() {
      dispatchKeyboardEvent('keydown', 'F');
      dispatchKeyboardEvent('keydown', '1');
      dispatchKeyboardEvent('keydown', '2');
      assert(this.fTwelveAttached());
    });
    it('should recognize F12 and detach', function() {
      this.fTwelve.attach();
      dispatchKeyboardEvent('keydown', 'F');
      dispatchKeyboardEvent('keydown', '1');
      dispatchKeyboardEvent('keydown', '2');
      assert(!this.fTwelveAttached());
    });
    it('should not attach on keypress of single F12 key', function() {
      dispatchKeyboardEvent('keydown', 'F12');
      assert(!this.fTwelveAttached());
    });
  });

  describe('#onKeyUp()', function() {
    it('should clear the keyDownStack', function() {
      dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), 'A', setupError);
      dispatchKeyboardEvent('keyup', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), '');
    });
  });

  describe('#enableKeyboardTrigger()', function() {
    it('should enable the key listener', function() {
      this.fTwelve.disableKeyboardTrigger();
      dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), '', setupError);
      this.fTwelve.enableKeyboardTrigger();
      dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), 'A');
    });
  });

  describe('#dispatchKeyboardEvent()', function() {
    it('should disable the key listener', function() {
      this.fTwelve.disableKeyboardTrigger();
      dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.getKeyDownStack(), '');
    });
  });
});
