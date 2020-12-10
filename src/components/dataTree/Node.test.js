import { h } from 'preact';
import { getNode } from './Tree';
import Node, { formatSimpleValue, getPreview } from './Node';
import assert from 'assert';
import { render } from '@testing-library/preact';
import { update } from '../../../test/utilities';

describe('Node', function() {
  it('should render simple values', function() {
    const { container } = render(<Node node={getNode('simple')}/>);
    assert.strictEqual(container.textContent, 'simple');
  });
  it('should render objects', function() {
    const { container } = render(<Node node={getNode({ objectKey: 'complex' })}/>);
    assert.strictEqual(container.textContent, 'Object(1){objectKey:…}');
  });
  it('should render arrays', function() {
    const { container } = render(<Node node={getNode([1, 2, 3])}/>);
    assert.strictEqual(container.textContent, 'Array(3)[1, 2, 3]');
  });
  it('should display value when clicked', async function() {
    const { container } = render(<Node node={getNode({ key: 'value' })}/>);
    assert.strictEqual(container.getElementsByClassName('value').length, 0, this.setupError);
    container.getElementsByClassName('caretIcon')[0].click();
    await update();
    assert.strictEqual(container.getElementsByClassName('value').length, 1);
  });

  describe('#formatSimpleValue', function() {
    it('should handle strings', function() {
      const formatted = formatSimpleValue('string');
      assert.strictEqual(formatted, 'string');
    });
    it('should handle child strings', function() {
      const formatted = formatSimpleValue('string', 'child');
      assert.strictEqual(formatted, '"string"');
    });
    it('should handle numbers', function() {
      const formattedInt = formatSimpleValue(123);
      assert.strictEqual(formattedInt, '123');
      const formattedFloat = formatSimpleValue(123.456789);
      assert.strictEqual(formattedFloat, '123.456789');
    });
    it('should handle boolean', function() {
      const formattedTrue = formatSimpleValue(true);
      assert.strictEqual(formattedTrue, 'true');
      const formattedFalse = formatSimpleValue(false);
      assert.strictEqual(formattedFalse, 'false');
    });
    it('should handle null', function() {
      const formatted = formatSimpleValue(null);
      assert.strictEqual(formatted, 'null');
    });
    it('should handle undefined', function() {
      const formatted = formatSimpleValue(undefined);
      assert.strictEqual(formatted, 'undefined');
    });
    it('should handle functions', function() {
      const someFunction = (arg) => console.log(arg);
      const formatted = formatSimpleValue(someFunction);
      assert.strictEqual(formatted, 'function someFunction(arg) { return console.log(arg); }');
    });
  });

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
      const preview = getPreview('__proto__', {});
      assert.strictEqual(preview, '{…}');
    });
  });
});
