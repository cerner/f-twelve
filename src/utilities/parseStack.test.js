import assert from 'assert';
import parseStack from './parseStack';

describe('#parseStack()', function() {
  it('should parse stack with backslashes', function() {
    const parsed = parseStack('\n\n  at fn (C:\\path\\file.js:123:45)');
    assert.deepStrictEqual(parsed[0].path, 'fn (C:\\path\\file.js:123:45)');
    assert.deepStrictEqual(parsed[0].url, undefined);
    assert.deepStrictEqual(parsed[0].fileName, 'file.js');
    assert.deepStrictEqual(parsed[0].lineNumber, '123');
    assert.deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should parse stack with forwardslashes', function() {
    const parsed = parseStack('\n\n  at fn (http://path/file.js:123:45)');
    assert.deepStrictEqual(parsed[0].path, 'fn (http://path/file.js:123:45)');
    assert.deepStrictEqual(parsed[0].url, 'http://path/file.js');
    assert.deepStrictEqual(parsed[0].fileName, 'file.js');
    assert.deepStrictEqual(parsed[0].lineNumber, '123');
    assert.deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should parse stack with no parenthesis', function() {
    const parsed = parseStack('\n\n  at C:/path/file.js:123:45');
    assert.deepStrictEqual(parsed[0].path, 'C:/path/file.js:123:45');
    assert.deepStrictEqual(parsed[0].url, undefined);
    assert.deepStrictEqual(parsed[0].fileName, 'file.js');
    assert.deepStrictEqual(parsed[0].lineNumber, '123');
    assert.deepStrictEqual(parsed[0].columnNumber, '45');
  });
  it('should handle unexpected input', function() {
    const parsed = parseStack('\n\n something that does not look like a stack');
    assert.deepStrictEqual(parsed, []);
  });
});
