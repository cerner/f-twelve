import assert from 'assert';

describe('FTwelve', function() {
  before(function() {
    this.fTwelveAttached = () => this.isAttached(this.fTwelve.el);
  });

  describe('#enable()', function() {
    it("should attach to the DOM if 'show' is `true`", function() {
      this.fTwelve.disable();
      assert(!this.fTwelveAttached(), this.setupError);
      this.fTwelve.enable(true);
      assert(this.fTwelveAttached());
    });
    it("should not attach to the DOM if 'show' is `false`", function() {
      this.fTwelve.disable();
      assert(!this.fTwelveAttached(), this.setupError);
      this.fTwelve.enable(false);
      assert(!this.fTwelveAttached());
    });
  });

  describe('#disable()', function() {
    it('should detach the tool from the DOM', function() {
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), this.setupError);
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
      this.fTwelve.onAttach = () => (this.testVar = 'new');
      this.fTwelve.attach();
      assert.strictEqual(this.testVar, 'new');
    });
  });

  describe('#detach()', function() {
    it('should remove from the DOM', function() {
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), this.setupError);
      this.fTwelve.detach();
      assert(!this.fTwelveAttached());
    });
    it('should execute onDetach callback', function() {
      this.testVar = 'old';
      this.fTwelve.attach();
      assert(this.fTwelveAttached(), this.setupError);
      this.fTwelve.onDetach = () => (this.testVar = 'new');
      this.fTwelve.detach();
      assert.strictEqual(this.testVar, 'new');
    });
  });

  describe('#onKeyDown()', function() {
    it('should update keyDownStack', function() {
      this.dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, 'A');
      this.dispatchKeyboardEvent('keydown', 'B');
      assert.strictEqual(this.fTwelve.keyDownStack, 'AB');
      this.dispatchKeyboardEvent('keydown', 'C');
      assert.strictEqual(this.fTwelve.keyDownStack, 'ABC');
    });
    it('should recognize F12 and attach', function() {
      this.dispatchKeyboardEvent('keydown', 'F');
      this.dispatchKeyboardEvent('keydown', '1');
      this.dispatchKeyboardEvent('keydown', '2');
      assert(this.fTwelveAttached());
    });
    it('should recognize F12 and detach', function() {
      this.fTwelve.attach();
      this.dispatchKeyboardEvent('keydown', 'F');
      this.dispatchKeyboardEvent('keydown', '1');
      this.dispatchKeyboardEvent('keydown', '2');
      assert(!this.fTwelveAttached());
    });
  });

  describe('#onKeyUp()', function() {
    it('should clear the keyDownStack', function() {
      this.dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, 'A', this.setupError);
      this.dispatchKeyboardEvent('keyup', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, '');
    });
  });

  describe('#enableKeyboardTrigger()', function() {
    it('should enable the key listener', function() {
      this.fTwelve.disableKeyboardTrigger();
      this.dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, '', this.setupError);
      this.fTwelve.enableKeyboardTrigger();
      this.dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, 'A');
    });
  });

  describe('#dispatchKeyboardEvent()', function() {
    it('should disable the key listener', function() {
      this.fTwelve.disableKeyboardTrigger();
      this.dispatchKeyboardEvent('keydown', 'A');
      assert.strictEqual(this.fTwelve.keyDownStack, '');
    });
  });
});
