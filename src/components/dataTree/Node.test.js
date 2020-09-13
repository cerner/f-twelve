import assert from 'assert';
import Tree from './Tree';

const getTree = (value) => Tree({ data: value }).dataTree;

describe('Node', function() {
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
