import assert from 'assert';
import Tree from './Tree';

const getTree = (value) => Tree({ data: value }).dataTree;

describe('Tree', function() {
  describe('#getNode', function() {
    it('should build a tree', function() {
      const data = { stringValue: 'value1', arrayValue: [1, 2, 3] };
      const tree = getTree(data);
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
      const tree = getTree(data);
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
      const tree = getTree(data);
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

  describe('#toJson()', function() {
    it('should handle simple values', function() {
      const stringNode = getTree('one');
      assert.strictEqual(stringNode.toJson(), '"one"');
      const numberNode = getTree(1);
      assert.strictEqual(numberNode.toJson(), '1');
      const booleanNode = getTree(true);
      assert.strictEqual(booleanNode.toJson(), 'true');
    });
    it('should handle arrays', function() {
      const arrayNode = getTree([1, 2, 3]);
      assert.strictEqual(arrayNode.toJson(), '[1,2,3]');
    });
    it('should handle objects', function() {
      const objectNode = getTree({ 'one': 1, 'two': true, 'three': '3ree' });
      assert.strictEqual(objectNode.toJson(), '{"one":1,"two":true,"three":"3ree"}');
    });
    it('should handle circular references', function() {
      const data = {};
      data.circular = data;
      const tree = getTree(data);
      assert.strictEqual(tree.toJson(), '{"circular":"-circular-"}');
    });
    it('should handle deep circular references', function() {
      const data = { level1: { regularKey: 'regularValue', level2: { level3: {} } } };
      data.level1.level2.level3.circular = data.level1;
      const tree = getTree(data);
      assert.strictEqual(tree.toJson(), '{"level1":{"regularKey":"regularValue","level2":{"level3":{"circular":"-circular-"}}}}');
    });
    it('should handle arrays with circular references', function() {
      const data = [
        null,
        { level1: { level2: { level3: {} } } }
      ];
      data[0] = data;
      data[1].level1.level2.level3.circular = data[0];
      const tree = getTree(data);
      assert.strictEqual(tree.toJson(), '["-circular-",{"level1":{"level2":{"level3":{"circular":"-circular-"}}}}]');
    });
  });
});
