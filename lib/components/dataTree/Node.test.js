"use strict";

var _jsx = _interopRequireDefault(require("../../utilities/jsx"));

var _Tree = require("./Tree");

var _Node = _interopRequireDefault(require("./Node"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Node', function () {
  it('should render simple values', function () {
    var node = (0, _jsx["default"])(_Node["default"], {
      node: (0, _Tree.getNode)('simple')
    });

    _assert["default"].strictEqual(node.textContent, 'simple');
  });
  it('should render objects', function () {
    var node = (0, _jsx["default"])(_Node["default"], {
      node: (0, _Tree.getNode)({
        objectKey: 'complex'
      })
    });

    _assert["default"].strictEqual(node.textContent, 'Object(1)');
  });
  it('should render arrays', function () {
    var node = (0, _jsx["default"])(_Node["default"], {
      node: (0, _Tree.getNode)([1, 2, 3])
    });

    _assert["default"].strictEqual(node.textContent, 'Array(3)');
  });
  it('should display value when clicked', function () {
    // Requires a parent to click
    var node = (0, _jsx["default"])("div", null, (0, _jsx["default"])(_Node["default"], {
      node: (0, _Tree.getNode)({
        key: 'value'
      })
    }));

    _assert["default"].strictEqual(node.getElementsByClassName('value').length, 0, this.setupError);

    node.querySelector('.caretIcon').click();

    _assert["default"].strictEqual(node.getElementsByClassName('value').length, 1);
  });
});