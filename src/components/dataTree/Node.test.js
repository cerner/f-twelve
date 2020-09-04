import assert from 'assert';
import Node from './Node';

describe('Node', function() {
  it('should build a tree', function() {
    const value = { string: 'value', array: [1, 2, 3] };
    value.circular = value;
    const tree = Node({ value });
    console.log(tree);
  });
});
