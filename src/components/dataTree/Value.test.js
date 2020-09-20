import assert from 'assert';
import { getPreview } from './Value';

describe('Value', function() {
  describe('#getPreview', function() {
    it('should handle strings', function() {
      const preview = getPreview('key', 'one');
      assert.strictEqual(preview, '');
    });
    it('should handle numbers', function() {
      const preview = getPreview('key', 1);
      assert.strictEqual(preview, '');
    });
    it('should handle boolean', function() {
      const preview = getPreview('key', true);
      assert.strictEqual(preview, '');
    });
    it('should handle array', function() {
      const preview = getPreview('key', [1, 2, 3]);
      assert.strictEqual(preview, '[1, 2, 3]');
    });
    it('should handle array of objects', function() {
      const preview = getPreview('key', [{ key: 1 }, { key: 2 }]);
      assert.strictEqual(preview, '[{…}, {…}]');
    });
    it('should handle array of arrays', function() {
      const preview = getPreview('key', [[1, 2], [3, 4, 5]]);
      assert.strictEqual(preview, '[[…], […]]');
    });
    it('should handle objects', function() {
      const preview = getPreview('key', { 'one': 1, 'two': true, 'three': '3ree' });
      assert.strictEqual(preview, '{one:…, two:…, three:…}');
    });
    it('should handle null', function() {
      const preview = getPreview('key', null);
      assert.strictEqual(preview, '');
    });
    it('should handle undefined', function() {
      const preview = getPreview('key', undefined);
      assert.strictEqual(preview, '');
    });
    it('should handle functions', function() {
      const someFunction = (arg) => console.log(arg);
      const preview = getPreview('key', someFunction);
      assert.strictEqual(preview, '');
    });
    it('should handle __proto__', function() {
      const preview = getPreview('__proto__', 'anything');
      assert.strictEqual(preview, '{…}');
    });
  });
});
