import assert from 'assert';
import getDataType from './getDataType';

describe('#getDataType()', function() {
  it('should handle strings', function() {
    const stringDataType = getDataType('one');
    assert.strictEqual(stringDataType, 'string');
  });
  it('should handle numbers', function() {
    const dataType = getDataType(1);
    assert.strictEqual(dataType, 'number');
  });
  it('should handle arrays', function() {
    const dataType = getDataType(true);
    assert.strictEqual(dataType, 'boolean');
  });
  it('should handle arrays', function() {
    const dataType = getDataType([1, 2, 3]);
    assert.strictEqual(dataType, 'array');
  });
  it('should handle objects', function() {
    const dataType = getDataType({ 'one': 1, 'two': true, 'three': '3ree' });
    assert.strictEqual(dataType, 'object');
  });
  it('should handle null', function() {
    const dataType = getDataType(null);
    assert.strictEqual(dataType, 'null');
  });
  it('should handle undefined', function() {
    const dataType = getDataType(undefined);
    assert.strictEqual(dataType, 'undefined');
  });
  it('should handle functions', function() {
    const dataType = getDataType((arg) => console.log(arg));
    assert.strictEqual(dataType, 'function');
  });
});
