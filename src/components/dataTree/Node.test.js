import assert from 'assert';
import Node from './Node';

describe('Node', function() {
  it('should build a tree', function() {
    const data = { stringValue: 'value1', arrayValue: [1, 2, 3] };
    const tree = Node({ value: data });
    assert.strictEqual(tree.value, data);
    assert.strictEqual(tree.children.filter(child => child.type === 'member').length, 2);
    assert.strictEqual(tree.children[0].key, 'stringValue');
    assert.strictEqual(tree.children[0].node.value, data.stringValue);
    assert.strictEqual(tree.children[1].key, 'arrayValue');
    assert.strictEqual(tree.children[1].node.value, data.arrayValue);
  });

  it('should handle circular references', function() {
    const data = {};
    data.circular = data;
    const tree = Node({ value: data });
    assert.strictEqual(tree.value, data);
    assert.strictEqual(tree.children.filter(child => child.type === 'member').length, 1);
    assert.strictEqual(tree.children[0].key, 'circular');
    assert.strictEqual(tree.children[0].node.value, data.circular);
    assert.strictEqual(tree.children[0].node.children[0].key, 'circular');
    assert.strictEqual(tree.children[0].node.children[0].node.value, data.circular);
  });

  it('should handle deep circular references', function() {
    const data = { level1: { regularKey: 'regularValue', level2: { level3: {} } } };
    data.level1.level2.level3.circular = data.level1;
    const tree = Node({ value: data });
    assert.strictEqual(tree.value, data);
    assert.strictEqual(tree.children.filter(child => child.type === 'member').length, 1);
    assert.strictEqual(tree.children[0].key, 'level1');
    assert.strictEqual(tree.children[0].node.children[0].key, 'regularKey');
    assert.strictEqual(tree.children[0].node.children[0].node.value, 'regularValue');
    assert.strictEqual(tree.children[0].node.children[1].key, 'level2');
    assert.strictEqual(tree.children[0].node.children[1].node.value, data.level1.level2);
    assert.strictEqual(tree.children[0].node.children[1].node.children[0].key, 'level3');
    assert.strictEqual(tree.children[0].node.children[1].node.children[0].node.value, data.level1.level2.level3);
    assert.strictEqual(tree.children[0].node.children[1].node.children[0].node.children[0].key, 'circular');
    assert.strictEqual(tree.children[0].node.children[1].node.children[0].node.children[0].node.value, data.level1);
    assert.strictEqual(tree.children[0].node.children[1].node.children[0].node.children[0].node.value, data.level1.level2.level3.circular);
  });
});
