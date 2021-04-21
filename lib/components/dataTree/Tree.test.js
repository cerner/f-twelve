"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _assert = _interopRequireDefault(require("assert"));

var _Tree = require("./Tree");

describe('Tree', function () {
  describe('#getNode', function () {
    it('should build a tree', function () {
      var data = {
        stringValue: 'value1',
        arrayValue: [1, 2, 3]
      };
      var tree = (0, _Tree.getNode)(data);

      _assert["default"].strictEqual(tree.value, data);

      _assert["default"].strictEqual(tree.children.filter(function (child) {
        return child.type === 'member';
      }).length, 2);

      _assert["default"].strictEqual(tree.children[0].key, 'stringValue');

      _assert["default"].strictEqual(tree.children[0].getNode().value, data.stringValue);

      _assert["default"].strictEqual(tree.children[1].key, 'arrayValue');

      _assert["default"].strictEqual(tree.children[1].getNode().value, data.arrayValue);
    });
    it('should handle circular references', function () {
      var data = {};
      data.circular = data;
      var tree = (0, _Tree.getNode)(data);

      _assert["default"].strictEqual(tree.value, data);

      _assert["default"].strictEqual(tree.children.filter(function (child) {
        return child.type === 'member';
      }).length, 1);

      _assert["default"].strictEqual(tree.children[0].key, 'circular');

      _assert["default"].strictEqual(tree.children[0].getNode().value, data.circular);

      _assert["default"].strictEqual(tree.children[0].getNode().children[0].key, 'circular');

      _assert["default"].strictEqual(tree.children[0].getNode().children[0].getNode().value, data.circular);
    });
    it('should handle deep circular references', function () {
      var data = {
        level1: {
          regularKey: 'regularValue',
          level2: {
            level3: {}
          }
        }
      };
      data.level1.level2.level3.circular = data.level1;
      var tree = (0, _Tree.getNode)(data);

      _assert["default"].strictEqual(tree.value, data);

      _assert["default"].strictEqual(tree.children.filter(function (child) {
        return child.type === 'member';
      }).length, 1);

      _assert["default"].strictEqual(tree.children[0].key, 'level1');

      _assert["default"].strictEqual(tree.children[0].getNode().children[0].key, 'regularKey');

      _assert["default"].strictEqual(tree.children[0].getNode().children[0].getNode().value, 'regularValue');

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].key, 'level2');

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().value, data.level1.level2);

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().children[0].key, 'level3');

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().children[0].getNode().value, data.level1.level2.level3);

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().children[0].getNode().children[0].key, 'circular');

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().children[0].getNode().children[0].getNode().value, data.level1);

      _assert["default"].strictEqual(tree.children[0].getNode().children[1].getNode().children[0].getNode().children[0].getNode().value, data.level1.level2.level3.circular);
    });
  });
  describe('#toJson()', function () {
    describe('data types', function () {
      it('should handle strings', function () {
        var stringNode = (0, _Tree.getNode)('one');

        _assert["default"].strictEqual(stringNode.toJson(), '"one"');
      });
      it('should handle numbers', function () {
        var numberNode = (0, _Tree.getNode)(1);

        _assert["default"].strictEqual(numberNode.toJson(), '1');
      });
      it('should handle boolean', function () {
        var booleanNode = (0, _Tree.getNode)(true);

        _assert["default"].strictEqual(booleanNode.toJson(), 'true');
      });
      it('should handle arrays', function () {
        var arrayNode = (0, _Tree.getNode)([1, 2, 3]);

        _assert["default"].strictEqual(arrayNode.toJson(), '[1,2,3]');
      });
      it('should handle objects', function () {
        var objectNode = (0, _Tree.getNode)({
          'one': 1,
          'two': true,
          'three': '3ree'
        });

        _assert["default"].strictEqual(objectNode.toJson(), '{"one":1,"two":true,"three":"3ree"}');
      });
      it('should handle null', function () {
        var nullNode = (0, _Tree.getNode)(null);

        _assert["default"].strictEqual(nullNode.toJson(), 'null');
      });
      it('should handle undefined', function () {
        var undefinedNode = (0, _Tree.getNode)(undefined);

        _assert["default"].strictEqual(undefinedNode.toJson(), '"-undefined-"');
      });
      it('should handle functions', function () {
        var someFunction = function someFunction(arg) {
          return console.log(arg);
        };

        var functionNode = (0, _Tree.getNode)(someFunction);

        _assert["default"].strictEqual(functionNode.toJson(), JSON.stringify(someFunction.toString()));
      });
    });
    describe('circular references', function () {
      it('should handle circular references', function () {
        var data = {};
        data.circular = data;
        var tree = (0, _Tree.getNode)(data);

        _assert["default"].strictEqual(tree.toJson(), '{"circular":"-circular-"}');
      });
      it('should handle deep circular references', function () {
        var data = {
          level1: {
            regularKey: 'regularValue',
            level2: {
              level3: {}
            }
          }
        };
        data.level1.level2.level3.circular = data.level1;
        var tree = (0, _Tree.getNode)(data);

        _assert["default"].strictEqual(tree.toJson(), '{"level1":{"regularKey":"regularValue","level2":{"level3":{"circular":"-circular-"}}}}');
      });
      it('should handle arrays with circular references', function () {
        var data = [null, {
          level1: {
            level2: {
              level3: {}
            }
          }
        }];
        data[0] = data;
        data[1].level1.level2.level3.circular = data[0];
        var tree = (0, _Tree.getNode)(data);

        _assert["default"].strictEqual(tree.toJson(), '["-circular-",{"level1":{"level2":{"level3":{"circular":"-circular-"}}}}]');
      });
    });
  });
  describe('#canRead()', function () {
    it('should handle getters that throw an error', function () {
      var obj = {
        get test() {
          throw Error();
        }

      };
      var canReadObj = (0, _Tree.canRead)(obj, 'test');

      _assert["default"].strictEqual(canReadObj, false);
    });
  });
});