import assert from 'assert';
import getTimestamp from './getTimestamp';

describe('#getTimestamp()', function() {
  it('should return a string in the expected format', function() {
    const timestamp = getTimestamp();
    assert.strictEqual(typeof timestamp, 'string');
    assert(!!timestamp.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d$/));
  });
});
